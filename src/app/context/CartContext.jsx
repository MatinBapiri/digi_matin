"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/hooks/useAuth";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user?.uid) {
      setCartItems([]);
      return;
    }

    const cartRef = collection(db, "users", user.uid, "cart");

    const unsub = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    });

    return () => unsub();
  }, [user?.uid]);

  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, totalCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
