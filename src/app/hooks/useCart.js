"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuthContext } from "@/app/providers/AuthProvider";

export function useCart() {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 دریافت لحظه‌ای تغییرات سبد خرید
  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ افزودن محصول به سبد
  const addToCart = async (product) => {
    if (!user) return alert("ابتدا وارد حساب شوید!");
    const productRef = doc(db, "users", user.uid, "cart", product.id);

    await setDoc(productRef, {
      ...product,
      quantity: product.quantity || 1,
    });
  };

  // ➖ حذف محصول از سبد
  const removeFromCart = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "cart", id));
  };

  // 🔁 تغییر تعداد محصول
  const updateQuantity = async (id, quantity) => {
    if (!user) return;
    const productRef = doc(db, "users", user.uid, "cart", id);
    await updateDoc(productRef, { quantity });
  };

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
}
