import CategoryCard from "@/components/common/CategoryCard";
import { IMAGES } from "@/components/common/images";
import { GetSubCategoryUrlService } from "@/services/home/subCategoryService";
import ClientWrapper from "./ClientWrapper";
import { GetCatelogMeta } from "@/services/metatags/catelogMeta";

export async function generateMetadata({ params }) {
  const { url } = await params;
  try {
    const post = await GetCatelogMeta(url);
    return {
      title:
        post.metatitle ||
        "Drugcarts - Find best medicines and healthcare products online|Drugcarts.com",
      description:
        post.metadesc ||
        "Learn about DrugCarts – India’s trusted digital health platform for pharmacy, diagnostics, and homecare services.",
      keywords:
        post.metakeyword ||
        "online pharmacy, DrugCarts, health care, diagnostics, homecare",

      metadataBase: new URL(`https://drugcarts.com/catalog/${post.url}`),
      alternates: {
        canonical: `https://drugcarts.com/catalog/${post.url}`,
        languages: {
          en: `https://drugcarts.com/catalog/${post.url}`,
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/catalog/${post.url}`, // adjust if needed
        images: [
          {
            url: post.cat_img
              ? `https://assets2.drugcarts.com/category/thumb/${post?.cat_img}`
              : "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
            width: 1200,
            height: 630,
            alt: post.metatitle || "DrugCarts About Us",
          },
        ],
        type: "website",
      },

      twitter: {
        card: "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
        site: "@Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        images: ["https://assets2.drugcarts.com/static/image/logodrugnew.jpg"],
      },

      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        },
      },
      verification: {
        google: "rWRgYI7x0MJUjaWvpsrL7Kuppa-ePcjcEOO7DF0UU6U",
        yandex: "35e97e71746205ab",
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    return {
      title:
        "Drugcarts - Find best medicines and healthcare products online|Drugcarts.com",
      description:
        "Learn about DrugCarts – India’s trusted digital health platform for pharmacy, diagnostics, and homecare services.",
      robots: { index: false, follow: false },
    };
  }
}

const Catalog = async ({ params }) => {
  const { url } = await params;
  const subCategoryUrl = await GetSubCategoryUrlService(url);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="py-2 text-xl font-bold capitalize">
        <h2>List of Medicine in {subCategoryUrl[0]?.cat_name}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 py-4">
        {subCategoryUrl?.map((sub, i) => (
          <ClientWrapper cat_url={sub?.url} key={i}>
            <CategoryCard
              title={sub?.subcat_name}
              imageAlt={sub?.cat_name}
              imagUrl={
                sub?.cat_img
                  ? `https://assets2.drugcarts.com/category/thumb/${sub?.cat_img}`
                  : IMAGES.NO_IMAGE
              }
            />
          </ClientWrapper>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
