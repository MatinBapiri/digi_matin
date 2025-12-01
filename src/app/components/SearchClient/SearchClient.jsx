"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import SortBar from "../SortBar/SortBar";
import ProductCard from "../ProductCard/ProductCard";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";
const CATEGORY_LABELS = {
    "mobile-phone": "موبایل",
    laptop: "لپ‌تاپ",
};

const BRAND_LABELS = {
    Apple: "اپل",
    Samsung: "سامسونگ",
    Xiaomi: "شیائومی",
    Google: "گوگل",
    OnePlus: "وان‌پلاس",
    Huawei: "هواوی",
    Nokia: "نوکیا",
    Sony: "سونی",
    Motorola: "موتورولا",
    Realme: "ریلمی",
    Asus: "ایسوس",
    HP: "اچ‌پی",
    Dell: "دل",
    Lenovo: "لنوو",
    MSI: "ام‌اس‌آی",
    Acer: "ایسر",
    Microsoft: "مایکروسافت",
    Razer: "ریزر",
};

async function fetchAllProducts() {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export default function SearchClient({ initialQuery = "", initialCategory = "" }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // state ها
    const [q, setQ] = useState(initialQuery);
    const [categoryLock, setCategoryLock] = useState(initialCategory);
    const [brandFilter, setBrandFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [fastShipping, setFastShipping] = useState(false);
    const [sellerShipping, setSellerShipping] = useState(false);
    const [inStock, setInStock] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: fetchAllProducts,
        staleTime: 1000 * 60 * 5,
    });

    // وقتی URL عوض شد → state sync
    useEffect(() => {
        const qParam = searchParams.get("q") || "";
        const brandParam = searchParams.get("brand")?.split(",") || [];
        const colorParam = searchParams.get("color")?.split(",") || [];
        const fastParam = searchParams.get("fast") === "true";
        const sellerParam = searchParams.get("seller") === "true";
        const stockParam = searchParams.get("stock") === "true";

        setQ(qParam);
        setBrandFilter(brandParam);
        setColorFilter(colorParam);
        setFastShipping(fastParam);
        setSellerShipping(sellerParam);
        setInStock(stockParam);
    }, [searchParams]);

    // وقتی state عوض شد → URL sync
    useEffect(() => {
        // اگر هنوز دسته‌بندی تعیین نشده از URL، هیچ کاری نکن
        if (pathname.startsWith("/search/category-") && !categoryLock) return;

        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (brandFilter.length) params.set("brand", brandFilter.join(","));
        if (colorFilter.length) params.set("color", colorFilter.join(","));
        if (fastShipping) params.set("fast", "true");
        if (sellerShipping) params.set("seller", "true");
        if (inStock) params.set("stock", "true");

        const newPath = categoryLock ? `/search/category-${categoryLock}` : `/search`;
        const newUrl = `${newPath}${params.toString() ? `?${params.toString()}` : ""}`;
        const currentUrl = `${window.location.pathname}${window.location.search}`;

        // فقط اگر واقعاً فرق کرده، آدرس رو عوض کن
        if (newUrl !== currentUrl) {
            router.replace(newUrl);
        }
    }, [q, categoryLock, brandFilter, colorFilter, fastShipping, sellerShipping, inStock]);



    // اگر مسیر دستی تغییر کرد
    useEffect(() => {
        if (pathname?.startsWith("/search/category-") && !categoryLock) {
            const slug = pathname.split("/search/")[1];
            const cat = slug?.replace("category-", "");
            if (cat) setCategoryLock(cat);
        }
    }, [pathname, categoryLock]);


    const baseFiltered = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((item) => {
            const matchCategory = categoryLock ? item.category === categoryLock : true;
            const matchQ = q
                ? item.title.toLowerCase().includes(q.toLowerCase()) ||
                (item.brand && item.brand.toLowerCase().includes(q.toLowerCase()))
                : true;
            return matchCategory && matchQ;
        });
    }, [data, categoryLock, q]);

    // برندهای قابل انتخاب
    const availableBrands = useMemo(() => {
        const set = new Set(baseFiltered.map((p) => p.brand).filter(Boolean));
        return Array.from(set);
    }, [baseFiltered]);

    // رنگ‌های قابل انتخاب
    const availableColors = useMemo(() => {
        const set = new Set();
        baseFiltered.forEach((p) => (p.colors || []).forEach((c) => set.add(c)));
        return Array.from(set);
    }, [baseFiltered]);

    // اعمال کامل فیلترها
    const fullyFiltered = useMemo(() => {
        return baseFiltered.filter((p) => {
            const brandOk = brandFilter.length ? brandFilter.includes(p.brand) : true;
            const colorOk = colorFilter.length
                ? (p.colors || []).some((c) => colorFilter.includes(c))
                : true;
            const fastOk = fastShipping ? Boolean(p.fastShipping) : true;
            const sellerOk = sellerShipping ? Boolean(p.sellerShipping) : true;
            const stockOk = inStock ? p.inStock === true : true;
            return brandOk && colorOk && fastOk && sellerOk && stockOk;
        });
    }, [baseFiltered, brandFilter, colorFilter, fastShipping, sellerShipping, inStock]);

    // helpers
    const toggleArrayFilter = (value, listSetter, list) => {
        if (list.includes(value)) listSetter(list.filter((v) => v !== value));
        else listSetter([...list, value]);
    };

    const goCategory = (cat) => {
        setQ("");
        setCategoryLock(cat);
        setBrandFilter([]);
        setColorFilter([]);
        setFastShipping(false);
        setSellerShipping(false);
        setInStock(false);
    };

    const clearCategory = () => setCategoryLock("");
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    return (
        <div className="flex flex-col md:flex-row ">
            {/* Sidebar */}

            <aside className="w-64 bg-white border border-gray-200 rounded-lg shadow-sm p-4 sticky top-4 self-start">
                <div className="flex justify-between">
                    <h2 className="font-bold text-gray-800 mb-4">فیلترها</h2>
                    <button
                        onClick={() => {
                            setBrandFilter([]);
                            setColorFilter([]);
                            setFastShipping(false);
                            setSellerShipping(false);
                            setInStock(false);
                        }}
                        className="text-xs text-[#19bfd3] hover:cursor-pointer mb-3"
                    >
                        حذف فیلترها
                    </button>
                </div>

                {/* دسته‌بندی */}
                {/* برند */}
                <details className="mb-3 border-b border-gray-200 open:border-none">
                    <summary className="flex justify-between items-center cursor-pointer py-3 text-gray-700 ">
                        برند <ChevronDown className="w-4 h-4" />
                    </summary>
                    <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600 max-h-40 overflow-auto border-b pb-3 border-gray-200">
                        {availableBrands.length === 0 && (
                            <div className="text-xs text-gray-400">برندی موجود نیست</div>
                        )}
                        {availableBrands.map((b) => (
                            <label key={b} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={brandFilter.includes(b)}
                                    onChange={() =>
                                        toggleArrayFilter(b, setBrandFilter, brandFilter)
                                    }
                                />
                                <span>{BRAND_LABELS[b] || b}</span>
                            </label>
                        ))}
                    </div>
                </details>

                {/* رنگ */}
                <details className="mb-3 border-b border-gray-200 open:border-none">
                    <summary className="flex justify-between items-center cursor-pointer py-3 text-gray-700">
                        رنگ <ChevronDown className="w-4 h-4" />
                    </summary>

                    <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600 max-h-40 overflow-auto border-b border-gray-200 pb-3">
                        {availableColors.map((c) => (
                            <label key={c} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={colorFilter.includes(c)}
                                    onChange={() => toggleArrayFilter(c, setColorFilter, colorFilter)}
                                />
                                {c}
                            </label>
                        ))}
                    </div>
                </details>


                {/* ارسال سریع */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    {/* بخش تصویر + متن */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm">ارسال سریع</span>
                        <img src="/fastsend.png" alt="ارسال سریع" className="w-5 h-5" />
                    </div>

                    {/* سوئیچ */}
                    <ToggleSwitch
                        checked={fastShipping}
                        onChange={() => setFastShipping(v => !v)}
                    />

                </div>

                {/* ارسال فروشنده */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm">ارسال فروشنده</span>
                        <img src="/seller.svg" alt="فروشنده" className="w-5 h-5" />
                    </div>
                    <ToggleSwitch
                        checked={sellerShipping}
                        onChange={() => setSellerShipping(v => !v)}
                    />

                </div>

                {/* فقط موجودها */}
                <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700 text-sm">فقط کالاهای موجود</span>
                    <ToggleSwitch
                        checked={inStock}
                        onChange={() => setInStock(v => !v)}
                    />
                </div>

                <details className="mb-3">
                    <summary className="flex justify-between items-center cursor-pointer py-3 text-gray-700  border-gray-200">
                        محدوده قیمت <ChevronDown className="w-4 h-4" />
                    </summary>
                    <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600 max-h-40 overflow-auto">
                        <div>
                            <PriceRangeSlider
                                min={100000}
                                max={10000000}
                                step={1000}
                                value={priceRange}
                                onChange={setPriceRange}
                            />
                        </div>
                    </div>
                </details>
            </aside>
            {/* Products list */}
            <div className="flex-1 p-6">
                <SortBar />
                {!isLoading && !isError && fullyFiltered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {fullyFiltered.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-14">
                        محصولی یافت نشد.
                    </div>
                )}
            </div>
        </div>
    );
}
