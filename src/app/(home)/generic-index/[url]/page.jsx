import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/components/common/images";
import { GetGenericUrlService } from "@/services/home/genericService";
import { GetGenericIndexMeta } from "@/services/metatags/genericIndexMeta";

export async function generateMetadata({ params }) {
  const { url } = await params;
  try {
    const post = await GetGenericIndexMeta(url);
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

      metadataBase: new URL(`https://drugcarts.com/generic-index/${post.url}`),
      alternates: {
        canonical: `https://drugcarts.com/generic-index/${post.url}`,
        languages: {
          en: `https://drugcarts.com/generic-index/${post.url}`,
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/generic-index/${post.url}`, // adjust if needed
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

const GenericIndex = async ({ params }) => {
  const { url } = await params;
  const genericUrl = await GetGenericUrlService(url);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="py-2 text-xl font-bold">
        <h2>List of Generic Product</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 py-4">
        {genericUrl?.map((generic, i) => (
          <Link
            href={`/generic-list/${generic?.url}`}
            key={i}
            className="border-[1.5px] p-4 cursor-pointer"
          >
            <div className="text-center">
              <Image
                width={100}
                height={100}
                src={IMAGES.NO_IMAGE}
                alt="No Image"
                className="mb-3 mx-auto object-cover p-2"
              />
              <span>{generic?.generices}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GenericIndex;
