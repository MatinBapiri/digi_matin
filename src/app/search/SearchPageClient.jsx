"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import SearchClient from "@/app/components/SearchClient/SearchClient";
import SearchClientMobile from "@/app/components/SearchClientMobile/SearchClientMobile";
import { useQuery } from "@tanstack/react-query";

async function fetchAllProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export default function SearchPageClient({ q, categoryFromPath }) {
  const isMobile = useIsMobile();
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [fastShipping, setFastShipping] = useState(false);
  const [sellerShipping, setSellerShipping] = useState(false);
  const [inStock, setInStock] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", q, categoryFromPath],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ حالت لودینگ جداگانه برای موبایل و دسکتاپ
  if (isLoading) {
    if (isMobile === null) return null; // تا وقتی مقدار اولیه مشخص نشده

    // 📱 موبایل
    if (isMobile) {
      return (
        <div className="grid grid-cols-1 gap-0 border-b border-gray-200 animate-pulse">
          {/* عنوان یا فیلتر بالا */}
          <div className="h-8 bg-gray-200 w-full mb-2 rounded-md"></div>

          {/* لیست آیتم‌ها */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center bg-white border-b border-gray-100 p-3"
            >
              {/* تصویر */}
              <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>

              {/* جزئیات */}
              <div className="flex flex-col flex-grow ml-4 space-y-3 pr-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

      );
    }

    // 💻 دسکتاپ
    return (
      <>
        <div className="flex p-4 gap-4 animate-pulse">
          {/* Sidebar فیلترها */}
          <aside className="hidden md:flex flex-col w-64 bg-white border border-gray-200 rounded-lg p-4 space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-3 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            ))}
          </aside>

          {/* بخش محصولات */}
          <main className="flex-1">
            <div className="h-8 bg-gray-200  w-1/4 mb-4"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="block bg-white py-3 px-4 border border-gray-200 "
                >
                  {/* اسکلت تصویر */}
                  <div className="aspect-square w-full overflow-hidden bg-gray-200 rounded-md mb-3"></div>

                  {/* اسکلت عنوان */}
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* اسکلت بخش وضعیت و امتیاز */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>

                  {/* اسکلت ارسال سریع */}
                  <div className="h-4 bg-gray-200 rounded w-1/5 mt-2"></div>

                  {/* اسکلت قیمت */}
                  <div className="flex justify-end mt-3">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </>
    );
  }

  // ✅ فیلترها و داده‌ها بعد از لود شدن
  const baseFiltered = data.filter((item) => {
    const matchCategory = categoryFromPath ? item.category === categoryFromPath : true;
    const matchQ = q
      ? item.title.toLowerCase().includes(q.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(q.toLowerCase()))
      : true;
    return matchCategory && matchQ;
  });

  const availableBrands = [...new Set(baseFiltered.map((p) => p.brand).filter(Boolean))];
  const availableColors = [...new Set(baseFiltered.flatMap((p) => p.colors || []))];

  const fullyFiltered = baseFiltered.filter((p) => {
    const brandOk = brandFilter.length ? brandFilter.includes(p.brand) : true;
    const colorOk =
      colorFilter.length ? (p.colors || []).some((c) => colorFilter.includes(c)) : true;
    const fastOk = fastShipping ? Boolean(p.fastShipping) : true;
    const sellerOk = sellerShipping ? Boolean(p.sellerShipping) : true;
    const stockOk = inStock ? p.inStock === true : true;
    return brandOk && colorOk && fastOk && sellerOk && stockOk;
  });

  // ✅ رندر نهایی بر اساس سایز صفحه
  return isMobile ? (
<SearchClientMobile
  products={fullyFiltered.filter(p => !categoryFromPath || p.category === categoryFromPath)}
  brandFilter={brandFilter}
  setBrandFilter={setBrandFilter}
  colorFilter={colorFilter}
  setColorFilter={setColorFilter}
  fastShipping={fastShipping}
  setFastShipping={setFastShipping}
  sellerShipping={sellerShipping}
  setSellerShipping={setSellerShipping}
  inStock={inStock}
  setInStock={setInStock}
  availableBrands={availableBrands}
  availableColors={availableColors}
  categoryLock={categoryFromPath} // ✅ فقط اینجا پاس بده
/>


  ) : (
    <SearchClient
      products={fullyFiltered}
      brandFilter={brandFilter}
      setBrandFilter={setBrandFilter}
      colorFilter={colorFilter}
      setColorFilter={setColorFilter}
      fastShipping={fastShipping}
      setFastShipping={setFastShipping}
      sellerShipping={sellerShipping}
      setSellerShipping={setSellerShipping}
      inStock={inStock}
      setInStock={setInStock}
      availableBrands={availableBrands}
      availableColors={availableColors}
    />
  );
}
