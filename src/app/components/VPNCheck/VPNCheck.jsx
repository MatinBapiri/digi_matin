"use client";

import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // اضافه کردن استایل‌های Toastify

export default function VPNCheck() {
  useEffect(() => {
    // بررسی می‌کنیم که آیا کاربر برای اولین بار به سایت آمده یا نه (در طول همان جلسه)
    const isFirstVisit = sessionStorage.getItem("firstVisit");

    if (!isFirstVisit) {
      // اگر برای اولین بار است که کاربر آمده، پیام Toast نمایش داده می‌شود
      toast.warn("اگر آپی شما ایران است VPN خود را روش کنید");

      // ذخیره کردن وضعیت بازدید در sessionStorage
      sessionStorage.setItem("firstVisit", "false");
    }
  }, []);

  return (
    <div>
      <ToastContainer 
        position="top-center"
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
