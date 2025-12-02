"use client";
import { X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CityModalMobile({ isOpen, onClose, onSelect }) {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // load iran-city correctly
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://iran-locations-api.vercel.app/api/v1/fa/cities");
        const cities = await res.json();

        // --- group by province ---
        const grouped = {};

        cities.forEach(city => {
          const province = city.province?.name || "نامشخص";

          if (!grouped[province]) grouped[province] = [];
          grouped[province].push(city);
        });

        setLocations(grouped); // ذخیره در استیت
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true); // اگر خطا رخ دهد
      }

      setLoading(false);
    }

    load();
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl p-5 pb-6 z-[999]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ maxHeight: '80vh' }}  // تنظیم ارتفاع بیشتر برای مودال
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b">
              <button onClick={onClose}>
                <X size={26} className="text-gray-600" />
              </button>

              <h2 className="text-lg font-semibold text-gray-800">
                انتخاب  شهر
              </h2>

              <div className="w-6" /> {/* dummy for balance */}
            </div>

            {/* Loading and Error */}
            {loading && <p className="text-gray-600 text-sm leading-6 mt-4 text-center">در حال بارگذاری...</p>}
            {error && <p className="text-red-500 text-sm leading-6 mt-4 text-center">خطا در بارگذاری داده‌ها. لطفا دوباره تلاش کنید.</p>}

            {/* List of Cities */}
            {locations && !loading && !error && (
              <div className="overflow-y-auto max-h-[70vh]">  {/* افزایش ارتفاع محتویات */}
                {Object.keys(locations).map((province) => (
                  <div key={province} className="mb-4">
                    <h3 className="text-blue-600 mb-2">{province}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {locations[province].map((city, index) => (
                        <button
                          key={index}
                          onClick={() => onSelect(city)}
                          className="p-2 border rounded hover:bg-gray-100"
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No data available */}
            {!loading && !locations && (
              <p className="text-center text-gray-600">هیچ داده‌ای یافت نشد.</p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
