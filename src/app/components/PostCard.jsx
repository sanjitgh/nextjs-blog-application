import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className='border border-[#4d6bfe] p-5 rounded shadow-sm hover:shadow-md transition-shadow'>
      <p className='text-end text-gray-700'>{post._id.getTimestamp().toLocaleString()}</p>
      <Link href={`/posts/${post._id}`}>
        <h3 className='font-medium text-lg mb-2 line-clamp-1 hover:text-[#4d6bfe]'>
          {post.title}
        </h3>
      </Link>
      <p className='text-sm text-gray-600 line-clamp-3'>{post.content}</p>
    </div>
  );
}
