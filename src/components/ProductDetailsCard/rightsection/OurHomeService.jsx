"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const OurHomeService = () => {
  return (
    <>
      <div className="bg-[#E4EDFF] text-sm">
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/ayurvedic"
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={IMAGES.AYURVEDIC}
              alt="Ayurvedic Supplements"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Ayurvedic Supplements</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.NUTRITION}
              alt="Family Nutrition"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Family Nutrition</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.HEALTHFOOD}
              alt="Health Food and Drinks"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Health Food and Drinks</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.ORGANIC}
              alt="Health Supplements"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Health Supplements</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.SMOKING}
              alt="Smoking Cessation"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Smoking Cessation</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.PROTEIN}
              alt="Sports Supplements"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Sports Supplements</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.VITAMINS}
              alt="Vitamins and Supplements"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Vitamins and Supplements</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.WEIGHT}
              alt="Weight Management"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Weight Management</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OurHomeService;
