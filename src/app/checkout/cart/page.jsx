"use client";

import {
    ChevronLeft,
    Trash2,
    ShieldCheck,
    Store,
    Truck,
    MoreVertical,
    Sparkles
} from "lucide-react";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import {
    getUserCart,
    removeFromCart,
    updateCartQuantity,
} from "@/lib/cartService";
import { CharityBadge } from "@/app/components/CharityBadge/CharityBadge";
import BottomNavigation from "@/app/components/BottomNavigation/BottomNavigation";

export default function CartPage() {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getUserCart(user.uid).then((items) => {
                setCartItems(items);
                setLoading(false);
            });
        }
    }, [user]);

    const handleRemove = async (id) => {
        if (!user) return;
        await removeFromCart(user.uid, id);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleChangeQuantity = async (id, delta) => {
        if (!user) return;
        await updateCartQuantity(user.uid, id, delta);
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (!user)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600 text-lg">لطفاً وارد حساب کاربری خود شوید</p>
            </div>
        );

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex justify-center items-center space-x-1 h-20">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-fade" style={{ animationDelay: "0.4s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-fade" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-fade"></span>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen">
            
            <div className="max-w-screen-xl mx-auto p-4 md:p-8 mt-0 md:mt-8">
                {/* Tabs */}
                <header className="mb-6">
                    <div className="flex items-center border-b border-gray-200">
                        <div className="relative py-4 px-2">
                            <a
                                href="#"
                                className="flex items-center gap-2 text-gray-800 font-bold"
                            >
                                <span>سبد خرید</span>
                                <span className="bg-[#2891E8] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                    {cartItems.length}
                                </span>
                            </a>
                            <div className="absolute bottom-0 right-0 w-full h-1 bg-[#2891E8] rounded-b-2xl "></div>
                        </div>
                        <div className="py-4 px-4">
                            <a href="#" className="text-gray-500 hover:text-gray-700">
                                خرید بعدی
                            </a>
                        </div>
                    </div>
                </header>

                {/* Main */}
                <main className="grid grid-cols-12 gap-8">
                    {/* 🧾 ستون چپ (خلاصه سفارش) */}
                    {cartItems.length > 0 ? (
                        <aside className="col-span-12 lg:col-span-3 order-2 lg:order-2">
                            <div className="sticky top-8 space-y-4 ">
                                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                                    <div className="flex justify-between items-center text-sm text-gray-600">
                                        <p>قیمت کالاها ({cartItems.length})</p>
                                        <p>
                                            {total.toLocaleString()}{" "}
                                            <span className="text-xs">تومان</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center ">
                                        <p>جمع سبد خرید</p>
                                        <p>
                                            {total.toLocaleString()}{" "}
                                            <span className="text-xs font-medium">تومان</span>
                                        </p>
                                    </div>
                                    <button className="w-full bg-[#2891E8] text-white py-3 rounded-lg text-sm hover:cursor-pointer">
                                        تایید و تکمیل سفارش
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 text-center px-2">
                                    هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالاها
                                    از سبد حذف می‌شوند.
                                </p>

                                <div className="bg-[#fff7fe] border border-purple-200 rounded-lg p-4 flex items-start gap-3">
                                    <div className="flex-1">
                                        <div className="flex ">
                                            <Sparkles className="text-purple-500 w-4 h-4 mt-1" />
                                            <p className=" text-purple-600 text-xs">
                                                هر ماه ۱۰ ارسال رایگان با پلاس!
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            ۴ ارسال دیجی‌متین | ۲ ارسال سوپرمارکت | ۴ ارسال ۴۵ دقیقه‌ای
                                        </p>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-purple-500  text-xs flex items-center"
                                    >
                                        افزودن <ChevronLeft size={16} />
                                    </a>
                                </div>
                                <CharityBadge />

                            </div>
                        </aside>) : null}
                    {/* 🛒 ستون راست (لیست محصولات سبد) */}
                    {cartItems.length ? (
                        <div className="col-span-12 lg:col-span-9 order-1 lg:order-1 space-y-4">
                            <h2 className="font-bold text-lg">
                                سبد خرید شما{" "}
                                <span className="text-sm font-normal text-gray-500">
                                    {cartItems.length} مرسوله
                                </span>
                            </h2>


                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white mb-4 border-b border-gray-200">
                                    {/* بالای کارت - اطلاعات محصول */}
                                    <div className="p-4 flex gap-4">
                                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={128}
                                                    height={128}
                                                    className="object-contain w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 rounded-lg" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="text-sm font-medium text-gray-800 leading-relaxed">{item.name}</p>
                                                <button
                                                    className="text-gray-400 hover:text-gray-600"
                                                    onClick={() => handleRemove(item.id)}
                                                >
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>

                                            <div className="mt-2 space-y-2 text-sm text-gray-600">
                                                {item.color && (
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-4 h-4 rounded-full border"
                                                            style={{ backgroundColor: item.color }}
                                                        ></div>
                                                        <span>{item.color}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={16} className="text-gray-500" />
                                                    <span>گارانتی ۲۴ ماهه</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Store size={16} className="text-gray-500" />
                                                    <span>فروشنده: دیجی‌متین</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Truck size={16} className="text-[#2891E8]" />
                                                    <span className="font-bold">ارسال دیجی‌متین</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* زیر کارت - کنترل تعداد و قیمت */}
                                    <div className="p-4 flex items-center justify-between ">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => handleChangeQuantity(item.id, 1)}
                                                    className="px-3 py-1 text-[#2891E8] text-xl font-bold"
                                                >
                                                    +
                                                </button>
                                                <span className="px-4 py-1 font-bold hover:text-[#2891E8]">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleChangeQuantity(item.id, -1)}
                                                    className="px-3 py-1 text-gray-400 hover:text-[#2891E8]"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="px-3 py-1 text-gray-400 hover:text-[#2891E8]"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end p-3">
                                            <p className="text-xl font-bold text-gray-800">
                                                {(item.price * item.quantity).toLocaleString()}{" "}
                                                <span className="text-sm font-medium">تومان</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* بیمه */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div className="pl-4">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 rounded-md border-gray-400 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs">بیمه تجهیزات دیجیتال - بیمه سامان</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex flex-col items-start">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white bg-[#2891E8] text-xs  px-1.5 py-0.5 rounded-full">۵۰٪</span>
                                                            <span className=" text-gray-800">
                                                                ۱,۳۳۲,۱۰۰ <span className="text-xs ">تومان</span>
                                                            </span>
                                                        </div>
                                                        <span className="text-gray-400 line-through text-xs mr-9">۲,۶۶۴,۲۰۰</span>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <a href="#" className="text-cyan-600 text-xs font-bold flex items-center justify-end mt-3">
                                            جزئیات <ChevronLeft size={16} />
                                        </a>
                                    </div>

                                    {/* لینک پایین */}
                                    <div className="flex justify-end pt-2 pb-4">
                                        <a href="#" className="text-cyan-600 text-sm font-bold flex items-center">
                                            انتقال به خرید بعدی <ChevronLeft size={16} />
                                        </a>
                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* 🔹 بخش اصلی (سبد خالی) */}
                            <div className="lg:col-span-9 flex flex-col items-center justify-center space-y-6 py-16 text-center">
                                <Image
                                    src="/empty-cart.svg"
                                    alt="سبد خرید خالی"
                                    width={200}
                                    height={200}
                                    className="opacity-90"
                                />

                                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                                    سبد خرید شما خالی است!
                                </h2>

                                <p className="text-sm text-gray-500 max-w-sm">
                                    برای شروع خرید، به صفحه‌ی فروشگاه بروید و محصولات دلخواه خود را اضافه کنید.
                                </p>

                                <a
                                    href="/"
                                    className="bg-[#2891E8] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#d6334f] transition-colors"
                                >
                                    رفتن به فروشگاه
                                </a>
                            </div>

                            <div className="lg:col-span-3 flex justify-center lg:justify-start">
                                <CharityBadge />
                            </div>
                        </div>


                    )}
                </main>
                
                <BottomNavigation/>
                
            </div>
        </div>
    );
}
