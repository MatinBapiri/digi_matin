
import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
  collection,
  getDocs,
} from "firebase/firestore";
/**
 * افزودن محصول به سبد خرید کاربر
 */

export async function getCategories() {
  const snap = await getDocs(collection(db, "categories"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addToCart(userId, product, selectedColor = null) {
  try {
    if (!userId) throw new Error("شناسه کاربر معتبر نیست");

    const productRef = doc(db, "users", userId, "cart", product.id.toString());
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      await updateDoc(productRef, { quantity: increment(1) });
    } else {
      await setDoc(productRef, {
        id: product.id,
        name: product.title || product.name || "محصول بدون عنوان",
        price: product.seller?.price || product.price || 0,
        image: product.image || product.gallery?.[0] || "",
        quantity: 1,
        color: selectedColor || product.selectedColor || product.colors?.[0] || null,
        createdAt: new Date(),
      });
    }

    console.log("✅ محصول به سبد خرید اضافه شد:", product.title);

  } catch (error) {
    console.error("❌ خطا در افزودن به سبد خرید:", error.message);
  }
}

/**
 * دریافت سبد خرید کاربر
 */
export async function getUserCart(userId) {
  try {
    const cartRef = collection(db, "users", userId, "cart");
    const snapshot = await getDocs(cartRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ خطا در دریافت سبد خرید:", error);
    return [];
  }
}

/**
 * حذف محصول از سبد خرید
 */
export async function removeFromCart(userId, productId) {
  try {
    await deleteDoc(doc(db, "users", userId, "cart", productId.toString()));
    console.log("🗑️ محصول حذف شد");
  } catch (error) {
    console.error("❌ خطا در حذف از سبد:", error);
  }
}

/**
 * تغییر تعداد محصول
 */
export async function updateCartQuantity(userId, productId, change) {
  try {
    const productRef = doc(db, "users", userId, "cart", productId.toString());
    await updateDoc(productRef, { quantity: increment(change) });
  } catch (error) {
    console.error("❌ خطا در تغییر تعداد محصول:", error);
  }
}
