import ClientCategoryPanel from "./ClientCategoryPanel";
import { GetSubCateProductsService } from "@/services/home/productsService";
import { GetSubCategoryMeta } from "@/services/metatags/SubcategoryMeta";

export async function generateMetadata({ params }) {
  const { url } = await params;
  try {
    const post = await GetSubCategoryMeta(url);
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

      metadataBase: new URL(`https://drugcarts.com/category/${post.url}`),
      alternates: {
        canonical: `https://drugcarts.com/category/${post.url}`,
        languages: {
          en: `https://drugcarts.com/category/${post.url}`,
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/category/${post.url}`, // adjust if needed
        images: "https://assets1.drugcarts.com/static/image/logodrugnew.jpg",
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
const CategoryProduct = async ({ params }) => {
  const { url } = await params;
  const page = 1;
  const showNo = 20;
  const search = "";
  const productCategory = await GetSubCateProductsService(
    page,
    showNo,
    url,
    search
  );

  return <ClientCategoryPanel productData={productCategory?.products} />;
};

export default CategoryProduct;
