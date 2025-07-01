"use client";
import Image from "next/image";
import CartIcon from "@/assets/Icons/CartIcon";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/components/common/images";
import { PostCartService } from "@/services/cartService";

const ProductCard = ({ productCategory }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const ProductClick = (url) => {
    router.push(`/product/${url}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-3 content-center place-items-center">
        {productCategory &&
          productCategory?.map((product, i) => (
            <div
              key={i}
              className="border rounded-lg p-2 bg-white shadow hover:shadow-lg w-5/6 md:w-full mt-2 md:mt-0 border-2"
            >
              <div className="grid justify-end">
                {product?.percentage ? (
                  <div className="ml-20 bg-[#ff5c01] text-white text-xs px-2 py-1 rounded-full">
                    -{product?.percentage}%
                  </div>
                ) : (
                  <div className="ml-20 bg-[#ddd] text-white text-xs px-2 py-1 rounded-full">
                    0 %
                  </div>
                )}
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
                height={220}
                className="p-2 w-[250px] h-[220px] my-1 mx-auto"
              />
              <h3 className="text-gray-500 font-poppins capitalize font-medium text-[13px] w-[60%] line-clamp-1">
                {product?.cat_name} / {product?.subcat_name}
              </h3>
              <h2
                className="text-black font-poppins font-bold text-[14px] mt-1 w-[80%] line-clamp-1 cursor-pointer"
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
    </>
  );
};

export default ProductCard;
