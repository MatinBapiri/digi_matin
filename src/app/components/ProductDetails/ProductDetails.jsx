export default function ProductDetails({ product }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>امتیاز:</span>
        <span className="font-semibold text-yellow-500">{product.rating} ⭐</span>
        <span>({product.reviewsCount} دیدگاه)</span>
      </div>

      {/* رنگ‌ها */}
      {product.colors && (
        <div className="mt-4">
          <span className="text-sm text-gray-700 font-medium">رنگ:</span>
          <div className="flex gap-2 mt-2">
            {product.colors.map((c, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* ویژگی‌ها */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-4">
        <div className="bg-gray-50 p-2 rounded-lg">دوربین: {product.camera}</div>
        <div className="bg-gray-50 p-2 rounded-lg">اندازه: {product.size}"</div>
        <div className="bg-gray-50 p-2 rounded-lg">رم: {product.ram}</div>
        <div className="bg-gray-50 p-2 rounded-lg">حافظه: {product.storage}</div>
      </div>
    </div>
  );
}
