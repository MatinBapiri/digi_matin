"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import {
  Play,
  ChevronLeft,
  User,
  ShoppingCart,
  Search,
  Bell,
  Home,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import { getUserCart } from "@/lib/cartService";
import Link from "next/link";
import { AiOutlineCamera } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import CityModalMobile from "../CityModalMobile/CityModalMobile"; // اطمینان حاصل کنید که CityModalMobile درست وارد شده

export default function HeaderMobile({ showSelectCity = true, showTopHeader = true }) {
  const [cartCount, setCartCount] = useState(3);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [value, setValue] = useState("");
  const [focused1, setFocused1] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);  // برای کنترل مودال شهر
  const [city, setCity] = useState(null);  // برای ذخیره شهر انتخاب شده
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getUserCart(user.uid).then((items) => {
        setCartItems(items);
      });
    }

    // خواندن شهر ذخیره‌شده از localStorage
    const savedCity = localStorage.getItem("selected-city");
    if (savedCity) setCity(savedCity);
  }, [user]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // هندل کردن اسکرول هدر
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // زمانی که کاربر شهر را انتخاب می‌کند
  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    localStorage.setItem("selected-city", selectedCity); // ذخیره انتخاب شهر
    setOpen(false); // بستن مودال
  };

  return (
    <div className="w-full bg-gray-50 flex flex-col" id="header-mobile">
      {/* ----------------- HEADER ----------------- */}
      {showTopHeader && (
        <header className="w-full bg-white fixed top-0 z-50 h-[60px]" >
          <div className="flex items-center justify-between px-3 py-2 h-full bg-white ">
            {/* فیلد جستجو */}
            <div className="relative flex items-center flex-1 bg-[#f1f2f4] rounded-xl px-3 py-2 mx-2">
              <Search className="w-5 h-5 text-gray-500 absolute right-3" />
              <input
                type="text"
                id="searchInput"
                value={value}
                onFocus={() => setFocused1(true)}
                onBlur={() => setFocused1(false)}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-transparent pr-10"
              />
              {!focused1 && !value && (
                <label
                  htmlFor="searchInput"
                  className="absolute right-10 flex items-center gap-1 text-gray-500 pointer-events-none text-sm transition-opacity duration-200"
                >
                  <span>جستجو در</span>
                  <img
                    src="/type.png"
                    alt="دیجی‌متین"
                    className="h-5 object-contain opacity-80"
                  />
                </label>
              )}
              <button className="p-1 rounded-lg hover:bg-gray-200 transition absolute left-3">
                <AiOutlineCamera className="w-6 h-6 text-[#7e57c2]" />
              </button>
            </div>

            {/* آیکن زنگ */}
            {showSelectCity && (
              <button className="p-2 bg-[#f1f2f4] rounded-xl hover:bg-gray-200 transition" onClick={() => setOpen(true)}>
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </header>
      )}

      {/* ----------------- MOBILE TOP NAV ----------------- */}
      <nav
        className={`flex fixed top-[60px] left-0 right-0  
        space-x-6 space-x-reverse text-sm text-black py-2 bg-white shadow-xs transition-transform duration-300 z-40
        ${hideNav ? "-translate-y-full " : "translate-y-0"}`}
      >
        {showSelectCity && (
          <div className="flex px-4 rounded-2xl ml-2 py-2 cursor-pointer" onClick={() => setOpen(true)}>
            <div className="pl-1">
              <MapPin className="w-4 h-4" />
            </div>
            <p className="ml-2 text-xs">
              {city && city.name ? `ارسال به ${city.name}` : "انتخاب استان و شهر"}
            </p>
            <ChevronLeft size={18} className="text-black" />
          </div>
        )}
      </nav>

      {/* ----------------- MOBILE BOTTOM NAV ----------------- */}
      <BottomNavigation />

      {/* مودال انتخاب شهر */}
      <CityModalMobile
        isOpen={open}
        onClose={() => setOpen(false)}  // بستن مودال
        onSelect={handleSelectCity}    // انتخاب شهر
      />
    </div>
  );
}
