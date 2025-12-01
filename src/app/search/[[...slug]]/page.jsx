import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import Footer from "@/app/components/Footer/Footer";
import SearchPageClient from "../SearchPageClient";
import Header from "../../components/Header";

const CATEGORY_LABELS = {
  "mobile-phone": "موبایل",
  laptop: "لپ‌تاپ",
};

export default async function SearchPage({ searchParams, params }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q || "";
  const slug = resolvedParams?.slug || [];
  let categoryFromPath = "";

  if (slug[0]?.startsWith("category-")) {
    categoryFromPath = slug[0].replace("category-", "");
  }



  const links = [
    { id: 1, title: "فروشگاه اینترنتی دیجی‌متین", to: "/" },
    { id: 2, title: "کالای دیجیتال", to: "/" },
  ];

  if (categoryFromPath) {
    links.push({
      id: 3,
      title: CATEGORY_LABELS[categoryFromPath] || categoryFromPath,
      to: `/search/category-${categoryFromPath}`,
    });
  }

  return (
    <>

      <Header showSelectCity={false} />
      <div className="md:mt-30"></div>
      <Breadcrumb links={links} />
      {slug[0] === "category-mobile-phone" ? (
        <div className="items-center py-3 mx-7 font-black">گوشی موبایل</div>
      ) : slug[0] === "category-laptop" ? (
        <div className="items-center py-3 mx-7 font-black">لپ‌تاپ</div>
      ) : (
        <div className="items-center py-3 mx-7 font-black">همه محصولات</div>
      )}

      <SearchPageClient q={q} categoryFromPath={categoryFromPath} />
      <Footer />
    </>
  );
}
