import ClientCancellation from "./ClientCancellation";
import { GetCommonMeta } from "@/services/metatags/commonMeta";

export async function generateMetadata() {
  const url = "cancellation-return-refund-policy";
  try {
    const post = await GetCommonMeta(url);
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

      metadataBase: new URL(`https://drugcarts.com/${post.url}`),
      alternates: {
        canonical: `https://drugcarts.com/${post.url}`,
        languages: {
          en: `https://drugcarts.com/${post.url}`,
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/${post.url}`, // adjust if needed
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
const Cancellation = async () => {
  return (
    <>
      <ClientCancellation />
    </>
  );
};

export default Cancellation;
