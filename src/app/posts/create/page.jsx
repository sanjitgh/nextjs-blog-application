"use client";

import { createBlog } from "@/actions/posts";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export default function page() {
  const [state, action, isPending] = useActionState(createBlog, undefined);

  if (state?.success === true) {
    redirect("/posts");
  }

  return (
    <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
      <div className='w-full'>
        <div className='max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm'>
          <h2 className='text-2xl font-bold mb-6 text-center text-[#4d6bfe]'>
            Create a new Blog
          </h2>

          <form action={action} className='space-y-5'>
            <div>
              <label
                htmlFor='text'
                className='block text-sm font-medium text-gray-600 mb-1'>
                Title
              </label>
              <input
                type='text'
                name='title'
                defaultValue={state?.title || ""}
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
                defaultValue={state?.content || ""}
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
              {isPending ? (
                <div className='flex justify-center items-center'>
                  <svg
                    className='animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 -960 960 960'
                    width='24px'
                    fill='#ffffff'>
                    <path d='M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z' />
                  </svg>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
