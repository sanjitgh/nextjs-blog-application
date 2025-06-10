import { updateBlog } from "@/actions/posts";
import UpdateBlog from "@/app/components/UpdateBlog";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function UpdatePost({ params }) {
  const { id } = await params;
  const postCollection = await getCollection("posts");
  let post;

  if (id.length === 24 && postCollection) {
    post = await postCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    post = JSON.parse(JSON.stringify(post));
  } else {
    post = null;
  }


  return (
    <>
      {post ? (
        <UpdateBlog header={updateBlog} postData={post} />
      ) : (
        <p>Failed to fetch data.</p>
      )}
    </>
  );
}
