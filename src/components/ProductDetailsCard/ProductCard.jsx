"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import CartIcon from "@/assets/Icons/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reduxToolkit/slices/cartSlice";
import { IMAGES } from "../common/images";
import { GetProductCategoryService, GetProductCatsService } from "@/services/productService";
import { PostCartService } from "@/services/cartService";

const ProductCard = ({ data }) => {
  const router = useRouter()
  const { productCategory, categoryProducts } = useSelector((state) => state.productData);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showNo, setShowNo] = useState(10);
  const dispatch = useDispatch();
  const params = useParams();

  const formatText = (input) => {
    return input
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

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
        alt={product?.product_name || 'Product Image'}
        width={width}
        height={height}
        className={className}
        onError={handleError}
      />
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-3 content-center place-items-center">
        {data &&
          data?.map((product, i) => (
            <div
              key={i}
              className="border rounded-lg p-2 bg-white shadow hover:shadow-lg w-5/6 md:w-full mt-2 md:mt-0 border-2 cursor-pointer"
              onClick={() => router.push(`/product/${product?.url}`)}
            >
              <div className="grid justify-end">
                {product?.percentage ? (
                  <div className="ml-20 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    -{product?.percentage}%
                  </div>
                ) : null}
              </div>
              {/* <Image
                  priority
                  src={
                    product?.product_img
                      ? `https://assets2.drugcarts.com/${product?.product_img}`
                      : IMAGES.NO_IMAGE
                  }
                  alt={product?.product_name}
                  width={250}
                  height={220}
                  className="p-2 w-[250px] h-[220px] my-1 mx-auto"
                /> */}
              <ProductImage product={product} width={250} height={250} className="p-2 w-[250px] h-[220px] my-1 mx-auto" />
              <h3 className="text-gray-500 font-poppins font-medium text-[13px] w-[80%] line-clamp-1">
                {product?.generices || formatText(product?.cat_name)}
              </h3>
              <p className="text-black font-poppins font-bold text-[14px] mt-1 w-[80%] line-clamp-1">
                {product?.product_name}
              </p>
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
                  ${product?.saleprice}
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
    </>
  );
};

export default ProductCard;
