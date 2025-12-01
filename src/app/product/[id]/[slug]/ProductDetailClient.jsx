"use client";
import { addToCart } from "@/lib/cartService";
import { useAuth } from "@/app/hooks/useAuth";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Store, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/app/context/ModalProvider";
import AddToCartModal from "@/app/components/modals/AddToCartModal";
import Modal from "@/app/components/Modal/Modal";
export default function ProductDetailClient({ product }) {
    const { openModal } = useModal();
    const { user } = useAuth();
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
    const texts = [
        { text: "🔥 +۵۰۰ فروش در هفته گذشته", color: "text-[#2891E8]" },
        { text: "💯۵۰۰+ نفر بیش از ۲ بار این کالا را خریده‌اند", color: "text-[#2891E8]" },
        { text: "👀 +۵۰۰۰ بازدید در ۲۴ ساعت اخیر", color: "text-blue-600" },
    ];
    const [index, setIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, 3000); // هر ۳ ثانیه تغییر کند
        return () => clearInterval(interval);
    }, []);
    return (
        <div className=" mx-auto px-4 py-8 ">
            {/* بخش بالایی: گالری + جزئیات + فروشنده */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:col-span-1">

                {/* ستون ۱ - گالری تصاویر */}
                <div className="flex flex-col items-center">
                    {/* تصویر اصلی */}
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="rounded-xl border"
                    />

                    {/* گالری پایین */}
                    {product.gallery && product.gallery.length > 0 && (
                        <div className="flex gap-3 mt-4">
                            {product.gallery.map((img, i) => (
                                <Image
                                    key={i}
                                    src={img}
                                    alt={`${product.title} image ${i + 1}`}
                                    width={70}
                                    height={70}
                                    className="h-20 rounded-lg cursor-pointer border hover:border-red-500 transition"
                                />
                            ))}
                        </div>
                    )}
                </div>


                {/* ستون ۲ - جزئیات محصول */}
                <div className="space-y-4 lg:col-span-2">
                    <h1 className="text-xl font-bold">{product.title}</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-6">
                        <div className="lg:col-span-4 mt-5 border-t border-gray-300">
                            <div className="flex items-center gap-5 text-sm text-gray-500 pt-4">
                                <span>امتیاز: ⭐ {product.rating}</span>

                                <span dir="rtl" className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <span>{(2850).toLocaleString("fa-IR")} دیدگاه</span>
                                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                                </span>

                                <span dir="rtl" className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <span>{(404).toLocaleString("fa-IR")} پرسش</span>
                                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                                </span>
                            </div>


                            {/* رنگ‌ها */}
                            {product.colors && (
                                <div className="mt-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="font-semibold text-lg">رنگ:</span>
                                        <span
                                            className="w-4 h-4 rounded-full border border-gray-400 inline-block"
                                            style={{ backgroundColor: selectedColor }}
                                        ></span>
                                        <span className="font-bold text-gray-800">
                                            {selectedColor === "black"
                                                ? "مشکی"
                                                : selectedColor === "white"
                                                    ? "سفید"
                                                    : selectedColor === "gold"
                                                        ? "طلایی"
                                                        : selectedColor === "blue"
                                                            ? "آبی"
                                                            : selectedColor === "green"
                                                                ? "سبز"
                                                                : selectedColor}
                                        </span>
                                    </div>

                                    <div className="flex gap-4">
                                        {product.colors.map((color) => {
                                            const isSelected = selectedColor === color;
                                            return (
                                                <div
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all
              ${isSelected ? "border-4 border-[#19BFD3]" : "border-2 border-gray-200"}`}
                                                >
                                                    {/* دایره‌ی داخلی رنگ */}
                                                    <div
                                                        className="w-8 h-8 rounded-full border border-gray-100 transition"
                                                        style={{ backgroundColor: color }}
                                                    ></div>

                                                    {/* آیکن تیک فقط وقتی انتخاب شده */}
                                                    {isSelected && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="white"
                                                            className="absolute w-4 h-4"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M20.285 6.707a1 1 0 0 0-1.414-1.414l-9.192 9.193-3.536-3.536a1 1 0 1 0-1.415 1.414l4.243 4.243a1 1 0 0 0 1.415 0l9.899-9.9z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            <div className="mt-8">
                                <h3 className="font-bold text-lg mb-3">بیمه</h3>

                                <div className="border rounded-xl  flex items-center justify-between text-sm border-gray-300">
                                    {/* بخش چپ: چک‌باکس */}
                                    <div className=" border-l  border-gray-300 py-0 pr-4">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-[#19BFD3] cursor-pointer"
                                        />
                                    </div>


                                    {/* بخش وسط: توضیحات بیمه */}
                                    <div className="flex flex-col gap-1 text-right flex-grow pr-3 p-4">
                                        <span className="text-gray-800 font-medium">
                                            بیمه تجهیزات دیجیتال - بیمه سامان
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <span className="bg-[#2891E8] text-white text-xs px-2 py-0.5 rounded-full">
                                                ۵۰٪
                                            </span>
                                            <span className="text-gray-400 line-through text-xs">
                                                ۳۱۵,۰۰۰ تومان
                                            </span>
                                            <span className="text-gray-800 font-bold">۱۵۷,۳۰۰ تومان</span>
                                        </div>
                                    </div>

                                    {/* بخش راست: دکمه جزئیات */}
                                    <button className="text-[#19BFD3] flex items-center text-xs whitespace-nowrap">
                                        جزئیات <ChevronLeft size={14} />
                                    </button>
                                </div>
                            </div>

                            {product.specifications && (
                                <div className="mt-8">
                                    <h3 className="font-bold text-lg mb-4">ویژگی‌ها</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="bg-gray-100 rounded-lg px-4 py-3 flex flex-col  text-xs text-gray-700"
                                            >
                                                <span className="text-gray-500">{key}</span>
                                                <span className="font-semibold text-gray-800 mt-1">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-between mt-6">
                                {/* خط چپ */}
                                <div className="flex-1 border-t border-gray-300"></div>

                                {/* دکمه وسط */}
                                <div className="flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2 mx-3 cursor-pointer hover:bg-gray-50 transition">
                                    <p className="text-xs text-gray-700">مشاهده همه ویژگی‌ها</p>
                                    <ChevronLeft size={14} className="text-gray-500" />
                                </div>

                                {/* خط راست */}
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <p className="text-xs text-[#81858B] my-3 mx-5">امکان برگشت کالا در گروه موبایل با دلیل "انصراف از خرید" تنها در صورتی مورد قبول است که پلمب کالا باز نشده باشد.
                                تمام گوشی‌های دیجی‌متین ضمانت رجیستری دارند. در صورت وجود مشکل رجیستری، می‌توانید بعد از مهلت قانونی ۳۰ روزه، گوشی خریداری‌شده را مرجوع کنید.</p>

                            {/* ویژگی‌ها */}
                            {product.features && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700">
                                    {Object.entries(product.features).map(([key, value]) => (
                                        <div key={key}>
                                            {key === "camera" && <>📸 رزولوشن دوربین: {value}</>}
                                            {key === "os" && <>💻 سیستم عامل: {value}</>}
                                            {key === "display" && <>🖥️ نمایشگر: {value}</>}
                                            {key === "size" && <>📏 اندازه: {value}</>}
                                            {key === "battery" && <>🔋 باتری: {value}</>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* باکس فروشنده */}
                        <div className="border-gray-300 border rounded-xl p-5 space-y-4 lg:col-span-2 bg-[#F6F6F6] mr-3 self-start">
                            {/* عنوان فروشنده */}
                            <div>
                                <span className="text-gray-900 font-semibold">فروشنده</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="text-[#2891E8] text-sm hover:underline">
                                    {product.sellerCount ? `${product.sellerCount} فروشنده دیگر` : ""}
                                </button>
                            </div>

                            {/* اطلاعات فروشنده */}
                            <div className="flex  border-b border-gray-300 pb-1">
                                <div className="ml-4">
                                    <Store />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800 pb-4">{product.seller.name}</div>

                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                        <span className=" text-green-700 px-2 py-0.5 rounded-full">
                                            منتخب
                                        </span>
                                        <span>|</span>
                                        <span>عملکرد {product.seller.rating || "عالی"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <span className="text-xl font-bold text-[#25234E]">
                                    {product.seller.price.toLocaleString("fa-IR")}
                                    <span className="text-xs mr-1">تومان</span>
                                </span>
                            </div>

                            {/* وضعیت خرید */}
                            <div className="flex items-center justify-between text-xs text-gray-500">

                                <div className="flex justify-center items-center h-6 overflow-hidden ">
                                    <AnimatePresence mode="popLayout">
                                        <motion.p
                                            key={texts[index].text}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className={`font-bold text-xs ${texts[index].color}`}
                                        >
                                            {texts[index].text}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* دکمه خرید */}
                            <Button
                                disabled={!product.seller.available}
                                onClick={() => {
                                    if (!user) {
                                        alert("برای افزودن به سبد خرید باید وارد حساب شوید 😇");
                                        return;
                                    }
                                    // افزودن به سبد خرید
                                    addToCart(user.uid, product);

                                    // باز کردن مودال
                                    setModalOpen(true);

                                    // بستن خودکار بعد از 2 ثانیه (اختیاری)
                                    setTimeout(() => setModalOpen(false), 5000);
                                }}
                                className={`w-full py-3 text-xs font-bold rounded-ml ${product.seller.available
                                        ? "bg-[#2891E8] hover:bg-[#2891E8] text-white"
                                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    }`}
                            >
                                {product.seller.available ? "افزودن به سبد خرید" : "ناموجود"}
                            </Button>

                            {/* مودال */}
                            <Modal
                                isOpen={modalOpen}
                                onClose={() => setModalOpen(false)}
                                title="محصول به سبد خرید اضافه شد 🛒"
                            >
                                <p className="text-gray-600 text-sm">
                                    محصول <span className="font-semibold text-gray-800">{product.title}</span>{" "}
                                    با موفقیت به سبد خرید شما اضافه شد.
                                </p>

                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                    >
                                        تایید
                                    </button>
                                </div>
                            </Modal>




                            {/* گارانتی */}
                            <div className="flex items-center gap-2 text-xs text-gray-700 border-b border-gray-300 pb-3">
                                <span ><ShieldCheck className=" h-5 w-5" /></span>
                                <span>{product.seller.warranty}</span>
                            </div>

                            {/* هزینه ارسال */}
                            <div className=" items-center  gap-2 text-xs text-gray-700 ">
                                <p className="pb-3 font-bold">روش و هزینه ارسال</p>
                                <ul className="leading-6  pr-3">
                                    <li className="list-disc flex">
                                        <span>🚚</span>
                                        <p className="text-xs text-gray-500"> توسط دیجی‌متین</p>
                                    </li>

                                    <li className="flex">
                                        <img src="/fastsend.png" alt="ارسال سریع" className="w-5 h-5" />
                                        <p className="text-xs text-gray-500">ارسال سریع  دیجی‌متین</p>
                                    </li>
                                </ul>
                            </div>

                            {/* دیجی‌پلاس */}
                            <div className="flex items-center gap-2 text-xs text-gray-700 border-t border-gray-300 pt-4">
                                <span>✨</span>
                                <div>
                                    <p>ویژه اعضای دیجی‌پلاس</p>
                                    <p className="text-xs text-gray-500">ارسال سریع و رایگان</p>
                                </div>
                            </div>

                            {/* امتیاز */}
                            <div className="flex items-center justify-between text-xs border-t border-gray-300 pt-3">
                                <span>💰 ۱۵۰ امتیاز دیجی‌کلاب</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
