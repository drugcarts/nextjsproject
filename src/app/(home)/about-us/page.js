export const dynamic = "force-static";

import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import ClientAboutExtras from "@/components/about/ClientAboutExtras";

import { getMetatags } from "@/services/metatags/getMetatags"; // e.g., use 'about-us' as slug

export async function generateMetadata() {
  const slug = "about-us"; // or whatever slug matches your API

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

      metadataBase: new URL("https://drugcarts.com/about-us"),
      alternates: {
        canonical: "https://drugcarts.com/about-us",
        languages: {
          en: "https://drugcarts.com/about-us",
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/about-us`, // adjust if needed
        images: [
          {
            url:
              post.image ||
              "https://assets3.drugcarts.com/static/image/logodrugnew.jpg",
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
      title: "About Us | DrugCarts",
      description: "Page not found or failed to load metadata.",
      robots: { index: false, follow: false },
    };
  }
}

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto mt-3">
      <div className="flex flex-wrap h-62 justify-center items-center bg-slate-50">
        <div className="text-xl md:text-3xl text-blue-950 font-bold">
          <h1 className="mb-6 my-3">About Us - Mission, Vision, Service</h1>
          <div className="flex justify-center items-center">
            <Image
              priority
              src={IMAGES.DRUGLOGO}
              alt="Drugcarts Logo"
              className="w-40"
              width={0}
              height={0}
            />
          </div>
        </div>
        <div>
          <Image
            priority
            src={IMAGES.ABOUTUS}
            width={0}
            height={0}
            alt="Drugcarts company mission - digital health platform India"
            className="w-full h-[300px] rounded-lg p-6 mx-auto"
          />
        </div>
      </div>

      <div className="flex flex-wrap h-62 justify-center items-center">
        <div className="w-full md:w-1/2 p-4">
          <article className="bg-white p-6 rounded shadow">
            <h2 className="my-4 font-bold text-2xl">About Us</h2>
            <p>
              DrugCarts is India’s biggest online pharmacy. We provide accurate,
              authoritative, and trustworthy information on medicines to help
              people use them effectively and safely.
              <br />
              <br />
              We help users monitor their health effortlessly and care for their
              loved ones from anywhere in India. Order and send medicines with
              just a few clicks.
              <br />
              <br />
              DrugCarts also provides diagnostic services from certified labs
              and online doctor consultations. A wide range of prescription
              medicines and health products are available across India.
              <br />
              <br />
              We also offer homecare services such as nursing, physiotherapy,
              eldercare, post-surgical care, newborn & mother care, diabetic
              care, and more—conveniently on a single digital platform.
            </p>
          </article>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            priority
            src={IMAGES.ABOUTUSCHECKMEDINE}
            alt="Check medicine online at Drugcarts"
            className="w-[80%] h-[300px] rounded my-6 mx-auto"
            width={0}
            height={0}
          />
        </div>
      </div>

      {/* ✅ Dynamically-loaded client-only features moved into separate client component */}
      <ClientAboutExtras />

      <div className="bg-[#EFEFFF] py-4 my-5 rounded-md">
        <p className="text-center py-6 w-[50%] mx-auto">
          People can buy and send medicines from anywhere in the country with
          just a few clicks.
        </p>
        <div className="flex flex-wrap h-62 justify-center items-center">
          <div className="w-full md:w-1/3 text-[#4C4C95]">
            <Image
              src={IMAGES.VISSION}
              alt="Drugcarts Vision"
              className="w-12 mx-auto"
              width={0}
              height={0}
            />
            <h3 className="text-xl text-center py-4 font-bold">Our Vision</h3>
            <p className="text-md text-center px-6">
              To provide trusted health information and access to essential
              medicines across India.
            </p>
          </div>
          <div className="w-full md:w-1/3 text-[#4C4C95]">
            <Image
              src={IMAGES.RESOLUTION}
              alt="Resolution"
              className="w-12 mx-auto"
              width={0}
              height={0}
            />
            <h3 className="text-xl text-center py-4 font-bold">Resolution</h3>
            <p className="text-md text-center px-6">
              Empower people to manage their health effortlessly, wherever they
              are.
            </p>
          </div>
          <div className="w-full md:w-1/3 text-[#4C4C95]">
            <Image
              src={IMAGES.MISSION}
              alt="Our Mission"
              className="w-12 mx-auto"
              width={0}
              height={0}
            />
            <h3 className="text-xl text-center py-4 font-bold">Our Mission</h3>
            <p className="text-md text-center px-6">
              Integrate healthcare services into a seamless digital experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
