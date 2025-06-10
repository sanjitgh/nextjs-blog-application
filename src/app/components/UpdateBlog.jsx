"use client";

import { useActionState } from "react";
import LoadingSpinerIcon from "./LoadingSpinerIcon";

export default function UpdateBlog({ header, postData }) {
  const [state, action, isPending] = useActionState(header, undefined);


  return (
    <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
      <div className='w-full'>
        <div className='max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm'>
          <h2 className='text-2xl font-bold mb-6 text-center text-[#4d6bfe]'>
            Update Blog
          </h2>

          <form action={action} className='space-y-5'>
            <input type='hidden' name='postId' defaultValue={postData?._id} />
            <div>
              <label
                htmlFor='text'
                className='block text-sm font-medium text-gray-600 mb-1'>
                Title
              </label>
              <input
                type='text'
                name='title'
                defaultValue={state?.title || postData?.title}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d6bfe]'
              />
              {state?.errors?.title && (
                <p className='text-red-600'>{state.errors.title}</p>
              )}
            </div>
            <div>
              <label
                htmlFor='text'
                className='block text-sm font-medium text-gray-600 mb-1'>
                Content
              </label>
              <textarea
                name='content'
                defaultValue={state?.content || postData?.content}
                className='w-full h-40 resize-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d6bfe]'></textarea>
              {state?.errors?.content && (
                <p className='text-red-600'>{state.errors.content}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isPending}
              type='submit'
              className={`${
                isPending
                  ? "bg-[#a8b9ff] cursor-not-allowed"
                  : "cursor-pointer bg-[#4d6bfe]"
              } hover:bg-[#3a5bed] w-full py-2 px-4 rounded-md text-white font-medium`}>
              {isPending ? <LoadingSpinerIcon /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
