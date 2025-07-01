import React from "react";

const CartHeader = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white p-6">
      <div className="flex justify-center items-center space-x-2 py-2">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex justify-center items-center bg-green-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
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
        <div className="flex-grow h-1 bg-gray-300 w-20"></div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
          </div>
          <span className="mt-2 text-sm font-medium text-black">
            Upload Prescription
          </span>
        </div>
        {/* <div className="h-[2px] bg-gray-400 w-[10%]"></div> */}
        <div className="flex-grow h-1 bg-gray-300 w-20"></div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
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
          <span className="mt-2 text-sm font-medium text-black">Address</span>
        </div>
        <div className="flex-grow h-1 bg-gray-300 w-20"></div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
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
            Order Summary
          </span>
        </div>
        <div className="flex-grow h-1 bg-gray-300 w-20"></div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          </div>
          <span className="mt-2 text-sm font-medium text-black">Payment</span>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
