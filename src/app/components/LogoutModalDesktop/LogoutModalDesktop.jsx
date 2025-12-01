"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutModalDesktop({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay + Centering */}
          <motion.div
            className="fixed inset-0 z-[998] flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Center Modal */}
            <motion.div
              className="bg-white rounded-2xl p-6  shadow-xl z-[999]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن روی کلیک داخل مودال
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800 text-right">
                  خروج از حساب کاربری؟
                </h2>

                <button onClick={onClose}>
                  <X size={26} className="text-gray-600" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-6 mt-4 text-right">
                با خروج از حساب، دیگر به سبد خرید فعلی دسترسی نخواهید داشت.
                می‌توانید هر زمان که خواستید دوباره وارد شوید.
              </p>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700"
                >
                  انصراف
                </button>

                <button
                  onClick={onConfirm}
                  className="px-5 py-2 rounded-xl bg-[#ef4056] text-white"
                >
                  خروج
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
