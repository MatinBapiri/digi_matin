"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function MainSlider() {
  const slides = [
    { id: 1, img: "https://dkstatics-public.digikala.com/digikala-adservice-banners/7cf2809f87f0f26ab16bec6709d4be1a757d17c1_1758557208.jpg?x-oss-process=image/quality,q_95" },
    { id: 2, img: "https://dkstatics-public.digikala.com/digikala-adservice-banners/96b03c4302bdf718930c6d34c026a50d50b102f6_1758106333.jpg?x-oss-process=image/quality,q_95" },
    { id: 3, img: "https://dkstatics-public.digikala.com/digikala-adservice-banners/1381a0815951fe171158bf013e71df42dd24c3dc_1758387004.jpg?x-oss-process=image/quality,q_95" },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[400px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.img}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
