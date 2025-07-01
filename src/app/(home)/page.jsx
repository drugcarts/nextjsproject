import TopCategoryClient from "@/components/home/TopCategoryClient"; // Client component
import { getCategoryData } from "@/services/home/categoryService";
import { getMainSliderData } from "@/services/home/mainSliderService";
import { GetProductTypeService } from "@/services/home/productService";
import { GetSendFeedbackService } from "@/services/home/feedbackService";
import { getBlogData } from "@/services/home/blogService";
import SliderClient from "@/components/home/SliderClient";
import TrandingProduct from "@/components/home/trandingProduct";
import BannerGroup from "@/components/home/BannerGroup";
import ServiceGroup from "@/components/home/ServiceGroup";
import FeaturedPackage from "@/components/home/FeaturedPackage";
import HealthHacks from "@/components/home/HealthHacks";
import ShopbyCategory from "@/components/home/ShopbyCategory";
import FameSection from "@/components/home/FameSection";
import BlogClient from "@/components/home/BlogClient";
import CustomerSaying from "@/components/home/CustomerSaying";
import FeedbackCard from "@/components/home/FeedbackCard";

import { getMetatags } from "@/services/metatags/getMetatags"; // e.g., use 'about-us' as slug
export const revalidate = 60; // ISR every 60 sec

export async function generateMetadata() {
  const slug = "home"; // or whatever slug matches your API

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

      metadataBase: new URL("https://drugcarts.com"),
      alternates: {
        canonical: "https://drugcarts.com",
        languages: {
          en: "https://drugcarts.com",
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com`, // adjust if needed
        images: [
          {
            url:
              post.image ||
              "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
            width: 1200,
            height: 630,
            alt: post.metatitle || "DrugCarts Home Page",
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
      title: "Home Page | DrugCarts",
      description: "Page not found or failed to load metadata.",
      robots: { index: false, follow: false },
    };
  }
}

export default async function Home() {
  const page = 1;
  const showNo = 8;
  const search = "";

  const data = await getCategoryData(search, page, showNo); // Call API from your service
  const blogData = await getBlogData(1, 3); // Call API from your service
  const mainSliderUrl = await getMainSliderData("medicine");

  const feedbackData = await GetSendFeedbackService(page, 4, search);

  const type = "Popular";
  const productData = await GetProductTypeService(page, showNo, type, search);

  console.log(feedbackData?.send_feedbacks, "FFEDD");

  return (
    <main className="max-w-7xl mx-auto p-2">
      <SliderClient slides={mainSliderUrl} />
      <section className="mt-4">
        <div className="p-2 bg-gray-100 font-bold mb-4">
          <h1>Shop of Categories</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <TopCategoryClient categories={data?.categories || []} />
        </div>
      </section>
      {/* <TrandingProduct /> */}
      {/* <TrandingProductClient initialData={productData} initialTab={type} /> */}
      <BannerGroup />
      <ServiceGroup />
      <FeaturedPackage />
      <HealthHacks />
      <ShopbyCategory />
      {/* <FameSection /> */}
      <section className="px-10 mt-10">
        <div className="bg-bgblog rounded-md px-5 md:px-10">
          <h1 className="font-bold text-xl md:text-2xl p-5">Our Latest Blog</h1>
          <BlogClient blogList={blogData || []} />
          {/* <BlogCard blogData={blogList?.blogs} /> */}
        </div>
      </section>
      <FeedbackCard feedbackList={feedbackData?.send_feedbacks} />
      <CustomerSaying />
    </main>
  );
}
