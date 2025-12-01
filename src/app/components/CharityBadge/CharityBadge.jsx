import React from 'react'
import {
  ChevronLeft,
  HeartHandshake
} from "lucide-react";

export const CharityBadge = () => {
  return (
    <div className="bg-[#f2fbf9] border border-teal-500 rounded-lg p-3 flex flex-col gap-1 mb-15">
      {/* ردیف بالایی */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/heart.svg" alt="heart" className="w-5 h-5" />
          <p className="text-xs text-gray-700 font-medium">
            به سبد خریدتان مهر اضافه کنید
          </p>
        </div>

        <a
          href="#"
          className="text-teal-500 text-xs font-bold flex items-center hover:underline pr-3"
        >
          مشاهده <ChevronLeft size={14} />
        </a>
      </div>

      {/* توضیح پایین */}
      <p className="text-xs text-[#3f4046] leading-relaxed">
        کمک به مددجویان و خیریه‌ها، به انتخاب خودتان
      </p>
    </div>

  )
}
