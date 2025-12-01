"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, onClose, children }) {
  // قفل کردن اسکرول وقتی مودال بازه
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* بک‌دراپ */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* محتوای مودال */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
