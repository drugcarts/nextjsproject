// 🔹 Dynamic metadata
// import { GetCatelogMeta } from "@/services/metatags/catelogMeta";
import { GetSubCategoryUrlService } from "@/services/home/subCategoryService";

export async function generateMetadata(params) {
  const { url } = await params;
  const subCategoryData = await GetSubCategoryUrlService(url);
  const post = subCategoryData[0];
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

    metadataBase: new URL(`https://drugcarts.com/catalog/${post.cat_name}`),
    alternates: {
      canonical: `https://drugcarts.com/catalog/${post.cat_name}`,
      languages: {
        en: `https://drugcarts.com/catalog/${post.cat_name}`,
      },
    },

    openGraph: {
      siteName: "Drugcarts",
      title: post.metatitle,
      description: post.metadesc,
      url: `https://drugcarts.com/catalog/${post.cat_name}`, // adjust if needed
      images: [
        {
          url:
            post.cat_img ||
            "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
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
}

// import { generateMetadata as getMetatags } from "./metadata";

// export async function generateMetadata({ params }) {
//   const { url } = await params;
//   return getMetatags(url);
// }
