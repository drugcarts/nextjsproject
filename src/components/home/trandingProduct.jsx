"use client";
import Image from "next/image";
import CartIcon from "@/assets/Icons/CartIcon";
import discountImg from "@/assets/trendingimg/dealofday.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  GetProductTypeService,
  getBestProductTypeData,
} from "@/services/productService";
import { PostCartService } from "@/services/cartService";
import { useRouter } from "next/navigation";
import { IMAGES } from "../common/images";

const TrandingProduct = () => {
  const { productTypeList } = useSelector((state) => state.productData);
  const [bestProduct, setBestProduct] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Popular");

  useEffect(() => {
    dispatch(GetProductTypeService(1, 8, activeTab));
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBestProductTypeData(1, 3);
      if (res?.products) {
        setBestProduct(res?.products);
      }
    };
    fetchData();
  }, []);

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
    <section className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[4.5fr_1.5fr] gap-4 mb-10">
        <div>
          <div className="flex flex-wrap justify-between items-center p-3 border border-t-1 ">
            <div className="flex w-full md:w-1/2 mb-4 mg:mb-0">
              <h2 className="text-xl font-bold">Trending This Week</h2>
            </div>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 border rounded-lg ${
                  activeTab === "Popular" ? "bg-pink-500 text-white" : ""
                }`}
                onClick={() => setActiveTab("Popular")}
              >
                Popular
              </button>
              <button
                className={`px-4 py-2 border rounded-lg ${
                  activeTab === "Top Brands" ? "bg-pink-500 text-white" : ""
                }`}
                onClick={() => setActiveTab("Top Brands")}
              >
                Top Brands
              </button>
              <button
                className={`px-4 py-2 border rounded-lg ${
                  activeTab === "newarrivals" ? "bg-pink-500 text-white" : ""
                }`}
                onClick={() => setActiveTab("Frequently")}
              >
                Frequently
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-3 content-center place-items-center border border-t-0">
            {productTypeList &&
              productTypeList?.products?.map((product, i) => (
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
                    className="w-48 h-48 ml-3"
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
        <div className="bg-[#FFEFF5] rounded-md shadow-md">
          <div className="p-3">
            <h3 className="font-bold text-lg">Best Seller</h3>
            <hr className="border-gray-500 mt-2" />
          </div>
          {bestProduct?.map((item, i) => (
            <div
              key={i}
              className="flex justify-center items-center p-3 border-b-2 border-gray-300"
            >
              <div className="w-1/3 h-24">
                <ProductImage
                  product={item}
                  width={200}
                  height={200}
                  className="w-20 h-20 object-cover rounded-md mx-auto"
                />
              </div>
              <div className="w-2/3 h-24">
                <div className="ml-2">
                  <h2
                    className="text-sm cursor-pointer"
                    onClick={() => router.push(`/product/${item?.url}`)}
                  >
                    {item?.product_name}
                  </h2>
                  <p className="text-black font-poppins text-sm mt-1">
                    {item?.price}
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="w-1/2">
                      <span className="text-yellow-500">&#9733;</span>
                      <span className="text-yellow-500">&#9733;</span>
                      <span className="text-yellow-500">&#9733;</span>
                      <span className="text-yellow-500">&#9733;</span>
                      <span className="text-gray-500">&#9733;</span>
                    </div>
                    <div className="w-1/2">
                      <button
                        className="bg-green-500 hover:bg-blue-600 text-white font-poppins font-semibold text-[12px] py-1 px-1 rounded shadow-md"
                        onClick={() => router.push(`/product/${item?.url}`)}
                      >
                        <div className="flex justify-center">
                          <span>Shop Now</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="p-3">
            <hr className="border-gray-500 mt-2" />
          </div> */}
          <Image
            src={discountImg}
            alt="Product"
            className="w-76 h-auto mx-auto mt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default TrandingProduct;
