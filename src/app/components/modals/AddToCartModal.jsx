"use client";
import Image from "next/image";
import Link from "next/link";

export default function AddToCartModal({ product }) {
  return (
    <div className="text-right">
      <h2 className="text-green-600 font-bold text-lg flex items-center gap-1">
        ✅ کالا به سبد خرید اضافه شد!
      </h2>

      <div className="flex items-center gap-3 mt-4 border-b pb-3">
        <Image
          src={product.image}
          alt={product.title}
          width={64}
          height={64}
          className="rounded-md border"
        />
        <div>
          <p className="text-sm font-medium">{product.title}</p>
          <p className="text-xs text-gray-500">
            {product.price.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <Link
          href="/checkout/cart"
          className="text-[#ef4056] font-bold text-sm hover:underline flex items-center gap-1"
        >
          برو به سبد خرید
        </Link>
        <p className="text-xs text-gray-500">🛒 خرید لذت‌بخش!</p>
      </div>
    </div>
  );
}
