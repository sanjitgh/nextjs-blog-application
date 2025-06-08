"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlink({ label, href }) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`hover:text-[#4d6bfe] transition-colors ${
        pathName === href ? "text-[#4d6bfe]" : "text-gray-700"
      }`}>
      {label}
    </Link>
  );
}
