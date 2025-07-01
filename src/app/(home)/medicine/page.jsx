import {
  getCategoryData,
  getMedicineBannerData,
} from "@/services/home/categoryService";
import MedicineClient from "./MedicineClient";

import { getMetatags } from "@/services/metatags/getMetatags"; // e.g., use 'about-us' as slug

export async function generateMetadata() {
  const slug = "medicine"; // or whatever slug matches your API

  try {
    const post = await getMetatags(slug);
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

      metadataBase: new URL("https://drugcarts.com/medicine"),
      alternates: {
        canonical: "https://drugcarts.com/medicine",
        languages: {
          en: "https://drugcarts.com/medicine",
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/medicine`, // adjust if needed
        images: [
          {
            url:
              post.image ||
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
  } catch (error) {
    return {
      title:
        "Drugcarts - Find best medicines and healthcare products online|Drugcarts.com",
      description: "Page not found or failed to load metadata.",
      robots: { index: false, follow: false },
    };
  }
}

const Medicine = async () => {
  const page = 1;
  const limit = 12;
  const selectedLetter = "";
  const medicineBanner = await getMedicineBannerData("medicine");
  const data = await getCategoryData(selectedLetter, page);

  return (
    <>
      <MedicineClient
        pageBannerUrl={medicineBanner}
        categoryData={data?.categories}
        pageNo={page}
        limitNo={limit}
        pagination={data?.pagination}
        firstLetter={selectedLetter}
      />
    </>
  );
};

export default Medicine;
