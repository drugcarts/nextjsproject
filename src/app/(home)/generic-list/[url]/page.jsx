import ClientGenericList from "./ClientGenericList";
import { GetProductsUrlService } from "@/services/home/productsService";
import { GetGenericListMeta } from "@/services/metatags/genericListMeta";

export async function generateMetadata({ params }) {
  const { url } = await params;
  try {
    const post = await GetGenericListMeta(url);
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

      metadataBase: new URL(`https://drugcarts.com/generic-list/${post.url}`),
      alternates: {
        canonical: `https://drugcarts.com/generic-list/${post.url}`,
        languages: {
          en: `https://drugcarts.com/generic-list/${post.url}`,
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/generic-list/${post.url}`, // adjust if needed
        images: "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
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

const GenericProductList = async ({ params }) => {
  const { url } = await params;
  const page = 1;
  const showNo = 16;
  const search = "";
  const productData = await GetProductsUrlService(page, showNo, search, url);
  return (
    <>
      <ClientGenericList productList={productData} />
    </>
  );
};

export default GenericProductList;
