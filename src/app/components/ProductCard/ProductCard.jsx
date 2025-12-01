// components/ProductCard.jsx
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";

export default function ProductCard({ product }) {
  // حتماً slug رو encode می‌کنیم تا کاراکتر فارسی/خاص مشکل‌ساز نشه
  const productUrl = `/product/dkp-${product.id}/${encodeURIComponent(product.slug)}`;

  return (
    <Link
      passHref
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white py-3 px-4 hover:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] transition rounded-lg"
    >
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="mt-3 space-y-2">
        <h3 className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        <div className="flex items-center justify-between text-xs">
          {product.inStock ? (
            <div className="flex items-center gap-1 text-gray-500">
              <FiPackage className="text-cyan-500 w-4 h-4" />
              <span className="truncate">موجود در انبار</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-500">
              <img src="/seller.svg" alt="فروشنده" className="w-4 h-4" />
              <span className="truncate">ارسال فروشنده</span>
            </div>
          )}

          {product.rating && (
            <div className="flex items-center gap-1 text-[#23254e]">
              <span className="font-bold">
                {product.rating.toLocaleString("fa-IR").replace(/,/g, ".")}
              </span>
              <AiFillStar className="text-yellow-400 w-4 h-4" />
            </div>
          )}
        </div>

        {product.fastShipping && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 inline-block">
            ارسال سریع
          </span>
        )}

        <div className="flex justify-end mt-2 text-[#3f4046]">
          <span className="font-bold text-sm">
            {product.price.toLocaleString("fa-IR")}{" "}
            <svg className="w-4 h-4 text-gray-600">
              <use xlinkHref="/icons/sprite.svg#toman"></use>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
