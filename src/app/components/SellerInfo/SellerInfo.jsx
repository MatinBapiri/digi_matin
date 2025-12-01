export default function SellerInfo({ product }) {
  return (
    <div className="border rounded-xl p-4 space-y-4 shadow-sm">
      <div>
        <h2 className="text-sm font-bold">فروشنده</h2>
        <p className="text-gray-700">{product.seller || "دیجی‌متین"}</p>
      </div>

      <div className="text-gray-600 text-sm">
        <p>گارانتی: {product.warranty || "۱۸ ماهه شرکتی"}</p>
        <p>ارسال توسط: دیجی‌متین</p>
      </div>

      <div className="border-t pt-4">
        <p className="text-lg font-bold text-gray-800 text-left">
          {product.price.toLocaleString("fa-IR")} تومان
        </p>
        <button className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}
