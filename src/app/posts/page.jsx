import { getCollection } from "@/lib/db";
import PostCard from "../components/PostCard";

export default async function Posts() {
  const postCollection = await getCollection("posts");
  const posts = await postCollection.find().sort({ $natural: -1 }).toArray();

  return (
    <div className='py-14'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-center mb-5 font-semibold text-2xl'>All Blog</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
          {posts.map((post) => (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
