// app/product/[url]/page.js
import { notFound } from "next/navigation";
import ProductDetails from "@/components/productinfo/ProductDetails";
import { getProductDetails } from "@/services/metatags/productMeta";
import {
  GetProductsUrlService,
  GetStorageIdService,
  GetPackageIdService,
  GetManufactuerService,
  // GetSideeffectGenericsService,
} from "@/services/home/productsService";

export async function generateMetadata({ params }) {
  const { url } = await params;
  try {
    const post = await getProductDetails(url);
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

      metadataBase: new URL(`https://drugcarts.com/product/${post.url}`),
      alternates: {
        canonical: `https://drugcarts.com/product/${post.url}`,
        languages: {
          en: `https://drugcarts.com/product/${post.url}`,
        },
      },

      openGraph: {
        siteName: "Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        url: `https://drugcarts.com/product/${post.url}`, // adjust if needed
        images: [
          {
            url: `https://assets2.drugcarts.com/${post.product_img}`,
            alt: post.product_name,
          },
        ],
        type: "website",
      },

      twitter: {
        card: "https://assets2.drugcarts.com/static/image/logodrugnew.jpg",
        site: "@Drugcarts",
        title: post.metatitle,
        description: post.metadesc,
        // images: ["https://assets3.drugcarts.com/static/image/logodrugnew.jpg"],
        images: [
          {
            url: `https://assets2.drugcarts.com/${post.product_img}`,
            alt: post.product_name,
          },
        ],
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

export default async function ProductPage({ params }) {
  const { url } = await params;
  const page = 1;
  const showNo = 10;
  const search = "";

  const productData = await getProductDetails(url);
  // const subCateUrlData = await GetSubCategoryUrlService(
  //   productData?.subcat_name
  // );
  const storageidData = await GetStorageIdService(productData?.storage);
  const packidData = await GetPackageIdService(productData?.package);
  const manufactuerurlData = await GetManufactuerService(
    productData?.manufactuer
  );
  // const sideeffectGenericData = await GetSideeffectGenericsService(
  //   productData?.generices
  // );
  const genericProduct = await GetProductsUrlService(
    page,
    showNo,
    search,
    productData?.generices
  );
  // const cartItem = await getCartService();

  // if (!productData) {
  //   notFound(); // triggers the 404 page
  // }

  const altgenericData = genericProduct?.products?.filter(
    (item) => item?.url !== url
  );

  if (!productData || !productData.url || productData.url.length === 0) {
    return notFound(); // ✅ More reliable check
  }

  return (
    <>
      <ProductDetails
        product={productData}
        alterBrands={altgenericData}
        storageid={storageidData}
        packid={packidData}
        manufactuerurl={manufactuerurlData}
        // sideeffectGeneric={sideeffectGenericData}
      />
      {/*<main className="p-6">
      <h1 className="text-2xl font-bold">{product?.product_name}</h1>
      <p className="mt-2 text-gray-600">{product?.description}</p>

      <div className="mt-4">
        <img
          src={`https://assets2.drugcarts.com/${product?.product_img}`}
          alt={product?.product_name}
          width={400}
          height={300}
        />
      </div>

      <p className="mt-4 text-lg font-semibold text-red-600">
        ₹{product?.price}
      </p> */}
      {/* </main> */}
    </>
  );
}
