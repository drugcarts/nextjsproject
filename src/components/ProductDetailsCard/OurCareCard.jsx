"use client";
import Image from "next/image";
import { IMAGES } from "../common/images";

const OurCareCard = ({data}) => {
  console.log('data', data);
  
  return (
    <>
        <h2 className="font-bold text-center m-2 text-2xl my-8">
                Our Care
              </h2>
              <div className="bg-[#CEDEFC] text-sm">
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image
                    src={IMAGES.BABYCARE}
                    alt="ANTI CANCER"
                    priority
                    className="w-10 bg-white"
                  />
                  <h2 className="text-md font-bold ps-7">Baby Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image
                    src={IMAGES.FACECARE}
                    alt="ANTI CANCER"
                    priority
                    className="w-10 bg-white"
                  />
                  <h2 className="text-md font-bold ps-7">Face Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image
                    src={IMAGES.FRAGRANCES}
                    alt="ANTI CANCER"
                    priority
                    className="w-10 bg-white"
                  />
                  <h2 className="text-md font-bold ps-7">Fragrances</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image
                    src={IMAGES.HAIRCARE}
                    alt="ANTI CANCER"
                    priority
                    className="w-10 bg-white"
                  />
                  <h2 className="text-md font-bold ps-7">Hair Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image
                    src={IMAGES.HOMECARE}
                    alt="ANTI CANCER"
                    priority
                    className="w-10 bg-white"
                  />
                  <h2 className="text-md font-bold ps-7">Home Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image
                    src={IMAGES.SKINCARE}
                    alt="ANTI CANCER"
                    priority
                    className="w-10 bg-white"
                  />
                  <h2 className="text-md font-bold ps-7">Skin Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image
                    src={IMAGES.WOMENCARE}
                    alt="ANTI CANCER"
                    priority
                    className="w-10 bg-white"
                  />
                  <h2 className="text-md font-bold ps-7">Women Care</h2>
                </div>
              </div>
    </>
  )
}

export default OurCareCard;