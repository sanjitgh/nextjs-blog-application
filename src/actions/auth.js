"use server";

import { getCollection } from "@/lib/db";
import { LoginFromSchema, RegisterFromSchema } from "@/lib/rulse";
import { createSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

// Register function
export async function register(state, formData) {
  // Validate form field
  const validatedFields = RegisterFromSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // Check if any field are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // Extract from field
  const { email, password } = validatedFields.data;

  // Check if user already exist?
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "Email already exist in our database!",
      },
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save in the database
  const results = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  // Create session
  await createSession(results.insertedId.toString());

  // Redirect
  redirect("/dashboard");
}

// Login function
export async function login(state, formData) {
  // Validate form field
  const validatedFields = LoginFromSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Check if email field are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // Extract from field
  const { email, password } = validatedFields.data;
  console.log(email, password);
  // Check if email is exist in our DB?
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "Invalid Email" } };

  // Check hash password is match
  const matchedPassword = await bcrypt.compare(password, existingUser.password);

  console.log(matchedPassword);
  if (!matchedPassword) return { errors: { password: "Invalid Password" } };

  // Create session
  await createSession(existingUser._id.toString());

  // Rederect
  redirect("/dashboard");
}
