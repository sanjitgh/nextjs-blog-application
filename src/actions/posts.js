"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogFormSchema } from "@/lib/rulse";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(state, formData) {
  // Check is user is login
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate form field
  const validatedField = BlogFormSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  // If any form fields are invalid then threw an error message in input field
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      title: formData.get("title"),
      content: formData.get("content"),
    };
  }

  // Save new post in DB
  try {
    const postCollection = await getCollection("posts");
    const post = {
      title: validatedField?.data?.title,
      content: validatedField?.data?.content,
      userId: ObjectId.createFromHexString(user.userId),
    };

    const res = await postCollection.insertOne(post);
    if (res.insertedId) {
      return { success: true };
    }
  } catch (error) {
    return {
      errors: { title: error.message },
    };
  }
}

export async function updateBlog(state, formData) {
  // Check is user is login
  const user = await getAuthUser();
  if (!user) return redirect("/");

  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");
  // Validate form field
  const validatedField = BlogFormSchema.safeParse({
    title,
    content,
    postId,
  });

  // If any form fields are invalid then threw an error message in input field
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // Find the data
  const postCollection = await getCollection("posts");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("postId")),
  });

  if (user.userId !== post.userId.toString()) return redirect("/");

  // Update post in DB
  postCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        title: validatedField.data.title,
        content: validatedField.data.content,
      },
    }
  );
  redirect("/dashboard");
}

export async function deleteBlog(formData) {
  // Check is user is login
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Find the post
  const postCollection = await getCollection("posts");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("postId")),
  });

  // Check the auth user owns post
  if (user.userId !== post.userId.toString()) return redirect("/");

  // Delete the data
  postCollection.findOneAndDelete({ _id: post._id });
  revalidatePath("/dashboard");
}
