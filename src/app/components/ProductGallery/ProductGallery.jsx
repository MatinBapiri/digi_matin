"use client";
import { useState } from "react";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* تصاویر کوچک */}
      <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
        {product.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`product-${i}`}
            onClick={() => setSelectedImage(img)}
            className={`w-16 h-16 border rounded-lg cursor-pointer object-cover ${
              selectedImage === img ? "border-blue-500" : "border-gray-200"
            }`}
          />
        ))}
      </div>

      {/* تصویر اصلی */}
      <div className="flex-1 flex justify-center items-center order-1 lg:order-2">
        <img
          src={selectedImage}
          alt={product.title}
          className="max-h-[500px] object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
