"use client";
import { register } from "@/actions/auth";
import LoadingSpinerIcon from "@/app/components/LoadingSpinerIcon";
import Link from "next/link";
import { useActionState } from "react";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
      <div className='w-full'>
        <div className='max-w-md mx-auto p-8 bg-white rounded-lg shadow-sm'>
          <h2 className='text-2xl font-bold mb-6 text-center text-[#4d6bfe]'>
            Register
          </h2>

          <form action={action} className='space-y-5'>
            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-600 mb-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                defaultValue={state?.email}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d6bfe]'
                placeholder='Enter your email'
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
                placeholder='Create a password'
              />
              {state?.errors?.password && (
                <div className='text-red-600'>
                  <p>Password must:</p>
                  <ul className='list-disc list-inside ml-4'>
                    {state.errors.password.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-600 mb-1'>
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d6bfe]'
                placeholder='Re-enter your password'
              />
              {state?.errors?.confirmPassword && (
                <p className='text-red-600'>{state.errors.confirmPassword}</p>
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
              {isPending ? <LoadingSpinerIcon /> : "Create Account"}
            </button>
          </form>

          <p className='mt-4 text-center text-sm text-gray-500'>
            Already have an account?{" "}
            <Link href={"/login"} className='font-medium text-[#4d6bfe]'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
