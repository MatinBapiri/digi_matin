// src/app/components/Header/index.jsx
"use client";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // نمایش انتخاب شهر فقط در صفحات خاص
  const showSelectCity =
    pathname !== "/categories" &&
    !pathname.startsWith("/search/category-") &&
    pathname !== "/checkout/cart"&&
    !pathname.startsWith("/product/dkp-");

    const showTopHeader = pathname !== "/checkout/cart" 
  return (
    < >
      {/* نسخه دسکتاپ */}
      <div className="hidden md:block">
        <HeaderDesktop showSelectCity={showSelectCity} />
      </div>

      {/* نسخه موبایل */}
      <div className="block md:hidden">
        <HeaderMobile showSelectCity={showSelectCity} showTopHeader={showTopHeader} />
      </div>
    </>
  );
}
