"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartTotal,
  selectTotalAfterDiscount,
  selectTotalDiscountPercentage,
  selectTotalSavings,
  selectMRPCartTotal,
  selectDrugcartDiscountTotal,
} from "@/reduxToolkit/slices/cartSlice";
import { useRouter } from "next/navigation";
import { PostOrderService } from "@/services/orderService";
import axios from "axios";

const PaymentDetail = () => {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const { carts, items } = useSelector((state) => state.cartData);
  const { prescription } = useSelector((state) => state.prescriptionData);
  const { userAddress, addresses } = useSelector((state) => state.addressData);
  const totalPrice = useSelector(selectCartTotal);
  const totalDiscountPercentage = useSelector(selectTotalDiscountPercentage);
  const totalMRPPrice = useSelector(selectMRPCartTotal);
  const totalDrugcartDiscount = useSelector(selectDrugcartDiscountTotal);
  const totalSavings = useSelector(selectTotalSavings);
  const dispatch = useDispatch();
  const router = useRouter();

  const options = [
    { label: "Online Payment", value: "online" },
    { label: "Cash on Delivery", value: "cod" },
  ];

  const handlePayU = async () => {
    setLoading(true);
    console.log('pay online');

    const txnid = 'Txn' + Date.now();
    const onlineOrderData = {
      shippingInfo: addresses,
      orderItems: items,
      rximage: prescription?.rximage,
      paymentInfo: {
        paymentmode: selected,
        paymentstatus: "Pending"
      },
      itemsPrice: totalPrice,
      shippingPrice: 0,
      totalPrice: totalPrice,
    };
    console.log('pay online', onlineOrderData);
    // await dispatch(PostOrderService(onlineOrderData, router));
    try {
      const { data } = await axios.post('/api/payment/payu', {
        txnid,
        amount: '1.00',
        firstname: addresses?.cus_name + " " + addresses?.lastname,
        email: addresses?.email,
        phone: addresses?.phone,
        productinfo: 'DRUGSCARTS',
      });

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.action;

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'action') return;
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      await dispatch(PostOrderService(onlineOrderData));
      document.body.appendChild(form);
     
      form.submit();
    } catch (error) {
      console.error('Payment setup failed:', error);
      alert('Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  let COD = 0;
  let codExtra = 0;
  let amountTotal;
  if (totalPrice <= 1000) {
    COD = 100;
    amountTotal = Number(totalPrice);
    codExtra = (amountTotal + COD).toFixed(2);
  } else if (totalPrice <= 2000) {
    COD = 200;
    amountTotal = Number(totalPrice);
    codExtra = (amountTotal + COD).toFixed(2);
  } else if (totalPrice <= 3000) {
    COD = 300;
    amountTotal = Number(totalPrice);
    codExtra = (amountTotal + COD).toFixed(2);
  } else if (totalPrice <= 4000) {
    COD = 400;
    amountTotal = Number(totalPrice);
    codExtra = (amountTotal + COD).toFixed(2);
  } else if (totalPrice <= 5000) {
    COD = 500;
    amountTotal = Number(totalPrice);
    codExtra = (amountTotal + COD).toFixed(2);
  } else {
    COD = 100;
    amountTotal = Number(totalPrice);
    codExtra = (amountTotal + COD).toFixed(2);
  }

  const orderConfirm = async () => {
    const orderData = {
      shippingInfo: addresses,
      orderItems: items,
      rximage: prescription?.rximage,
      paymentInfo: {
        paymentmode: selected,
        paymentstatus: "Success"
      },
      itemsPrice: totalPrice,
      shippingPrice: COD,
      totalPrice: codExtra,
    };
    console.log("orderData", orderData);
    await dispatch(PostOrderService(orderData, router));
  };

  console.log(totalSavings);

  return (
    <>
      <section className="px-2 md:px-12 mt-3">
        <div className="max-w-7xl mx-auto bg-white p-2">
          <div className="flex justify-center items-center space-x-2 py-2">
            <div className="flex flex-col items-center">
              <div className="w-6 md:w-12 h-6 md:h-12 flex justify-center items-center bg-green-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-6 md:w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7H19m-8-7v7m4-7v7"
                  />
                </svg>
              </div>
              <span className="mt-2 text-black font-bold text-sm">Cart</span>
            </div>
            <div className="flex-grow h-1 bg-green-500 w-20"></div>

            <div className="flex flex-col items-center">
              <div className="w-6 md:w-12 h-6 md:h-12 flex justify-center items-center bg-green-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4 md:h-6 md:w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-black text-center">
                Upload
              </span>
            </div>
            {/* <div className="h-[2px] bg-gray-400 w-[10%]"></div> */}
            <div className="flex-grow h-1 bg-green-500 w-20"></div>

            <div className="flex flex-col items-center">
              <div className="w-6 md:w-12 h-6 md:h-12 flex justify-center items-center bg-green-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4 md:h-6 md:w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-black">
                Address
              </span>
            </div>
            <div className="flex-grow h-1 bg-green-500 w-20"></div>

            <div className="flex flex-col items-center">
              <div className="w-6 md:w-12 h-6 md:h-12 flex justify-center items-center bg-green-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-6 md:w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16h8m-6-4h6m-4-4h4M3 5h18M5 7v14a2 2 0 002 2h10a2 2 0 002-2V7H5z"
                  />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-black">
                Summary
              </span>
            </div>
            <div className="flex-grow h-1 bg-gray-300 w-20"></div>

            <div className="flex flex-col items-center">
              <div className="w-6 md:w-12 h-6 md:h-12 flex justify-center items-center bg-green-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4 md:h-6 md:w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-black">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="border rounded-lg p-4 bg-white w-full md:w-3/5 w-full">
              <div className="max-w-md mx-auto p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Select Payment Method
                </h2>
                <div className="flex flex-col gap-4">
                  {options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center border rounded-xl p-4 mb-3 cursor-pointer transition-colors ${selected === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.value}
                        checked={selected === option.value}
                        onChange={() => setSelected(option.value)}
                        className="form-radio text-blue-600 w-5 h-5 mr-4"
                      />
                      <span className="text-lg ml-2"> {option.label}</span>
                    </label>
                  ))}
                  {selected == "cod" ? (
                    <p className="text-[red] font-bold">
                      Additional COD Fee Applicable &#8377; {COD}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-4 border-2 rounded-lg shadow-md md:w-2/5 w-full">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <div className="space-y-6">
                <div className="flex justify-between text-black">
                  <span>Sub total</span>
                  <span>{items?.length} items</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Total MRP</span>
                  <span>₹{totalMRPPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Total Drugcarts Discount</span>
                  <span>₹{totalDrugcartDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Total Cart Value</span>
                  <span>₹{totalPrice.toFixed(0)}</span>
                </div>
                <div className="border-t pt-2 mt-6 flex justify-between text-lg font-bold text-red-600">
                  <span>Total Amount</span>
                  <span>
                    ₹{" "}
                    {selected == "cod" ? (
                      <>{codExtra}</>
                    ) : (
                      <>{totalPrice.toFixed(2)}</>
                    )}{" "}
                  </span>
                </div>
              </div>
              <button
                disabled={loading || !selected}
                className={`w-full mt-6 ${selected ? "bg-green-600" : "bg-gray-300"} text-white py-2 rounded-lg font-semibold ${selected ? "hover:bg-green-700" : "hover:bg-gray-300"}`}
                onClick={selected === "cod" ? orderConfirm : handlePayU}
              >
                Proceed to Payment
              </button>
              <div className="mt-4 text-center text-sm text-black font-bold bg-[#EEFEE3] p-[1px] border-2 border-dotted">
                💰 Total Savings of ₹ {totalDrugcartDiscount.toFixed(2)} on this
                order
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentDetail;