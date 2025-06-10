import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function PostDetails({ params }) {
  const { id } = await params;
  const postCollection = await getCollection("posts");
  const singlePost =
    id.length === 24
      ? await postCollection.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <div className='py-14'>
      <div className='max-w-7xl mx-auto min-h-[650px]'>
        {singlePost ? (
          <>
            <h1 className='text-center mb-5 font-semibold text-2xl'>
              Blog Details
            </h1>
            <div className='my-5 text-center'>
              <h1 className='font-medium text-2xl mb-3'>{singlePost.title}</h1>
              <p className='max-w-3/4 mx-auto'>{singlePost.content}</p>
            </div>
          </>
        ) : (
          <p className="text-center text-2xl font-medium">No Post found!</p>
        )}
      </div>
    </div>
  );
}
