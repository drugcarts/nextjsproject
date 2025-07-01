"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import CartIcon from "@/assets/Icons/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reduxToolkit/slices/cartSlice";
import { IMAGES } from "../common/images";
import { GetProductCatsService } from "@/services/productService";
import { PostCartService } from "@/services/cartService";

const ProductCategoryCard = () => {
  const { categoryProducts } = useSelector((state) => state.productData);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showNo, setShowNo] = useState(10);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(GetProductCatsService(page, showNo, params?.url, search));
  }, [page, showNo, search]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-3 content-center place-items-center">
        {categoryProducts &&
          categoryProducts?.catproducts?.map((product, i) => (
            <div
              key={i}
              className="border rounded-lg p-2 bg-white shadow hover:shadow-lg w-5/6 md:w-full mt-2 md:mt-0 border-2"
            >
              <div className="grid justify-end">
                <button className="bg-[#FFE5EF] p-1 rounded-full shadow hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={
                      product?.fav == true
                        ? "text-red-500 size-4"
                        : "size-4 text-white"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>
              <Image
                priority
                src={
                  product?.product_img
                    ? `https://assets2.drugcarts.com/${product?.product_img}`
                    : IMAGES.NO_IMAGE
                }
                alt={product?.product_name}
                width={250}
                height={250}
              />
              <h3 className="text-gray-500 font-poppins font-medium text-[13px] w-[60%] line-clamp-1">
                {product?.cat_name}
              </h3>
              <p className="text-black font-poppins font-medium text-[13px] mt-1 w-[60%] line-clamp-1">
                {product?.product_name}
              </p>
              <div className="bg-white mt-1 flex justify-items-center justify-between">
                <p className="text-black font-poppins font-semibold text-[14px] mt-1">
                  {product?.price}
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

export default ProductCategoryCard;
