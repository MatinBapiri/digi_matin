"use client";
import { useState } from "react";
import { User, ChevronDown, LogOut, MapPin, ListOrdered, Heart, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LogoutModalDesktop from "../LogoutModalDesktop/LogoutModalDesktop";

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // ریدایرکت به صفحه اصلی بعد از خروج
  };

  return (
    <div className="relative">
      {/* آیکن کاربر */}
      <div
        className="flex items-center cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <User className="w-6 h-6 text-gray-700" />
        <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
      </div>

      {/* منوی بازشو */}
      {open && (
        <div
          className="absolute left-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-lg p-1 z-50 "
          onMouseLeave={() => setOpen(false)}
        >
          <Link href={'/profile'}>
            <div className="px-3 py-2  text-sm text-gray-600 flex justify-between hover:bg-gray-100 hover:cursor-pointer">
              {user?.email || "کاربر دیجی‌متین"}
              <ChevronLeft size={20} className="text-gray-500" />
            </div>
          </Link>
          <Link
            href="/checkout/cart"
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
          >
            <ListOrdered className="w-4 h-4" /> سفارش‌ها
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
          >
            <MapPin className="w-4 h-4" /> آدرس‌ها
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-700"
          >
            <Heart className="w-4 h-4" /> لیست‌ها
          </Link>

          <button
            onClick={() => {setOpenLog(true)}}
            className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-[#ef4056] rounded-md text-sm w-full text-right"
          >
            <LogOut className="w-4 h-4" /> خروج از حساب کاربری
          </button>
          <div className="hidden md:block">
            <LogoutModalDesktop
              isOpen={openLog}
              onClose={() => setOpenLog(false)}
              onConfirm={() => {
                handleLogout();
                setOpenLog(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
