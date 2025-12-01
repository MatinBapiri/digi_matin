"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// تابع بارگیری آیکون‌ها
function getIconByName(name, size = 18) {
  const IconComponent = Icons[name];
  return IconComponent ? <IconComponent size={size} /> : null;
}

// تابع fetch
async function fetchCategories() {
  const snap = await getDocs(collection(db, "categories"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState(null);

  // React Query
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) return <p className="p-4 text-gray-600">در حال بارگذاری...</p>;

  return (
    <div className="grid w-full bg-white shadow-lg grid-cols-[250px_auto]">

      {/* ستون راست */}
      <div className="shadow-neutral-600 overflow-y-auto h-120 my-scroll">
        <ul dir="rtl" className="flex flex-col">
          {categories.map((cat, idx) => (
            <li key={cat.id}>
              <Link href={`/search/category-${cat.slug}`}>
                <div
                  className={`px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-100
                    ${activeCategory === idx ? "bg-gray-100 text-red-600" : ""}`}
                  onMouseEnter={() => setActiveCategory(idx)}
                >
                  <span className="flex items-center gap-2">
                    {getIconByName(cat.icon)}
                    {cat.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ستون چپ */}
      <div className="p-2 overflow-auto w-auto min-w-max h-120 my-scroll">
        {activeCategory !== null && (
          <div dir="rtl">
            <Link
              href={`/search/category-${categories[activeCategory].slug}`}
              className="cursor-pointer text-xs m-2 mb-7 text-[#008eb2] flex"
            >
              همه محصولات {categories[activeCategory].title}
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </Link>

            <ul className="grid grid-cols-2 gap-5 gap-x-10 text-xs text-gray-700">
              {categories[activeCategory].sub_categories?.map((sub, i) => {
                if (typeof sub === "string")
                  return (
                    <li key={i} className="hover:text-red-600">
                      {sub}
                    </li>
                  );

                if (sub.slug)
                  return (
                    <li key={i}>
                      <Link
                        href={`/search/category-${sub.slug}`}
                        className="cursor-pointer hover:text-red-600 transition"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  );

                if (sub.children)
                  return (
                    <li key={i}>
                      <p className="font-semibold text-gray-800 mb-1">{sub.title}</p>
                      <ul className="space-y-3 pl-2 ">
                        {sub.children.map((child, ci) => (
                          <li key={ci} className="hover:text-red-600 cursor-pointer">
                            {child}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
