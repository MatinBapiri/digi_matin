"use client";
import {
  Star, ShoppingBag, Heart, MessageCircle, MapPin, Users, Gift, Bell, Clock, User, LogOut, ChevronLeft, Headphones, Settings
} from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import { useAuth } from "@/app/hooks/useAuth";
import BottomNavigation from "@/app/components/BottomNavigation/BottomNavigation";
import LogoutModal from "@/app/components/LogoutModalMobile/LogoutModal";
import { useState } from "react";
import LogoutModalMobile from "@/app/components/LogoutModalMobile/LogoutModal";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LogoutModalDesktop from "@/app/components/LogoutModalDesktop/LogoutModalDesktop";
export default function AccountMenu() {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // ریدایرکت به صفحه اصلی بعد از خروج
  };
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const items = [
    { title: "پلاس", icon: <Star className="text-[#b82ad7]" size={20} /> },
    { title: "سفارش‌ها", icon: <ShoppingBag size={20} /> },
    { title: "لیست‌های من", icon: <Heart size={20} /> },
    { title: "دیدگاه‌ها و پرسش‌ها", icon: <MessageCircle size={20} /> },
    { title: "آدرس‌ها", icon: <MapPin size={20} /> },
    { title: "دعوت از دوستان", icon: <Users size={20} /> },
    { title: "کارت‌های هدیه", icon: <Gift size={20} /> },
    { title: "پیام‌ها", icon: <Bell size={20} /> },
    { title: "بازدیدهای اخیر", icon: <Clock size={20} /> },
    { title: "اطلاعات حساب کاربری", icon: <User size={20} /> },
  ];
  if (!user)
    return (
      window.location.href = "/login"
    );
  return (
    <>
    
      <nav className="fixed top-0 left-0 w-full bg-white py-3 px-6 md:hidden">
        <div className="flex items-center justify-between text-gray-700">

          {/* Right side — Settings */}
          <Link href="#" className="flex items-center">
            <Settings size={26} />
          </Link>

          {/* Left side — Headphones + Bell */}
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center">
              <Headphones size={26} />
            </Link>

            <Link href="#" className="flex items-center">
              <Bell size={26} />
            </Link>
          </div>

        </div>
      </nav>

      <div className="w-full bg-white text-right" dir="rtl">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            {/* متن + آیکون سمت راست */}
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm text-gray-800">{item.title}</span>
            </div>

            {/* فلش سمت چپ */}
            <ChevronLeft size={20} className="text-gray-500" />
          </div>
        ))}
      </div>
      <BottomNavigation />
      {/* دکمه خروج */}
      {/* دکمه خروج */}
      <div className="">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-between px-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 w-full"
        >
          <div className="flex items-center gap-3">
            <LogOut size={20} className="text-gray-800" />
            <p className="text-sm">خروج از حساب کاربری</p>
          </div>

          <ChevronLeft size={20} className="text-gray-500" />
        </button>
      </div>

      {/* مودال موبایل */}
      <div className="md:hidden">
        <LogoutModalMobile
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            handleLogout();
            setOpen(false);
          }}
        />
      </div>

      {/* مودال دسکتاپ */}
      <div className="hidden md:block">
        <LogoutModalDesktop
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            handleLogout();
            setOpen(false);
          }}
        />
      </div>

    </>
  );
}
