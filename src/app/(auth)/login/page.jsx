"use client";
import { login } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
      <div className='w-full'>
        <div className='max-w-md mx-auto p-8 bg-white rounded-lg shadow-sm border border-gray-100'>
          <h2
            className='text-2xl font-bold mb-6 text-center'
            style={{ color: "#4d6bfe" }}>
            Login
          </h2>

          <form action={action} className='space-y-4'>
            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-600 mb-1'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                defaultValue={state?.email}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d6bfe]'
                placeholder='your@email.com'
              />
              {state?.errors?.email && (
                <p className='text-red-600'>{state.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-600 mb-1'>
                Password
              </label>
              <input
                type='password'
                name='password'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d6bfe]'
                placeholder='••••••••'
              />
              {state?.errors?.password && (
                <p className='text-red-600'>{state.errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full py-2 bg-[#4d6bfe] hover:bg-[#3a5bed] px-4 rounded-md text-white font-medium transition-colors cursor-pointer'>
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
                "Login"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className='mt-6 text-center text-sm text-gray-500'>
            Don't have an account?{" "}
            <Link href='/register' className='font-medium text-[#4d6bfe]'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
