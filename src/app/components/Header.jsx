"use client";
import Link from "next/link";
import Navlink from "./Navlink";

export default function Header() {
  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='text-2xl font-bold'
              style={{ color: "#4d6bfe" }}>
              MyBlog
            </Link>
          </div>

          <nav className='flex space-x-8'>
            <Navlink label={"Home"} href={"/"} />
            <Navlink label={"Contact"} href={"/contact"} />
            <Navlink label={"Login"} href={"/login"} />
            <Navlink label={"Register"} href={"/register"} />
            <Navlink label={"Dashboard"} href={"/dashboard"} />
          </nav>
        </div>
      </div>
    </header>
  );
}
