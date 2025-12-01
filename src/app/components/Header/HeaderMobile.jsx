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
import {
  getUserCart,
} from "@/lib/cartService";
import Link from "next/link";
import { AiOutlineCamera } from "react-icons/ai";
import { usePathname } from 'next/navigation';
  
const navItems = [
  { href: '/', icon: Home, label: 'خانه' },
  { href: '/categories', icon: LayoutGrid, label: 'دسته‌بندی' },
  { href: '/checkout/cart', icon: ShoppingCart, label: 'سبد خرید', showBadge: true },
  { href: '/magnet', icon: Play, label: 'مگنت' },
  { href: '/profile', icon: User, label: 'دیجی‌متین من' },
];

export default function HeaderMobile({ showSelectCity = true, showTopHeader = true }) {
  const [cartCount, setCartCount] = useState(3);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [value, setValue] = useState("");
  const [focused1, setFocused1] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const pathname = usePathname();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      getUserCart(user.uid).then((items) => {
        setCartItems(items);
      });
    }
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
                    src="/typography.svg"
                    alt="دیجی‌متین"
                    className="h-4 object-contain opacity-80"
                  />
                </label>
              )}
              <button className="p-1 rounded-lg hover:bg-gray-200 transition absolute left-3">
                <AiOutlineCamera className="w-6 h-6 text-[#7e57c2]" />
              </button>
            </div>

            {/* آیکن زنگ */}
            {showSelectCity && (
              <button className="p-2 bg-[#f1f2f4] rounded-xl hover:bg-gray-200 transition">
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
          <div className="flex px-4 rounded-2xl ml-2 py-2">
            <div className="pl-1">
              <MapPin className="w-4 h-4" />
            </div>
            <p className="ml-2 text-xs">انتخاب استان و شهر</p>
            <ChevronLeft size={18} className="text-black" />
          </div>
        )}
      </nav>

      {/* ----------------- MOBILE BOTTOM NAV ----------------- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300  shadow-md flex justify-around items-center py-2 z-50">
        {navItems.map(({ href, icon: Icon, label, showBadge }) => {
          const active = isActive(href);
          
          return (
            <Link key={href} href={href}>
              <div className={`flex flex-col items-center relative transition-colors ${
                active ? 'text-[#0c0c0c]' : 'text-[#a1a3a8]'
              }`}>
                <Icon
                  className="h-6 w-6"
                  fill={active ? 'currentColor' : 'none'}
                  strokeWidth={active ? 0 : 2}
                />

                {showBadge && cartItems.length != 0  && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
                <span className={`text-xs mt-1 ${active ? 'font-semibold' : ''}`}>
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}