"use client";

import Link from "next/link";

export default function ProductCardMobile({ product }) {
  console.log("product props:", product); // 🔹 قبل از شرط بنویس تا همیشه لاگ بشه
  const productUrl = `/product/dkp-${product.id}/${encodeURIComponent(product.slug)}`;
  if (!product) return null;
  
  return (
    <Link
      passHref
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
    >

      <div className="flex items-center justify-between bg-white  p-3 border-b border-gray-200">
        {/* تصویر */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
            loading="eager"
          />
        </div>
        {/* جزئیات */}
        <div className="flex flex-col justify-between flex-1 mr-3">
          <div className="text-sm font-medium text-gray-800 line-clamp-2">
            {product.title}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            {product.brand && <span>{product.brand} - </span>}
            {product.memory && <span>{product.memory}</span>}
          </div>

          <div className="text-sm font-bold text-gray-800 mt-2 text-left">
            {product.price?.toLocaleString("fa-IR")} تومان
          </div>
        </div>
      </div>
    </Link>
  );
}
