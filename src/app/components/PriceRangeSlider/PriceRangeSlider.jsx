"use client";
import { useState } from "react";

export default function PriceRangeSlider({
    min = 0,
    max = 10000000,
    step = 1000,
    value,
    onChange,
}) {
    const [minValue, setMinValue] = useState(value ? value[0] : min);
    const [maxValue, setMaxValue] = useState(value ? value[1] : max);

    // تغییر دسته حداقل (ارزان‌ترین)
    const handleMinChange = (e) => {
        let val = Number(e.target.value);
        if (val >= maxValue - step) val = maxValue - step;
        setMinValue(val);
        if (onChange) onChange([val, maxValue]);
    };

    // تغییر دسته حداکثر (گران‌ترین)
    const handleMaxChange = (e) => {
        let val = Number(e.target.value);
        if (val <= minValue + step) val = minValue + step;
        setMaxValue(val);
        if (onChange) onChange([minValue, val]);
    };

    // درصدها برای نمایش روی ریل
    const minPercent = ((minValue - min) / (max - min)) * 100;
    const maxPercent = ((maxValue - min) / (max - min)) * 100;

    return (
        <div className="p-4 bg-white w-full max-w-sm mx-auto" dir="rtl">
            {/* عنوان */}

            {/* نمایش قیمت‌ها */}
            <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
                {/* ارزان‌ترین */}
                <div className="flex flex-col items-center">
                    <span className="font-bold text-lg text-gray-900">
                        {minValue.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-xs text-gray-500">ارزان‌ترین</span>
                </div>
                {/* گران‌ترین */}
                <div className="flex flex-col items-center">
                    <span className="font-bold text-lg text-gray-900">
                        {maxValue.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-xs text-gray-500">گران‌ترین</span>
                </div>
            </div>

            {/* اسلایدر */}
            <div className="relative h-2">
                {/* ریل اصلی */}
                <div className="absolute w-full h-2 bg-gray-200 rounded"></div>

                {/* محدوده انتخاب‌شده */}
                <div
                    className="absolute h-2 bg-[#00bcd4] rounded"
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                    }}
                ></div>

                {/* دسته ارزان‌ترین */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={handleMinChange}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
                />
                {/* دسته گران‌ترین */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
                />

                {/* استایل دسته‌ها */}
                <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #00bcd4;
            border: 2px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: all;
            position: relative;
            z-index: 2;
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #00bcd4;
            border: 2px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: all;
            position: relative;
            z-index: 2;
          }
        `}</style>
            </div>

            {/* زیرنویس */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>گران‌ترین</span>
                <span>ارزان‌ترین</span>
            </div>
        </div>
    );
}
