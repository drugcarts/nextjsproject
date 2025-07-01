"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";

const OtcService = () => {
  return (
    <>
      <h2 className="text-2xl font-bold my-5 text-center">OTC Product</h2>
      <div className="border-2">
        <div className="p-2 justify-center items-center text-center">
          <Image
            src={IMAGES.CERTIFICATE}
            alt="ANTI CANCER"
            priority
            className="w-20 mx-auto"
          />
          <h2 className="font-bold text-sm">Genuine Product</h2>
          <div className="border-b-2"></div>
          <Image
            src={IMAGES.MONEY}
            alt="ANTI CANCER"
            priority
            className="w-20 mx-auto"
          />
          <h2 className="font-bold text-sm">Best Offers and Discounts</h2>
          <div className="border-b-2"></div>
          <Image
            src={IMAGES.DELIVERY}
            alt="ANTI CANCER"
            priority
            className="w-20 mx-auto"
          />
          <h2 className="font-bold text-sm">Door Step Delivery</h2>
        </div>
      </div>
    </>
  );
};

export default OtcService;
