"use client";

import { useState,useMemo  } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCardMobile from "@/app/components/ProductCardMobile/ProductCardMobile";
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";
import Link from "next/link";


export default function SearchClientMobile({
  products,
  brandFilter,
  setBrandFilter,
  colorFilter,
  setColorFilter,
  fastShipping,
  setFastShipping,
  sellerShipping,
  setSellerShipping,
  inStock,
  setInStock,
  availableBrands,
  availableColors,
  categoryLock,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => !categoryLock || p.category === categoryLock);
  }, [products, categoryLock]);

  // تابع کمکى برای تیک زدن یا برداشتن از فیلترها
  const toggleArrayFilter = (value, listSetter, list) => {
    if (list.includes(value)) listSetter(list.filter((v) => v !== value));
    else listSetter([...list, value]);
  };

  return (
    <div className="flex flex-col">
      {console.log("categoryLock =", categoryLock)}
      {/* فیلتر بالای صفحه */}
      <div className="flex items-center gap-2 overflow-x-auto px-3 py-2 bg-white border-gray-200 sticky top-0 z-30">
        {/* دکمه باز شدن فیلتر کامل */}
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700 flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          فیلترها
        </button>

        {/* سوئیچ‌ها و فیلترهای سریع */}
        <button
          onClick={() => setFastShipping((v) => !v)}
          className={`border rounded-full px-3 py-1 text-sm flex-shrink-0 ${fastShipping ? "bg-blue-100 border-blue-500 text-blue-700" : "border-gray-300 text-gray-700"
            }`}
        >
          ارسال سریع
        </button>

        <button
          onClick={() => setSellerShipping((v) => !v)}
          className={`border rounded-full px-3 py-1 text-sm flex-shrink-0 ${sellerShipping ? "bg-blue-100 border-blue-500 text-blue-700" : "border-gray-300 text-gray-700"
            }`}
        >
          ارسال فروشنده
        </button>

        <button
          onClick={() => setInStock((v) => !v)}
          className={`border rounded-full px-3 py-1 text-sm flex-shrink-0 ${inStock ? "bg-blue-100 border-blue-500 text-blue-700" : "border-gray-300 text-gray-700"
            }`}
        >
          فقط موجودها
        </button>
      </div>

      {/* لیست محصولات */}

      <div className="p-3 flex flex-col gap-3">
        {filteredProducts.length ? (
          filteredProducts.map((p) => <ProductCardMobile key={p.id} product={p} />)
        ) : (
          <div className="text-center text-gray-500 py-10">محصولی یافت نشد.</div>
        )}

      </div>

      {/* پنجره فیلتر کامل */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-end">
          <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="font-bold text-gray-800">فیلترها</h2>
              <button onClick={() => setShowFilter(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* برند */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-gray-700">برند</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {availableBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggleArrayFilter(b, setBrandFilter, brandFilter)}
                    className={`border rounded-full px-3 py-1 ${brandFilter.includes(b)
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700"
                      }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* رنگ */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-gray-700">رنگ</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {availableColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleArrayFilter(c, setColorFilter, colorFilter)}
                    className={`border rounded-full px-3 py-1 ${colorFilter.includes(c)
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700"
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* محدوده قیمت */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-gray-700">محدوده قیمت</h3>
              <PriceRangeSlider
                min={100000}
                max={10000000}
                step={1000}
                value={priceRange}
                onChange={setPriceRange}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setBrandFilter([]);
                  setColorFilter([]);
                  setFastShipping(false);
                  setSellerShipping(false);
                  setInStock(false);
                  setShowFilter(false);
                }}
                className="text-gray-600 text-sm"
              >
                حذف فیلترها
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm"
              >
                اعمال فیلترها
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
