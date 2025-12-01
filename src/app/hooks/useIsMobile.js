"use client";
import { useEffect, useState } from "react";

/**
 * useIsMobile(breakpoint = 768)
 * برمی‌گرداند:
 * - true: اگر عرض صفحه کمتر از breakpoint باشد.
 * - false: اگر عرض صفحه برابر یا بیشتر از breakpoint باشد.
 * - null: تا زمانی که هنوز بررسی انجام نشده.
 */
export default function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // بررسی اولیه هنگام mount
    handleResize();

    // گوش دادن به تغییر اندازه پنجره
    window.addEventListener("resize", handleResize);

    // پاکسازی هنگام unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
