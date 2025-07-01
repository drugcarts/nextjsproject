"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import CartIcon from "@/assets/Icons/CartIcon";
import { GetProductTypeService } from "@/services/home/productService";
import { useState } from "react";

export default async function FameSection() {
  const page = 1;
  const showNo = 8;
  const search = "";
  const fameType = "Best Selling";
  const productList = await GetProductTypeService(
    page,
    showNo,
    fameType,
    search
  );

  const ProductImage = ({ product, width, height, className }) => {
    const primaryImage = product?.product_img
      ? `https://assets2.drugcarts.com/${product.product_img}`
      : null;

    const fallbackImage = product?.product_img
      ? `https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/${product.product_img}`
      : null;

    const [imgSrc, setImgSrc] = useState(primaryImage || IMAGES.NO_IMAGE);

    const handleError = () => {
      if (imgSrc !== fallbackImage && fallbackImage) {
        setImgSrc(fallbackImage);
      } else {
        setImgSrc(IMAGES.NO_IMAGE);
      }
    };

    return (
      <Image
        priority
        src={imgSrc}
        alt={product?.product_name || "Product Image"}
        width={width}
        height={height}
        className={className}
        onError={handleError}
      />
    );
  };

  return (
    <section className="px-10 mt-10">
      <div className="bg-bgfame px-5 py-2 mb-10 relative">
        <div className="absolute top-2 left-1 text-white text-xs px-2 py-1 rounded-full">
          <Image
            src={IMAGES.FAMELIGHT}
            alt="fame of the day"
            className="w-12 object-contain -rotate-45 opacity-50"
          />
        </div>
        {/* Discount Badge */}
        {/* Share Icon */}
        <div className="absolute top-2 right-2 text-gray-500">
          <Image
            src={IMAGES.FAMELIGHT}
            alt="fame of the day"
            className="w-12 object-contain rotate-45 opacity-50"
          />
        </div>

        <header className="p-2 mb-2 text-center">
          <h1 className="text-lg font-bold">Fame of the Day</h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:p-3 content-center place-items-center border border-t-0">
          {productList &&
            productList?.products?.map((product, i) => (
              <div
                key={i}
                className="border rounded-lg p-2 bg-white shadow hover:shadow-lg w-5/6 md:w-full mt-2 md:mt-0 border-2"
              >
                <div className="grid justify-end">
                  {product?.percentage ? (
                    <div className="ml-20 bg-[#ff5c01] text-white text-xs px-2 py-1 rounded-full">
                      -{product?.percentage}%
                    </div>
                  ) : null}
                </div>
                <ProductImage
                  product={product}
                  width={200}
                  height={200}
                  className="w-48 h-48 mx-auto"
                />
                <h3 className="text-gray-500 font-poppins capitalize font-medium text-[13px] w-[100%] line-clamp-1">
                  {product?.cat_name} / {product?.subcat_name}
                </h3>
                <h2
                  className="text-black font-poppins font-bold text-[14px] mt-1 w-[100%] line-clamp-1 cursor-pointer"
                  onClick={() => router.push(`/product/${product?.url}`)}
                >
                  {product?.product_name}
                </h2>
                <div className="flex items-center space-x-4 mt-1">
                  <h3 className="line-through text-gray-500 text-sm">
                    MRP :₹{product?.price}
                  </h3>
                  <h3 className="text-green-600 text-sm font-semibold">
                    {product?.percentage} %
                  </h3>
                </div>
                <div className="bg-white mt-1 flex justify-items-center justify-between">
                  <p className="text-black font-poppins font-semibold text-[14px] mt-1">
                    &#8377; {product?.saleprice}
                  </p>
                  <button onClick={() => dispatch(PostCartService(product))}>
                    <CartIcon />
                  </button>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-gray-500">&#9733;</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="p-1">
          <Image
            src={IMAGES.OFFERS1}
            alt="Offer Banner"
            className="w-full object-cover"
          />
        </div>
        <div className="p-1">
          <Image
            src={IMAGES.OFFERS2}
            alt="Offer Banner"
            className="w-full object-cover"
          />
        </div>
        <div className="p-1">
          <Image
            src={IMAGES.OFFERS3}
            alt="Offer Banner"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
