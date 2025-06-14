import Link from "next/link";

// components/Banner.jsx
export default function Banner() {
  return (
    <section className='bg-gradient-to-r from-white to-gray-100 py-16 px-6 md:px-12 lg:px-20 shadow-sm min-h-[600px] flex justify-center items-center'>
      <div className='max-w-7xl mx-auto text-center'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
          Welcome to <span className='text-[#4d6bfe]'>Our Blog</span>
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Explore expert articles, developer tips, and insights from the tech
          world. Stay updated and inspired.
        </p>
        <div className='mt-6 flex justify-center gap-4'>
          <Link
            href={"/posts/create"}
            className='bg-[#4d6bfe] hover:bg-[#3c58d4] text-white px-6 py-2 rounded-md text-sm font-medium shadow'>
            Get Started
          </Link>
          <Link
            href={"/posts"}
            className='border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-md text-sm font-medium'>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
