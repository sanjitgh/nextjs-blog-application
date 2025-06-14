import { getCollection } from "@/lib/db";

import PostCard from "./PostCard";

export default async function Post() {
  const postCollection = await getCollection("posts");
  if (!postCollection) return;
  const posts = await postCollection
    .find()
    .sort({ $natural: -1 })
    .limit(4)
    .toArray();

  if (posts) {
    return (
      <div className='py-14'>
        <h1 className='text-center font-medium text-3xl'>Recent Blogs</h1>
        <div className='w-52 h-0.5 bg-[#4d6bfe] mx-auto my-3'></div>
        <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
          {posts.map((post) => (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <p className='text-center'>No Data Found</p>;
  }
}
