"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CityModal({ open, onClose, onSelect }) {

    const [locations, setLocations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // load iran-city correctly
    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("https://iran-locations-api.vercel.app/api/v1/fa/cities");
                const cities = await res.json();

                console.log("raw cities:", cities);

                // --- group by province ---
                const grouped = {};

                cities.forEach(city => {
                    const province = city.province?.name || "نامشخص";

                    if (!grouped[province]) grouped[province] = [];
                    grouped[province].push(city);
                });

                console.log("grouped:", grouped);

                setLocations(grouped);  // ذخیره در استیت
            } catch (err) {
                console.error("Fetch error:", err);
                setError(true);  // اگر خطا رخ دهد
            }

            setLoading(false);
        }

        load();
    }, []);

    // disable scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    if (!open) return null;

    return (
        <AnimatePresence >
            {/* overlay */}
            <motion.div
                dir="rtl"
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-50"
                onClick={onClose}
            />

            {/* modal */}
            <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
                <motion.div
                    key="modal"
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                >

                    <div className="bg-white w-full sm:w-[550px] max-h-[85vh] rounded-xl p-4 shadow-xl flex flex-col">
                        <div className="flex justify-between items-center mb-4 flex-shrink-0">
                            <h2 className="text-lg font-bold">انتخاب شهر</h2>
                            <button 
                                className="cursor-pointer hover:text-red-500 focus:outline-none" 
                                onClick={onClose}
                            >
                                ✕
                            </button>
                        </div>

                        {/* --- SCROLL AREA --- */}
                        <div className="overflow-y-auto">
                            <div>
                                {loading && <p>در حال بارگذاری...</p>}
                                {error && <p className="text-red-500">خطا در بارگذاری داده‌ها. لطفا دوباره تلاش کنید.</p>}
                                
                                {locations && !loading && !error &&
                                    Object.keys(locations).map((province) => (
                                        <div key={province} className="mb-4 pl-2">
                                            <h3 className="text-blue-600 mb-2">{province}</h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {locations[province].map((city,index) => (
                                                    <button
                                                        key={index} // اگر id وجود داشته باشد
                                                        onClick={() => onSelect(city)}
                                                        className="p-2 border rounded hover:bg-gray-100"
                                                    >
                                                        {city.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                }
                                {(!loading && !locations) && <p>هیچ داده‌ای یافت نشد.</p>}
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
