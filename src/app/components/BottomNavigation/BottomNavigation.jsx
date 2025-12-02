"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import {
    Play,
    User,
    ShoppingCart,
    Home,
    LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserCart } from "@/lib/cartService";

export default function BottomNavigation() {
    const pathname = usePathname();
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();

    const navItems = [
        { href: "/", icon: Home, label: "خانه" },
        { href: "/categories", icon: LayoutGrid, label: "دسته‌بندی" },
        { href: "/checkout/cart", icon: ShoppingCart, label: "سبد خرید", showBadge: true },
        { href: "/profile", icon: User, label: "دیجی‌متین من" },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    useEffect(() => {
        if (user) {
            getUserCart(user.uid).then((items) => setCartItems(items));
        }
    }, [user]);

    return (
        <nav
            className="
                md:hidden fixed bottom-4 left-1/2 -translate-x-1/2
                w-[92%] max-w-[480px]
                rounded-full
                bg-white/10 backdrop-blur-xl
                border border-white/20
                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                flex justify-around items-center 
                z-50
            "
        >
            {navItems.map(({ href, icon: Icon, label, showBadge }) => {
                const active = isActive(href);

                return (
                    <Link key={href} href={href}>
                        <div
                            className={`
                                flex flex-col items-center relative transition
                                ${active ? "text-blue-400" : "text-black"}
                            `}
                        >
                            <div
                                className={`
                                    w-12 h-12 flex items-center justify-center rounded-full
                                    ${active
                                        ? "bg-blue-500/20 backdrop-blur-2xl shadow-lg border-2 border-blue-300"
                                        : "bg-white/5 backdrop-blur-sm"
                                    }
                                    transition-all
                                `}
                            >
                                <Icon
                                    className="h-5 w-5"
                                    strokeWidth={active ? 2 : 2}
                                />
                            </div>

                            {showBadge && cartItems.length !== 0 && (
                                <span
                                    className="
                                        absolute -top-2 -right-2
                                        bg-red-500 text-white text-xs
                                        rounded-full w-5 h-5
                                        flex items-center justify-center
                                        backdrop-blur-md
                                        border border-white/20
                                        shadow-lg
                                    "
                                >
                                    {cartItems.length}
                                </span>
                            )}

                            <span className={`text-xs ${active ? "font-semibold" : ""}`}>
                                {label}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}
