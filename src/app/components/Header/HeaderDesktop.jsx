"use client";
import {
  Play, ChevronLeft, User, ShoppingCart, Search, Menu, Bell, Home, LayoutGrid, MapPin, ChevronDown
} from "lucide-react";
import { TbLogin } from "react-icons/tb";
import MegaMenu from "./Megamenu/MegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AiOutlineCamera } from "react-icons/ai";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import UserMenu from '@/app/components/UserMenu/UserMenu'
import { useAuth } from "@/app/hooks/useAuth";
import {
  getUserCart,
  removeFromCart,
  updateCartQuantity,
} from "@/lib/cartService";
import CityModal from "@/app/components/CityModal/CityModal";
export default function HeaderDesktop() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [menuHover, setMenuHover] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [value, setValue] = useState("");
  const [focused1, setFocused1] = useState(false);
  const links = ["پروشاپ رویال", "شگفت انگیز شو", "وبلاگ", "فروشگاه", "تماس با ما", "درباره ما", "سوالات متداول",];

  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(null);

  // خواندن شهر ذخیره‌شده
  useEffect(() => {
    const saved = localStorage.getItem("selected-city");
    if (saved) setCity(saved);
  }, []);

  // زمانی که کاربر شهر انتخاب می‌کند
  const handleSelectCity = (c) => {
    setCity(c);
    localStorage.setItem("selected-city", c);
    setOpen(false);
  };
  const menuOpen = menuHover || menuClick;
  useEffect(() => {
    if (user) {
      getUserCart(user.uid).then((items) => {
        setCartItems(items);
      });
    }
  }, [user]);  // ✔ درست

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    if (focused) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [focused]);

  useEffect(() => {
    if (menuClick || menuHover) {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuClick, menuHover]);

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

  return (
    <>
    
    
    <div className="w-full bg-gray-50 flex flex-col" id="header-mobile">
      {/* ----------------- OVERLAY ----------------- */}
      <AnimatePresence>
        {(focused || menuClick || menuHover) && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setFocused(false);
              setMenuClick(false);
              setMenuHover(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* ----------------- HEADER ----------------- */}
      <header className="w-full bg-white fixed top-0 z-50 h-[70px] md:h-[80px]">
        {/* دسکتاپ */}
        <div className="flex items-center px-4 py-3 md:px-6 md:py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/digikala22.png"
                alt="دیجی-متین"
                className="w-[155px] h-[30px] object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-6 relative">
            <div className="relative w-full z-50">
              <input
                type="text"
                placeholder="جستجو"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full rounded-lg bg-[#f0f0f1] px-4 py-2.5 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-400 relative z-50"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-50" />
            </div>
          </div>

          {/* Icons */}
          <div className="items-center space-x-4 space-x-reverse mr-auto">
            <div className="flex items-center space-x-4 mr-auto">
              <Bell className="h-6 w-6 text-gray-700 items-center" />
              {user ? (
                <div className="flex">
                  <UserMenu user={user}>
                    <User className="cursor-pointer transition" />
                    <ChevronDown className=" h-5 w-5" />
                  </UserMenu>
                </div>
              ) : (
                <Link href="/login">
                  <div className="border border-gray-300 rounded-md flex ml-1 px-4 py-1 items-center text-xs">
                    <TbLogin className="text-3xl pl-2 " />
                    ورود | ثبت‌نام
                  </div>
                </Link>
              )}
              <span className="text-xl text-gray-400">|</span>
              <div className="relative">
                {user ? (
                  <>
                    <Link href={'/checkout/cart'}>
                      <ShoppingCart className="cursor-pointer" />
                      {cartItems.length != 0 &&
                        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>}
                    </Link>
                  </>
                ) : (
                  <ShoppingCart className="cursor-pointer" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ----------------- DESKTOP NAV ----------------- */}
      <nav
        className={`hidden md:flex fixed top-[70px] left-0 right-0  
        space-x-6 space-x-reverse text-sm text-blue-900 py-2 bg-white shadow-sm transition-transform duration-300 z-40
        ${hideNav ? "-translate-y-full " : "translate-y-0"}`}
      >
        <div
          className="relative"
          onMouseEnter={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
        >
          <div
            className={`flex items-center cursor-pointer border-b-2 transition text-sm
            ${menuOpen ? "border-red-500" : "border-transparent hover:border-red-500"}`}
            onClick={() => setMenuClick(!menuClick)}
          >
            <Menu className="w-4 h-6 text-gray-800 mt-1" />
            <p className="mr-1 pt-2">دسته‌بندی کالاها</p>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 bg-white shadow-lg z-50 w-auto min-w-[250px] max-w-[80vw]"
              >
                <MegaMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {links.map((link, i) => (
          <a
            key={i}
            href="#"
            className="text-gray-600 duration-200 border-b-2 border-transparent hover:border-b-red-500 transition text-xs pt-2.5"
          >
            {link}
          </a>
        ))}

        <>
          {/* دکمهٔ انتخاب شهر */}
          <div
            onClick={() => setOpen(true)}
            className="flex items-center mr-auto bg-[#F57F1712] rounded-2xl ml-2 py-2 px-3 gap-1 cursor-pointer "
          >
            <MapPin className="text-[#F57F17] w-4 h-4" />

            <span className="text-[#F57F17] text-xs whitespace-nowrap">
              {city ? `ارسال به ${city}` : "شهر خود را انتخاب کنید"}
            </span>
          </div>

          {/* مودال شهر */}

        </>

      </nav>
    </div>
    
      <CityModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelectCity}
      />
      
    </>
  );
}
