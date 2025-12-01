"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown, Youtube, Twitter, Linkedin, Instagram } from "lucide-react";

const mobileSections = [
  {
    title: "با دیجی‌متین",
    links: ["اتاق خبر دیجی‌متین", "فروش در دیجی‌متین", "فرصت‌های شغلی", "تماس با دیجی‌متین", "درباره دیجی‌متین"],
  },
  {
    title: "خدمات مشتریان",
    links: ["پاسخ به پرسش‌های متداول", "رویه بازگرداندن کالا", "شرایط استفاده", "حریم خصوصی", "گزارش باگ"],
  },
  {
    title: "راهنمای خرید از دیجی‌متین",
    links: ["نحوه ثبت سفارش", "رویه ارسال سفارش", "شیوه‌های پرداخت"],
  },
  {
    title: "شرکای تجاری",
    links: ["تبلیغات در دیجی‌متین", "همکاری تجاری"],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToContact = () => {
    const section = document.getElementById("header-mobile");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-50 py-12 w-full  lg:border-amber-50 mb-10">
      <div className="mx-auto px-5 ">

        {/* دکمه بازگشت به بالا */}
        <div className="flex justify-center mb-6 lg:justify-end">
          <button
            onClick={scrollToContact}
            className="flex px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 lg:hidden"
          >
            رفتن به بالا <ChevronUp className='' />
          </button>
        </div>

        {/* 📱 موبایل: آکاردئون */}
        <div className="block lg:hidden">
          <div className="space-y-2">
            {mobileSections.map((section, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between items-center py-3 text-black text-[13px]"
                >
                  <span>{section.title}</span>
                  {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openIndex === index && (
                  <ul className="pl-4 pr-2 pb-3 space-y-2 text-xs text-gray-500">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href="#" className="hover:text-red-500">{link}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 💻 دسکتاپ: همون کدی که خودت نوشتی */}
        <div className="hidden lg:block">
          {/* همون محتوای کامل فوتر خودت دقیقا اینجا قرار می‌گیره */}
          {/* 👇👇👇 */}
          
          <div className="justify-between items-center">
            <div className="flex justify-between items-center space-x-4 ">
              <img src="/digikala22.png" alt="Digikala Logo" className="h-10 w-auto" />
              <button  className="justify-end border-1 lg:flex p-2 text-gray-400 rounded-lg items-center hidden" onClick={scrollToContact}>
                <p className='pl-2 text-xs '>بازگشت به بالا</p>
                <ChevronUp className='' />
              </button>
            </div>
            <div className="mt-4 space-x-6 text-xs">
              <a href="#" className="text-gray-700 hover:text-red-500 ">تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</a>
              <a href="#" className="text-gray-700 hover:text-red-500 ">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</a>
            </div>
          </div>

          {/* بخش مزایا */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
            <div className="text-center">
              <img src="https://www.digikala.com/statics/img/svg/footer/original-products.svg" className="mx-auto mb-2" />
              <p className="text-sm text-gray-600">ضمانت اصل بودن کالا</p>
            </div>
            <div className="text-center">
              <img src="https://www.digikala.com/statics/img/svg/footer/days-return.svg" className="mx-auto mb-2" />
              <p className="text-sm text-gray-600">هفت روز ضمانت بازگشت کالا</p>
            </div>
            <div className="text-center">
              <img src="https://www.digikala.com/statics/img/svg/footer/support.svg" className="mx-auto mb-2" />
              <p className="text-sm text-gray-600">۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ</p>
            </div>
            <div className="text-center">
              <img src="https://www.digikala.com/statics/img/svg/footer/cash-on-delivery.svg" className="mx-auto mb-2" />
              <p className="text-sm text-gray-600">امکان پرداخت در محل</p>
            </div>
            <div className="text-center">
              <img src="https://www.digikala.com/statics/img/svg/footer/express-delivery.svg" className="mx-auto mb-2" />
              <p className="text-sm text-gray-600">امکان تحویل اکسپرس</p>
            </div>
          </div>

          {/* گرید لینک‌ها */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            <div>
              <h3 className="text-lg text-gray-700 mb-2 ">با دیجی‌متین</h3>
              <ul className="text-neutral-500 space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-500">اتاق خبر دیجی‌متین</a></li>
                <li><a href="#" className="hover:text-red-500">فروش در دیجی‌متین</a></li>
                <li><a href="#" className="hover:text-red-500">فرصت‌های شغلی</a></li>
                <li><a href="#" className="hover:text-red-500"> تماس با دیجی‌متین</a></li>
                <li><a href="#" className="hover:text-red-500">درباره دیجی‌متین </a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg  text-gray-700 mb-2">خدمات مشتریان</h3>
              <ul className="text-neutral-500  space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-500">پاسخ به پرسش‌های متداول</a></li>
                <li><a href="#" className="hover:text-red-500">رویه بازگرداندن کالا</a></li>
                <li><a href="#" className="hover:text-red-500">شرایط استفاده</a></li>
                <li><a href="#" className="hover:text-red-500">حریم خصوصی</a></li>
                <li><a href="#" className="hover:text-red-500">گزارش باگ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg  text-gray-700 mb-2 ">راهنمای خرید از دیجی‌متین</h3>
              <ul className="text-neutral-500  space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-500">نحوه ثبت سفارش</a></li>
                <li><a href="#" className="hover:text-red-500">رویۀ ارسال سفارش</a></li>
                <li><a href="#" className="hover:text-red-500">شیوه‌های پرداخت</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg  text-gray-700 mb-2">همراه ما باشید!</h3>
              <div className="flex space-x-8 space-y-2 text-neutral-500 ">
                <a href="#" className=" hover:text-red-500 "><Instagram/></a>
                <a href="#" className=" hover:text-red-500"> <Twitter /></a>
                <a href="#" className=" hover:text-red-500"> <Youtube/></a>
                <a href="#" className=" hover:text-red-500"><Linkedin/></a>
              </div>
              <div>
                <h3 className="text-base  text-gray-700 mt-4">با ثبت ایمیل، از جدیدترین تخفیف‌ها باخبر شوید!</h3>
                <div className="mt-4 flex">
                  <input
                    type="email"
                    placeholder="ایمیل شما"
                    className="p-2 border border-gray-300 rounded-lg w-80 ml-2 bg-gray-200"
                  />
                  <button className="p-2 bg-[#2891E8] text-white rounded-lg">ثبت</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* توضیحات پایینی مشترک */}
        <div className="mt-6 text-center text-xs text-gray-500 leading-6">
          دیجی‌متین، بزرگترین فروشگاه اینترنتی ایران. تجربه خریدی سریع، آسان و مطمئن.
        </div>
      </div>
    </footer>
  );
}
