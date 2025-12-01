"use client";

import Link from "next/link";

export default function Breadcrumb({ links }) {
  return (
    <nav dir="rtl" className="w-full bg-white border-gray-200 py-5 mt-20">
  <div className="w-full px-4">
    <ol className="flex items-center text-xs text-gray-500 space-x-2 rtl:space-x-reverse">
      {links.map((link, index) => {
        const isLast = index === links.length - 1;
        return (
          <li key={index} className="flex items-center">
            {isLast ? (
              <span className="text-gray-800 font-medium">{link.title}</span>
            ) : (
              <>
                <Link href={`/${link.to}`} className="hover:text-gray-800 transition">
                  {link.title}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  </div>
</nav>

  );
}
