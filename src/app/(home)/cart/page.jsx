"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  CartIncrementService,
  CartDecrementService,
  getCartService,
  DeleteCartService,
} from "@/services/cartService";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartTotal,
  selectMRPCartTotal,
  selectTotalAfterDiscount,
  selectDrugcartDiscountTotal,
  selectTotalDiscountPercentage,
  selectTotalSavings,
} from "@/reduxToolkit/slices/cartSlice";
import { useRouter } from "next/navigation";
import { tableText } from "@/utils/textFormat";

function MyCart() {
  const { carts, items } = useSelector((state) => state.cartData);
  const router = useRouter();
  const totalPrice = useSelector(selectCartTotal);
  const totalMRPPrice = useSelector(selectMRPCartTotal);
  const totalAfterDiscount = useSelector(selectTotalAfterDiscount);
  const totalDrugcartDiscount = useSelector(selectDrugcartDiscountTotal);
  const totalDiscountPercentage = useSelector(selectTotalDiscountPercentage);
  const totalSavings = useSelector(selectTotalSavings);
  const dispatch = useDispatch();

  const onAuth = items.length > 0 ? items : carts?.carts || [];

  const checkoutClick = async () => {
    // const token = await localStorage.getItem("token");
    const isPrescription = items?.find(
      (item) => item?.rexrequired === "Rx Required"
    );
    if (isPrescription) {
      router.push("/prescription");
    } else {
      router.push("/address");
    }
  };

  return (
    <section className="px-2 md:px-12 mt-3">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Your Cart: {onAuth.length} Items
        </h2>
        {onAuth.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="border rounded-lg p-4 bg-white w-full md:w-3/4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b pb-4 font-bold ">
                  <div className="w-[50%] flex items-center">
                    <h3>Product Details</h3>
                  </div>
                  <div className="w-[25%] flex items-center md:justify-center">
                    <h3>Quantity</h3>
                  </div>
                  <div className="w-[25%] flex items-center md:justify-center">
                    {" "}
                    <h3>Total Price</h3>
                  </div>
                </div>
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center justify-between border-b pb-4 font-bold "
                  >
                    <div className="w-full md:w-[50%] flex items-center space-x-4">
                      {/* <Image
                        src={
                          item?.product_img
                            ? `https://assets1.drugcarts.com/${item?.product_img}`
                            : IMAGES.NO_IMAGE
                        }
                        alt="Product"
                        className="w-16 h-16"
                        width={50}
                        height={50}
                      /> */}
                      <img
                        src={`https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/${item?.product_img}`}
                        alt={item?.product_name}
                        width={50}
                        height={50}
                        className="object-cover rounded w-16 h-16"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://assets2.drugcarts.com/${item?.product_img}`;
                        }}
                      />
                      <div>
                        <h3 className="font-semibold">
                          {tableText(item?.product_name, 22)}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {item?.cat_name}
                        </p>
                      </div>
                    </div>
                    <div className="w-[50%] md:w-[25%] flex items-center md:justify-center space-x-10 my-5">
                      <div className="flex items-center border rounded-lg">
                        <button
                          className="px-2 py-1 bg-red-500 text-white"
                          onClick={() => {
                            if (item.quantity > 1) {
                              dispatch(
                                CartDecrementService(item._id, {
                                  quantity: item.quantity - 1,
                                })
                              );
                            }
                          }}
                        >
                          −
                        </button>
                        <span className="px-4">{item?.quantity}</span>
                        <button
                          className="px-2 py-1 bg-green-500 text-white"
                          onClick={() =>
                            dispatch(
                              CartIncrementService(item._id, {
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[50%] md:w-[25%] items-center md:justify-center my-5">
                      <div className="flex items-center md:justify-center text-sm pb-2">
                        <p className="line-through text-gray-400 text-center">
                          ₹ {item?.price}
                        </p>
                        <p className="px-2"> / </p>
                        <p className="text-[green]">
                          Saved :{item?.percentage} %
                        </p>
                      </div>
                      <div className="flex space-x-7 items-center justify-center">
                        <p className="text-lg font-bold text-[red]">
                          ₹ {(item?.saleprice * item?.quantity).toFixed(0)}
                        </p>
                        <button
                          className="text-red-500"
                          onClick={() => dispatch(DeleteCartService(item?._id))}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-right text-xl font-bold text-pink-700 border-b pb-4">
                  Total Cart Value: ₹{totalPrice.toFixed(0)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg shadow-md md:w-1/4 w-full">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Sub total</span>
                  <span>{onAuth.length} items</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span>₹{totalMRPPrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Drugcart Discount</span>
                  <span>₹{totalDrugcartDiscount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Cart Value</span>
                  <span>₹{totalPrice.toFixed(0)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold text-red-600">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toFixed(0)}</span>
                </div>
              </div>

              <button
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                onClick={checkoutClick}
              >
                Checkout
              </button>

              <div className="mt-2 text-center text-sm text-gray-500 bg-[#EEFEE3] p-[1px] border-2 border-dotted">
                💰 Total Savings: ₹{totalDrugcartDiscount.toFixed(0)}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-[red] font-bold mx-auto text-xl md:text-3xl">
            Your Cart is Empty....
          </p>
        )}
      </div>
    </section>
  );
}

export default MyCart;
