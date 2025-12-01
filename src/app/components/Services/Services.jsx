"use client";
import {
  Car,
  Scissors,
  Coins,
  Star,
  CreditCard,
  Calendar,
  ShoppingCart,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Services() {
  const items = [
    { id: 1, title: "سوپرمارکت", desc: "", icon: <ShoppingCart className="w-6 h-6 text-white" />, color: "bg-green-600" },
    { id: 2, title: "آیفون 17", desc: "ببر", icon: <Calendar className="w-6 h-6 text-white" />, color: "bg-red-500" },
    { id: 3, title: "طلای دیجیتال", desc: " ", icon: <Coins className="w-6 h-6 text-white" />, color: "bg-teal-700" },
    { id: 4, title: "دریافت", desc: "اعتبار", icon: <CreditCard className="w-6 h-6 text-white" />, color: "bg-blue-600" },
    { id: 5, title: "اشتراک", desc: "پلاس", icon: <Star className="w-6 h-6 text-white" />, color: "bg-purple-600" },
    { id: 6, title: "سکه طلا", desc: "بفروش", icon: <Coins className="w-6 h-6 text-white" />, color: "bg-yellow-600" },
    { id: 7, title: "صنایع‌دستی", desc: "", icon: <Scissors className="w-6 h-6 text-white" />, color: "bg-amber-700" },
    { id: 8, title: "خرید", desc: "خودرو", icon: <Car className="w-6 h-6 text-white" />, color: "bg-black" },
    { id: 9, title: "طلا", desc: "سود صفر", icon: <Coins className="w-6 h-6 text-white" />, color: "bg-green-800" },
    { id: 10, title: "بیشتر", desc: "", icon: <span className="text-white text-xl">...</span>, color: "bg-gray-400" },
  ];

  return (
    <div className="relative w-full bg-white py-6 md:px-10 mt-3">
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={3.5} // برای موبایل کوچک
        navigation={false} // در موبایل معمولاً فلش‌ها حذف می‌شن
        breakpoints={{
          480: { slidesPerView: 7.8 },
          640: { slidesPerView: 6 },
          768: { slidesPerView: 7 },
          1024: { slidesPerView: 8 },
          1280: { slidesPerView: 10 },
        }}
        className="px-4 md:px-8"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col text-center items-center mr-4">
              <div
                className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full ${item.color} shadow-sm`}
              >
                {item.icon}
              </div>
              <p className="mt-2 text-xs md:text-xs font-semibold text-blue-900">
                {item.title}
              </p>
              {item.desc && (
                <p className="text-[10px] md:text-xs text-gray-500">
                  {item.desc}
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
