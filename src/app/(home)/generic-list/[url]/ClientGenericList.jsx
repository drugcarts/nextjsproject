"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { PostCartService } from "@/services/cartService";
import { IMAGES } from "@/components/common/images";
import CartIcon from "@/assets/Icons/CartIcon";
import Helpful from "@/components/ProductDetailsCard/Helpful";
import OtcProduct from "@/components/ProductDetailsCard/OtcProduct";
import FilterCompanyCard from "@/components/ProductDetailsCard/FilterCompanyCard";
import { tableText } from "@/utils/textFormat";

const ClientGenericList = ({ productList }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // For applying price filter
  const [minPrice, setMinPrice] = useState(null); // default: show all
  const [maxPrice, setMaxPrice] = useState(null);

  // For user input before apply
  const [tempMinPrice, setTempMinPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(10000);

  const handleApply = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
  };

  const ProductClick = (url) => {
    router.push(`/product/${url}`);
  };

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
    <section className="max-w-7xl mx-auto">
      <div className="py-2 text-xl font-bold">
        <h2 className="ml-2">List of Medicine</h2>
      </div>
      <div className="flex flex-wrap">
        {/* Sidebar Filters */}
        <div className="w-[20%] flex-none hidden md:block">
          <div className="border-[1.5px] m-2 rounded-md">
            <h2 className="bg-[#B7084B] p-2 mx-auto text-white font-bold">
              Latest Product
            </h2>
            <div className="m-2">
              <div className="flex justify-start border-[1.5px] p-2">
                <ProductImage
                  product={productList?.products?.[0]}
                  width={250}
                  height={250}
                  className="w-16 h-16 object-cover"
                />
                <div className="ml-2">
                  <h3
                    className="font-bold text-sm cursor-pointer"
                    onClick={() =>
                      ProductClick(productList?.products?.[0]?.url)
                    }
                  >
                    {tableText(productList?.products?.[0]?.product_name, 30)}
                  </h3>
                  <h3 className="text-gray-400 text-xs">
                    {productList?.products?.[0]?.generices}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 text-xs">&#9733;</span>
                    <span className="text-yellow-500 text-xs">&#9733;</span>
                    <span className="text-yellow-500 text-xs">&#9733;</span>
                    <span className="text-yellow-500 text-xs">&#9733;</span>
                    <span className="text-gray-500 text-xs">&#9733;</span>
                  </div>
                  <h4 className="text-bgcolor text-sm">Banned for sale</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Price Filter */}
          <div className="border-[1.5px] m-2 rounded-md">
            <h2 className="bg-[#4C4C95] p-2 mx-auto text-white font-bold">
              Price Range
            </h2>
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
              <div className="relative my-6">
                <div className="w-full h-1 bg-gray-300 rounded-lg absolute top-1/2 transform -translate-y-1/2" />

                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(Number(e.target.value))}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto"
                />

                <div className="absolute left-0 -top-7 bg-indigo-700 text-white text-xs px-2 py-1 rounded-md">
                  ₹{tempMinPrice}
                </div>
                <div className="absolute right-0 -top-7 bg-indigo-700 text-white text-xs px-2 py-1 rounded-md">
                  ₹{tempMaxPrice >= 10000 ? "10k" : tempMaxPrice}
                </div>
              </div>

              <div className="flex justify-center items-center space-x-4 py-6">
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(Number(e.target.value))}
                  className="w-20 p-2 border rounded-lg text-center"
                />
                <span className="text-lg font-bold">-</span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                  className="w-20 p-2 border rounded-lg text-center"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setTempMinPrice(0);
                    setTempMaxPrice(10000);
                    setMinPrice(null);
                    setMaxPrice(null);
                  }}
                  className="bg-pink-600 text-white px-4 py-1 rounded-lg hover:bg-pink-700 text-[14px]"
                >
                  Reset
                </button>
                <button
                  onClick={handleApply}
                  className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 text-[14px]"
                >
                  Apply
                </button>
              </div>

              {/* {minPrice !== null && maxPrice !== null && (
                <p className="text-center mt-4 text-gray-600">
                  Showing: ₹{minPrice} - ₹{maxPrice}
                </p>
              )} */}
            </div>
          </div>

          <FilterCompanyCard />
          <Helpful />
          <OtcProduct />
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-[80%] flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-3 content-center place-items-center">
            {(productList?.products || [])
              .filter((product) => {
                const price = Number(product?.saleprice || product?.price || 0);
                if (minPrice === null || maxPrice === null) return true;
                return price >= minPrice && price <= maxPrice;
              })
              .map((product, i) => (
                <div
                  key={i}
                  className="relative border rounded-lg p-2 bg-white shadow hover:shadow-lg w-5/6 md:w-full mt-2 md:mt-0"
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
                    width={250}
                    height={250}
                    className="sml-3 p-2 w-[250px] h-[220px] my-1 mx-auto pt-6"
                  />

                  <h3 className="text-gray-500 font-poppins font-medium text-[13px] w-[60%] line-clamp-1 capitalize">
                    {product?.cat_name} / {product?.generices}
                  </h3>
                  <h2
                    className="text-black font-poppins font-bold text-[13px] mt-1 w-[80%] line-clamp-1 cursor-pointer"
                    onClick={() => ProductClick(product?.url)}
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

                  <div className="bg-white mt-1 flex justify-between">
                    <p className="text-black font-semibold text-[14px] mt-1">
                      ₹{product?.saleprice}
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
      </div>
    </section>
  );
};

export default ClientGenericList;
