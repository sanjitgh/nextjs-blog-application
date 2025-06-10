import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function page() {
  const user = await getAuthUser();

  const postCollection = await getCollection("posts");
  const userPost = await postCollection
    ?.find({ userId: ObjectId.createFromHexString(user.userId) })
    .sort({ $natural: -1 })
    .toArray();

  if (!userPost) return <p>Failed to fetch data.</p>;

  if (userPost.length === 0)
    return (
      <p className='text-center my-5 min-h-screen'>You Don't have any post.</p>
    );

  return (
    <div className='py-14'>
      <div className='max-w-7xl mx-auto min-h-[650px]'>
        <div className='overflow-x-auto p-4'>
          <table className='min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg'>
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className='w-1/4 px-6 py-3 text-center text-sm font-semibold'>
                  Title
                </th>
                <th className='w-1/4 px-6 py-3 text-center text-sm font-semibold'>
                  View
                </th>
                <th className='w-1/4 px-6 py-3 text-center text-sm font-semibold'>
                  Update
                </th>
                <th className='w-1/4 px-6 py-3 text-center text-sm font-semibold'>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {userPost.map((post) => (
                <tr key={post._id}>
                  <td className='w-1/4 px-6 py-4 text-sm text-gray-900 text-center'>
                    {post.title.slice(0, 30)}
                  </td>
                  <td className='w-1/4 px-6 py-4 text-sm text-center'>
                    <Link
                      href={`/posts/${post._id}`}
                      className='text-green-600'>
                      View
                    </Link>
                  </td>
                  <td className='w-1/4 px-6 py-4 text-sm text-center'>
                    <Link
                      href={`/posts/update/${post._id}`}
                      className='text-[#4d6bfe]'>
                      Update
                    </Link>
                  </td>
                  <td className='w-1/4 px-6 py-4 text-sm text-center'>
                    <button className='cursor-pointer text-red-600'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
