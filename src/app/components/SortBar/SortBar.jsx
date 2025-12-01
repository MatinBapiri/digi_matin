"use client";
import { ArrowDownWideNarrow } from 'lucide-react';
import { useState } from "react";
const sortOptions = ["مرتبط‌ترین", "پرفروش‌ترین", "پربازدیدترین", "جدیدترین", "ارزان‌ترین", "گران‌ترین",];
export default function SortBar() {
    const [active, setActive] = useState("مرتبط‌ترین");
    return (
        <div className="flex flex-wrap items-center gap-x-4 border-b-1 border-gray-200 pb-2 text-xs ">
            <span className="font-medium flex gap-1 "><ArrowDownWideNarrow className=''/>مرتب‌سازی:</span>
            {sortOptions.map((option) => (
                <button key={option}
                    onClick={() => setActive(option)}
                    className={`pb-1 ${active === option ? "text-red-600 " : "text-gray-600 hover:text-black"}`} >
                    {option} </button>))}
        </div>
    );
}