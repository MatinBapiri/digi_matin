"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutModalMobile({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40  z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl p-5 pb-6 z-[999]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b">
              <button onClick={onClose}>
                <X size={26} className="text-gray-600" />
              </button>

              <h2 className="text-lg font-semibold text-gray-800">
                از حساب کاربری خارج می‌شوید؟
              </h2>

              <div className="w-6" /> {/* dummy for balance */}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-6 mt-4 text-right">
              با خروج از حساب کاربری، به سبد خرید فعالی‌تان دسترسی نخواهید داشت.
              هر وقت بخواهید می‌توانید مجدداً وارد شوید و خریدتان را ادامه دهید.
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3 mt-6">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-medium"
              >
                انصراف
              </button>

              <button
                onClick={onConfirm}
                className="w-full py-3 rounded-xl bg-[#ef4056] text-white font-medium"
              >
                خروج از حساب
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
