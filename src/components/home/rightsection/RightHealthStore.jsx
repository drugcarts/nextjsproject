"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const RightHealthStore = () => {
  return (
    <>
      <div className="bg-[#FBE8E2] text-sm">
        <div className="p-2 border-b-2 px-4">
          <Link href="/personal-care" className="flex items-center justify-start gap-2 ">
            <Image
              src={IMAGES.PERSONALCARE}
              alt="Personal Care"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Personal Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/fitness-supplements" className="flex items-center justify-start gap-2 ">
            <Image
              src={IMAGES.SUPPLEMENTS}
              alt="Fitness Supplements"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Fitness Supplements</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/health-care-device" className="flex items-center justify-start gap-2 ">
            <Image
              src={IMAGES.HEALTHCARE}
              alt="Health Care Products"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Health Care Products</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RightHealthStore;
