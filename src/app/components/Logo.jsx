"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href='/' className='text-2xl font-bold' style={{ color: "#4d6bfe" }}>
      MyBlog
    </Link>
  );
}
