"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";

const Helpful = () => {
  return (
    <>
      <h2 className="text-xl font-bold my-5 text-center">Feedback</h2>
      <div className="border-2 p-3">
        <h2 className="text-xl font-bold my-2 text-center">
          Did you find this helpful ?
        </h2>
        <p className="text-sm text-gray-400">
          Your feedback will help to improve the product
        </p>
        <div className="flex justify-center items-center gap-2 border-2 my-3">
          <Image
            src={IMAGES.THUMBSUP}
            alt="Description"
            className="w-[30px] md:w-[50px]"
          />
          <h3 className="text-lg md:text-2xl font-bold">Yes</h3>
        </div>
        <div className="flex justify-center items-center gap-2 border-2 my-3">
          <Image
            src={IMAGES.THUMBSDOWN}
            alt="Description"
            className="w-[30px] md:w-[50px]"
          />
          <h3 className="text-lg md:text-2xl font-bold">No</h3>
        </div>
      </div>
    </>
  );
};

export default Helpful;
