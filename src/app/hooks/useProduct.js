import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const snap = await getDoc(doc(db, "products", id));
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    },
    enabled: !!id,
  });
}
