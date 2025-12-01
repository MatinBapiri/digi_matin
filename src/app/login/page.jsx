"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";
import useIsMobile from "@/app/hooks/useIsMobile";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export default function LoginCard() {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const inputRef = useRef(null);

  // همیشه قبل از return
  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  // جلوگیری از رندر قبل از تعیین موبایل/دسکتاپ
  // ذخیره کاربر
  async function saveUserProfile(user) {
    if (!user?.uid) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          phone: user.phoneNumber || null,
          email: user.email || null,
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );
      console.log("User profile saved");
    } catch (error) {
      console.error(error);
    }
  }

  // وقتی کاربر لاگین شد
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) saveUserProfile(user);
    });
    return () => unsubscribe();
  }, []);


  // 📱 ارسال کد تأیید
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value.trim()) {
      setError("لطفا این قسمت را خالی نگذارید");
      return;
    }

    if (!/^(\+98|0)?9\d{9}$/.test(value)) {
      setError("شماره موبایل معتبر نیست");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => console.log("reCAPTCHA solved ✅"),
          }
        );
      }
      const normalizePhone = (input) => {
        let phone = input.replace(/\s|-/g, ""); // remove spaces/dashes
        if (phone.startsWith("0")) phone = phone.substring(1);
        if (!phone.startsWith("+98")) phone = "+98" + phone;
        return phone;
      };

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = value.startsWith("+98")
        ? value
        : `+98${value.replace(/^0/, "")}`;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("ارسال کد با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  // 🔢 تأیید کد
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("کد تأیید را وارد کنید");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await window.confirmationResult.confirm(otp);
      alert("ورود با موفقیت انجام شد 🎉");
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("کد اشتباه است ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <div
          dir="rtl"
          className="flex items-center justify-center  min-h-screen   bg-white sm:bg-gray-50 px-4"
        >
          <div className="w-full ">
            {/* دکمه برگشت */}
            <Link
              href="/"
              className="absolute right-4 top-4 text-gray-600"
            >
              <ArrowRight className="w-6 h-6" />
            </Link>
            {/* لوگو */}
            <div className="flex justify-center mb-10 mt-5">
              <img
                src="/digikala22.png"
                alt="لوگو"
                className="h-10"
              />
            </div>

            {/* تیتر اصلی */}
            <h1 className="text-lg font-bold text-gray-800  mb-2">
              ورود یا ثبت‌نام در دیجی‌متین
            </h1>

            {/* زیرتیتر */}
            <p className="text-xs  text-gray-500 mb-7">
              لطفا شماره موبایل یا ایمیل خود را وارد کنید
            </p>

            {/* فرم */}
            <form onSubmit={step === 1 ? handleSubmit : handleVerify}>

              {/* ورودی */}
              {step === 1 ? (
                <input
                  dir="rtl"
                  ref={inputRef}
                  type="tel"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="شماره موبایل یا پست الکترونیک"
                  className={`
            w-full px-4 py-3 rounded-lg border text-xs
            outline-none transition
            ${error
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                    }
          `}
                />
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="کد تأیید"
                  className={`
            w-full px-4 py-3 rounded-lg border text-center tracking-widest text-base focus:border-black
            outline-none transition
            ${error
                      ? "border-[#2891E8] focus:border-[#2891E8]"
                      : "border-[#2891E8] focus:border-[#2891E8]"
                    }
          `}
                />
              )}

              {error && (
                <p className="text-xs text-[#2891E8] mt-1">{error}</p>
              )}

              {/* دکمه */}
              <button
                type="submit"
                disabled={loading}
                className={`
          w-full mt-6 py-3 rounded-lg text-white text-base font-bold
          transition
          ${loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#2891E8] hover:cursor-pointer"
                  }
        `}
              >
                {loading
                  ? "در حال ارسال..."
                  : step === 1
                    ? "ورود به دیجی‌متین"
                    : "تأیید و ادامه"}
              </button>
            </form>

            {/* قوانین */}
            <p className="text-xs text-gray-500 text-center mt-6 leading-6 px-4">
              ورود شما به معنای پذیرش{" "}
              <Link href="/terms" className="text-blue-500 underline">
                شرایط دیجی‌متین
              </Link>{" "}
              و{" "}
              <Link href="/privacy" className="text-blue-500 underline">
                قوانین حریم خصوصی
              </Link>{" "}
              است
            </p>

            <div id="recaptcha-container"></div>

            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="text-center w-full mt-4 text-blue-500 underline text-sm"
              >
                تغییر شماره موبایل
              </button>
            )}
          </div>
        </div>

      )
        : (
          <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="relative w-full max-w-[400px] bg-white rounded-xl p-8 border border-gray-200">
              <Link href="/" className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                <ArrowRight className="w-6 h-6" />
              </Link>

              <div className="flex justify-center mb-6">
                <img src="/digikala22.png" alt="دیجی‌متین" className="h-[50px]" />
              </div>

              <h2 className="text-lg font-bold mt-4">ورود | ثبت‌نام</h2>
              <p className="text-sm text-gray-500 mt-4">سلام!</p>
              <p className="text-sm text-gray-500 mb-4">
                {step === 1
                  ? "لطفا شماره موبایل خود را وارد کنید"
                  : "کد ارسال‌شده به شماره شما را وارد کنید"}
              </p>

              <form onSubmit={step === 1 ? handleSubmit : handleVerify}>
                {step === 1 ? (
                  <input
                  dir="rtl"
                    ref={inputRef}
                    type="tel"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="شماره موبایل یا پست الکترونیک"
                    className={`w-full px-4 py-2 text-xs border rounded-md focus:border-black focus:outline-none ${error
                      ? "border-[#2891E8] focus:ring-[#2891E8]"
                      : "border-gray-300 focus:ring-[#2891E8]"
                      }`}
                  />
                ) : (
                  <input
                    ref={inputRef}
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="کد تأیید"
                    className={`w-full px-4 py-2 border rounded-md text-center tracking-widest focus:border-red-500 focus:outline-none ${error
                      ? "border-red-400 focus:ring-[#2891E8]"
                      : "border-gray-300 focus:ring-[#2891E8]"
                      }`}
                  />
                )}

                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-6 py-2 rounded-md transition ${loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#2891E8] text-white hover:cursor-pointer"
                    }`}
                >
                  {loading
                    ? "در حال ارسال..."
                    : step === 1
                      ? "ورود به دیجی‌متین"
                      : "تأیید و ورود"}
                </button>
              </form>

              <p className="text-[11px] text-gray-500 mt-4">
                ورود شما به معنای پذیرش{" "}
                <Link href="/terms" className="text-[#008eb2] underline">
                  شرایط دیجی‌متین
                </Link>{" "}
                و{" "}
                <Link href="/privacy" className="text-[#008eb2] underline">
                  قوانین حریم‌خصوصی
                </Link>{" "}
                است
              </p>

              <div id="recaptcha-container"></div>

              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-blue-500 underline mt-3"
                >
                  تغییر شماره موبایل
                </button>
              )}
            </div>
          </div>)}
    </>
  );
}
