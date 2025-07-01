"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const RightOurCare = () => {
  return (
    <>
      <div className="bg-[#CEDEFC] text-sm">
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/baby-care"
            className="flex items-center justify-start gap-2 "
          >
            <Image
              src={IMAGES.BABYCARE}
              alt="Baby Care"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Baby Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/face-care"
            className="flex items-center justify-start gap-2 "
          >
            <Image
              src={IMAGES.FACECARE}
              alt="Face Care"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Face Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/fragrances"
            className="flex items-center justify-start gap-2 "
          >
            <Image
              src={IMAGES.FRAGRANCES}
              alt="Fragrances"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Fragrances</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/hair-care"
            className="flex items-center justify-start gap-2 "
          >
            <Image
              src={IMAGES.HAIRCARE}
              alt="Hair Care"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Hair Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/home-care"
            className="flex items-center justify-start gap-2 "
          >
            <Image
              src={IMAGES.HOMECARE}
              alt="Home Care"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Home Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/skin-care"
            className="flex items-center justify-start gap-2 "
          >
            <Image
              src={IMAGES.SKINCARE}
              alt="Skin Care"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Skin Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/women-care"
            className="flex items-center justify-start gap-2 "
          >
            <Image
              src={IMAGES.WOMENCARE}
              alt="Women Care"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Women Care</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RightOurCare;
