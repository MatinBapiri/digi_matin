"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import useIsMobile from "@/app/hooks/useIsMobile"

export default function AmazingOffers() {
  const isMobile = useIsMobile(768);
  // --- شمارش معکوس (مثال: 13 ساعت)
  const [timeLeft, setTimeLeft] = useState(13 * 60 * 60); // ثانیه

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // تبدیل ثانیه به ساعت، دقیقه، ثانیه
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  const products = [
    { id: 1, title: "لپ تاپ 15.6 اینچی ایسوس مدل ExpertBook P1", price: "62,990,000", oldPrice: "67,490,000", discount: "7%", image: "/asus.png" },
    { id: 2, title: "لپ تاپ 15.6 اینچی لنوو مدل IdeaPad 1", price: "20,799,000", oldPrice: "22,559,000", discount: "8%", image: "/lenovo.png" },
    { id: 3, title: "لپ تاپ 15.6 اینچی اچ پی مدل Victus Gaming 15", price: "63,899,000", oldPrice: "70,150,000", discount: "10%", image: "/lenovo.png" },
    { id: 4, title: "لپ تاپ 15.6 اینچی ایسر مدل Aspire 3 A315", price: "40,899,000", oldPrice: "47,400,000", discount: "13%", image: "/acer.png" },
    { id: 5, title: "دفتر برنامه‌ریزی 120 برگ دیاتک مدل پلنر یکساله", price: "254,000", oldPrice: "300,000", discount: "15%", image: "/planner.png" },
    { id: 6, title: "دفتر مشق 80 برگ آوان مدل حاشیه دار طرح کرومی", price: "115,000", oldPrice: "138,000", discount: "17%", image: "/notebook.png" },
    { id: 7, title: "دفتر مشق 80 برگ آوان مدل حاشیه دار طرح کرومی", price: "115,000", oldPrice: "138,000", discount: "17%", image: "/notebook.png" },
    { id: 8, title: "دفتر مشق 80 برگ آوان مدل حاشیه دار طرح کرومی", price: "115,000", oldPrice: "138,000", discount: "17%", image: "/notebook.png" },
    { id: 9, title: "دفتر مشق 80 برگ آوان مدل حاشیه دار طرح کرومی", price: "115,000", oldPrice: "138,000", discount: "17%", image: "/notebook.png" },
    { id: 10, title: "دفتر مشق 80 برگ آوان مدل حاشیه دار طرح کرومی", price: "115,000", oldPrice: "138,000", discount: "17%", image: "/notebook.png" },
    { id: 11, title: "دفتر مشق 80 برگ آوان مدل حاشیه دار طرح کرومی", price: "115,000", oldPrice: "138,000", discount: "17%", image: "/notebook.png" },
    { id: 12, title: "دفتر مشق 80 برگ آوان مدل حاشیه دار طرح کرومی", price: "115,000", oldPrice: "138,000", discount: "17%", image: "/notebook.png" },
  ];

  return (
    <div className="
  bg-gradient-to-r relative from-[#2891E8] to-blue-600
  flex flex-col md:flex-row items-stretch
  m-2 md:m-10
  py-4 px-3 md:py-5 md:px-4
  rounded-2xl gap-3 md:gap-4
  mx-2 md:mx-20
">
      {/* 🔴 بخش پیشنهاد شگفت‌انگیز */}
      <button className="custom-next hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-5 bg-white p-2 rounded-full border-2 border-gray-300">
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* دکمه راست */}
      <button className="custom-prev hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-5 bg-white p-2 rounded-full border-2 border-gray-300">
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      {isMobile &&
        <div className="text-white flex   items-center  rounded-xl ">

          <div className="pl-2 relative w-8 h-8">
            <Image src="/Amazing.svg" alt="Amazing Offer" fill className="object-contain" />
          </div>
          <ul className="pl-2 gap-1 flex text-lg font-bold text-center leading-7">
            <li>پیشنهاد</li>
            <li>شگفت</li>
            <li>انگیز</li>
          </ul>
          <div className="flex-1 flex-row-reverse justify-center items-center gap-2 text-black font-bold">
            <span className="bg-white px-1.5 py-0.5 rounded-md text-xs">{h}</span>
            <span className="bg-white px-1.5 py-0.5 rounded-md text-xs">{m}</span>
            <span className="bg-white px-1.5 py-0.5 rounded-md text-xs">{s}</span>
          </div>


          <a href="#" className="text-sm underline items-center text-white whitespace-nowrap">
            مشاهده همه
          </a>

        </div>
      }
      {/* 🛍 اسلایدر محصولات */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <Swiper
          slidesPerView="auto"
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          spaceBetween={12}

          className="pb-3"
        >

          {isMobile === false && (
            <SwiperSlide className="!w-[180px] flex justify-center items-center">
              <div className="text-white flex flex-col justify-between items-center p-5 rounded-xl h-auto w-48 gap-2">

                <h2 className="text-lg font-bold text-center leading-7">
                  پیشنهاد<br />شگفت<br />انگیز
                </h2>

                <div className="flex flex-row-reverse justify-center items-center gap-1 text-black font-bold">
                  <span className="bg-white px-1.5 py-0.5 rounded-md text-xs">{h}</span>
                  <span className="bg-white px-1.5 py-0.5 rounded-md text-xs">{m}</span>
                  <span className="bg-white px-1.5 py-0.5 rounded-md text-xs">{s}</span>
                </div>

                <div className="relative w-20 h-20">
                  <Image src="/Amazing.svg" alt="Amazing Offer" fill className="object-contain" />
                </div>

                <a href="#" className="text-sm underline text-white whitespace-nowrap">
                  مشاهده همه
                </a>

              </div>
            </SwiperSlide>
          )}
          {products.map((p) => (
            <SwiperSlide
              key={p.id}
              className="!w-[130px] sm:!w-[180px] md:w-[220px] lg:w-[240px] flex flex-col items-center cursor-pointer"
            >
              <div className="bg-white flex flex-col items-center  hover:shadow-lg transition-shadow duration-200 p-3 h-[230px] sm:h-[250px]">
                {/* تصویر */}
                <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]">
                  <Image src={p.image} alt={p.title} fill className="object-contain" />
                </div>

                {/* عنوان */}
                <h3 className="text-[10px] sm:text-xs md:text-sm mt-2 text-center line-clamp-2 text-gray-700">
                  {p.title}
                </h3>

                {/* قیمت */}
                <div className="flex justify-between items-center w-full mt-auto">
                  <div>
                    <p className="text-gray-400 text-[10px] sm:text-xs line-through">{p.oldPrice} تومان</p>
                    <p className="text-black font-bold text-xs sm:text-sm">{p.price} تومان</p>
                  </div>
                  <span className="bg-[#2891E8] text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md">
                    {p.discount}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>


  );
}
