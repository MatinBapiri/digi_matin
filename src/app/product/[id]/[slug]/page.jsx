// src/app/product/[id]/[slug]/page.jsx
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notFound } from "next/navigation";
import { slugify } from "../../../components/utils/slugify";
import ProductDetailClient from "./ProductDetailClient";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header";
export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const { id, slug } = resolvedParams;

  const numericId = id.replace("dkp-", "");
  const decodedSlug = decodeURIComponent(slug);

  const docRef = doc(db, "products", numericId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return notFound();

  const product = { id: numericId, ...docSnap.data() };

  if (
    decodedSlug !== slugify(product.title) &&
    decodedSlug !== product.slug
  ) {
    return notFound();
  }

  return (
    <>
      <Header showSelectCity={false} />
      <div className="md:mt-30"></div>
      <Breadcrumb
        links={[
          { title: "خانه", href: "/" },
          { title: "موبایل", href: "/category/mobile-phone" },
          {
            title: product.title,
            href: `/product/dkp-${product.id}/${product.slug}`,
          },
        ]}
      />
      <ProductDetailClient product={product} />
      <Footer />
    </>
  );
}

