"use client";

import React from 'react'
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";

import {
    Play,
    ChevronLeft,
    User,
    ShoppingCart,
    Search,
    Bell,
    Home,
    LayoutGrid,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
    getUserCart,
} from "@/lib/cartService";
export default function BottomNavigation() {
    const pathname = usePathname();
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const navItems = [
        { href: '/', icon: Home, label: 'خانه' },
        { href: '/categories', icon: LayoutGrid, label: 'دسته‌بندی' },
        { href: '/checkout/cart', icon: ShoppingCart, label: 'سبد خرید', showBadge: true },
        { href: '/magnet', icon: Play, label: 'مگنت' },
        { href: '/profile', icon: User, label: 'دیجی‌متین من' },
    ];
    const isActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };
    useEffect(() => {
        if (user) {
            getUserCart(user.uid).then((items) => {
                setCartItems(items);
            });
        }
    }, [user]);
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300  shadow-md flex justify-around items-center py-2 z-50">
            {navItems.map(({ href, icon: Icon, label, showBadge }) => {
                const active = isActive(href);

                return (
                    <Link key={href} href={href}>
                        <div className={`flex flex-col items-center relative transition-colors ${active ? 'text-[#0c0c0c]' : 'text-[#a1a3a8]'
                            }`}>
                            <Icon
                                className="h-6 w-6"
                                fill={active ? 'currentColor' : 'none'}
                                strokeWidth={active ? 0 : 2}
                            />

                            {showBadge && cartItems.length != 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                            <span className={`text-xs mt-1 ${active ? 'font-semibold' : ''}`}>
                                {label}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </nav>
    )
}
