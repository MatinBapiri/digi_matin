"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* پس‌زمینه تار */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* بدنه مودال پایین صفحه */}
          <div className="fixed inset-0 flex items-end justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-t-2xl shadow-xl w-full max-w-md p-6 relative"
              initial={{ y: 300 }}      // ← از پایین شروع
              animate={{ y: 0 }}        // ← میاد بالا
              exit={{ y: 300 }}         // ← دوباره پایین میره
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* دکمه بستن */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* عنوان */}
              {title && (
                <h2 className="text-lg font-bold text-gray-800 mb-4 pr-6">
                  {title}
                </h2>
              )}

              {/* محتوای داخلی */}
              <div>{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
