"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const ShopbyCategory = () => {
  return (
    <section className="px-10 mt-3">
      <div className="p-2 font-semibold mb-2 mt-2 text-lg">
        <h1>Shop by Category</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 px-0 md:px-20 gap-3 mb-10">
        <div className="p-3 bg-[#F6A1AC] rounded-tl-2xl w-40 h-40 shadow-lg rounded-bl-full mb-10 md:mb-0">
          <h3 className="text-white text-xl text-center">Face Care</h3>
          <Image
            priority
            src={IMAGES.FACECARE1}
            alt="Face Care"
            className="categoryicon object-cover ml-10 "
          />
        </div>
        <div className="p-3 bg-[#699BF7] rounded-tl-2xl w-40 h-40 shadow-lg rounded-bl-full mb-10 md:mb-0">
          <h3 className="text-white text-xl text-center">Oral Care</h3>
          <Image
            priority
            src={IMAGES.ORALCARE}
            alt="Face Care"
            className="categoryicon object-cover ml-10 mt-5"
          />
        </div>
        <div className="p-3 bg-[#FF0076CC] rounded-tl-2xl w-40 h-40 shadow-lg rounded-bl-full mb-10 md:mb-0">
          <h3 className="text-white text-xl text-center">Women Care</h3>
          <Image
            priority
            src={IMAGES.FACECARE1}
            alt="Face Care"
            className="categoryicon object-cover ml-10 mt-5"
          />
        </div>
        <div className="p-3 bg-[#588345] rounded-tl-2xl w-40 h-40 shadow-lg rounded-bl-full mb-10 md:mb-0">
          <h3 className="text-white text-xl text-center">Natural Care</h3>
          <Image
            priority
            src={IMAGES.NATURALCARE}
            alt="Face Care"
            className="categoryicon object-cover ml-10 mt-5"
          />
        </div>
        <div className="p-3 bg-[#A15F3B] rounded-tl-2xl w-40 h-40 shadow-lg rounded-bl-full mb-10 md:mb-0">
          <h3 className="text-white text-xl text-center">Skin Care</h3>
          <Image
            priority
            src={IMAGES.SKINCARE1}
            alt="Skin Care"
            className="categoryicon object-cover ml-10 mt-5"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-3">
        <div className="flex bg-pink-200 p-10 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-24 text-bgcolor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
          <div>
            <h3 className="text-[#B7084B] font-bold mb-3">
              Upload Prescription
            </h3>
            <p>Upload Your Prescription and we will delivery medicine</p>
            <div className="flex flex-wrap mt-5 justify-center items-center mx-auto">
              <button className="mr-10 bg-[#B7084B] text-white px-8 md:px-3 py-4 text-sm rounded-lg">
                Upload Now
              </button>
              <button className="bg-[#B7084B] text-white mt-5 md:mt-0 px-6 py-2 text-sm rounded-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 mx-auto mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span>
                  {" "}
                  CALL US FREE <br />
                  1-888-567-999
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-10 rounded-md leading-8">
          <h3 className="text-[#B7084B] font-medium mb-3 text-2xl">
            How it Work?
          </h3>
          <ol className="list-decimal">
            <li>Upload a photo of your prescription</li>
            <li>Add delivery address and place the order</li>
            <li>We will call you to confirm the medicines</li>
            <li>
              Now, sit back! your medicines will get delivered at your doorstep
            </li>
          </ol>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-3">
        <div className="bg-[#4C4C95] rounded-md">
          <div className="flex">
            <div className="justify-start w-full  md:w-4/6 p-5 rounded-md">
              <h3 className="text-white text-2xl font-bold mt-7">
                What is Generic Medicine
              </h3>
            </div>
            <div className="flex justify-end w-full  md:w-2/6">
              <Image
                priority
                src={IMAGES.GENERIC1}
                alt="Find my Generic Medicine"
                className="h-32 w-full object-cover mx-auto rounded-md mt-3"
              />
            </div>
          </div>
          <div className="flex p-2 justify-center">
            <button className="mr-10 bg-white text-black px-5 font-bold py-2 text-sm rounded-lg">
              Find Now
            </button>
          </div>
        </div>
        <div className="bg-[#BD4E2E] rounded-md">
          <div className="flex">
            <div className="flex justify-start w-full  md:w-4/6 p-5 rounded-md">
              <h3 className="text-white text-2xl font-bold mt-7">
                Find my Generic Medicine
              </h3>
            </div>
            <div className="flex justify-end w-full  md:w-2/6">
              <Image
                priority
                src={IMAGES.GENERIC2}
                alt="Find my Generic Medicine"
                className="h-32 w-full object-cover mx-auto rounded-md mt-3"
              />
            </div>
          </div>
          <div className="flex p-2 justify-center">
            <button className="mr-10 bg-white text-black px-5 py-2 font-bold text-sm rounded-lg">
              Find Now
            </button>
          </div>
        </div>
      </div>
      <div className="p-2 font-bold mb-2 mt-2 text-center text-lg">
        <h1>Products and Offers</h1>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 px-2 md:px-20">
        <div className="flex flex-col items-center">
          <Image
            priority
            src={IMAGES.NEW}
            alt="Order Medicine"
            className="w-28 h-28"
          />
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700">Order Medicine</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            priority
            src={IMAGES.BESTSELLER}
            alt="Best Seller"
            className="w-28 h-28"
          />
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700">Best Product</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            priority
            src={IMAGES.DISCOUNT}
            alt="Discount Product"
            className="w-28 h-28"
          />
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700">
            Discount Product
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            priority
            src={IMAGES.TRANDING}
            alt="Trending Product"
            className="w-28 h-28"
          />
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700">
            Trending Product
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            priority
            src={IMAGES.HERBAL}
            alt="Herbal Product"
            className="w-28 h-28"
          />
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700">
            Ayurvedic Product
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShopbyCategory;
