"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
export default function Stories() {
  const stories = [
    { id: 1, img: "/story1.jpg", title: "تمرین" },
    { id: 2, img: "/story2.jpg", title: "سیب زمینی با هواپز" },
    { id: 3, img: "/story3.jpg", title: "آب‌آور های هوشمند" },
    { id: 4, img: "/story4.jpg", title: "مایکرو و سولاردام" },
    { id: 5, img: "/story1.jpg", title: "بانکه 6 عددی" },
    { id: 6, img: "/story2.jpg", title: "دوز سوپر" },
    { id: 7, img: "/story3.jpg", title: "تولید محتوا" },
    { id: 8, img: "/story4.jpg", title: "قلو‌ویز لوله" },
    { id: 9, img: "/story1.jpg", title: "میکروفن بیسیم" },
    { id: 10, img: "/story2.jpg", title: "قلاده سگ" },
    { id: 11, img: "/story3.jpg", title: "قلاده سگ" },
    { id: 12, img: "/story4.jpg", title: "قلاده سگ" },
    { id: 13, img: "/story1.jpg", title: "قلاده سگ" },
    { id: 14, img: "/story2.jpg", title: "قلاده سگ" },
    { id: 15, img: "/story3.jpg", title: "قلاده سگ" },
    { id: 16, img: "/story4.jpg", title: "قلاده سگ" },
    { id: 17, img: "/story1.jpg", title: "قلاده سگ" },
    { id: 18, img: "/story3.jpg", title: "قلاده سگ" },
  ];

  return (
    <div className="relative w-full bg-white py-6 shadow-sm  md:px-20 md:mt-30 mt-25">
      {/* دکمه چپ */}
      <button className="custom-next hidden md:flex absolute left-20 top-1/2 -translate-y-1/2 z-5 bg-white p-2 rounded-full border-2 border-gray-300">
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* دکمه راست */}
      <button className="custom-prev hidden md:flex absolute right-20 top-1/2 -translate-y-1/2 z-5 bg-white p-2 rounded-full border-2 border-gray-300">
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="px-12"
      >
        {stories.map((story) => (
          <SwiperSlide
            key={story.id}
            className="!w-[60px] sm:!w-[80px] flex flex-col items-center cursor-pointer"
          >
            <div className="w-15 h-15 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-purple-500">
              <img
                src={story.img}
                alt={story.title}
                className="w-full h-full rounded-full border-2 border-white object-cover"
              />
            </div>
            <span className="text-[10px] sm:text-xs text-center mt-2 line-clamp-1">
              {story.title}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
