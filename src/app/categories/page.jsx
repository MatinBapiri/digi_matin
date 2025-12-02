"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Link from "next/link";
import useIsMobile from "@/app/hooks/useIsMobile";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import * as Icons from "lucide-react";

const iconMap = {
  Zap: Icons.Zap,
  Car: Icons.Car,
  Heart: Icons.Heart,
  Shirt: Icons.Shirt,
  Smartphone: Icons.Smartphone,
  Laptop: Icons.Laptop,
  Home: Icons.Home,
  PenTool: Icons.PenTool,
};

export default function Categories() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      const snap = await getDocs(collection(db, "categories"));
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setCategories(data);

      if (data.length > 0) {
        setOpenCategory(data[0]);
      }
    }

    fetchCategories();
  }, []);

  // اگر موبایل نبود → redirect
  useEffect(() => {
    if (isMobile === false) {
      router.push("/");
    }
  }, [isMobile, router]);

  // ---------------------------------------------------
  //   اول: لودینگ را نشان بده
  // ---------------------------------------------------
if (!categories.length || !openCategory || isMobile === null) {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex justify-center items-center space-x-2 h-20">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: "400ms", animationDuration: "1s" }}></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: "200ms", animationDuration: "1s" }}></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: "0ms", animationDuration: "1s" }}></span>
      </div>
    </div>
  );
}



  // ---------------------------------------------------
  //   دوم: اگر موبایل نیست، UI را نمایش نده
  // ---------------------------------------------------
  if (!isMobile) return null;

  const currentItems = openCategory.sub_categories || [];

  return (
    <div>
      <Header />
      <div className="flex flex-row bg-white w-full min-h-screen mt-20" dir="rtl">
        {/* ستون راست */}
        <div className="w-24 bg-[#f0f0f1] flex flex-col items-center self-start">
          <ul className="w-full text-xs">
            {categories.map((cat, idx) => {
              const IconComponent = iconMap[cat.icon] || Icons.Circle;

              return (
                <li
                  key={idx}
                  onClick={() => {
                    setOpenCategory(cat);
                    setOpenIndex(null);
                  }}
                  className={`border-t border-x border-gray-300 flex flex-col items-center justify-center py-3 transition
                    ${openCategory.id === cat.id
                      ? "text-[#e1004b] bg-white border-l border-white"
                      : "text-gray-700"
                    }`}
                >
                  <IconComponent size={15} />
                  <span className="text-[11px] mt-1">{cat.title}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ستون چپ */}
        <div className="flex-1 border-l border-gray-200">
          <Link href={`/search/category-${openCategory.slug}`}>
            <div className="px-6 text-[#008eb2] py-2 bg-white flex items-center gap-2">
              <p className="text-xs cursor-pointer">
                همه محصولات {openCategory.title}
              </p>
              <Icons.ChevronLeft className="w-4 h-4" />
            </div>
          </Link>

          <ul className="m-2 space-y-1 bg-white text-xs">
            {currentItems.map((item, idx) =>
              typeof item === "string" ? (
                <li
                  key={idx}
                  className="border-b pr-2 border-gray-200 flex items-center justify-between py-4 text-[#0c0c0c] cursor-pointer"
                >
                  <span>{item}</span>
                </li>
              ) : (
                <li key={idx} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="flex items-center justify-between w-full py-4 text-gray-800 hover:bg-gray-50"
                  >
                    <span>{item.title}</span>
                    <Icons.ChevronDown
                      className={`transition-transform duration-200 ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </button>

                  {openIndex === idx && (
                    <ul className="pr-5 pb-2 text-gray-600 text-sm space-y-1">
                      {item.children.map((child, i) => (
                        <li key={i} className="hover:text-pink-600 cursor-pointer">
                          {child}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
