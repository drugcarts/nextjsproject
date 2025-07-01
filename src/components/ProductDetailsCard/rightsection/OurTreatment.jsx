"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const OurTreatment = () => {
  return (
    <>
      <div className="text-sm border-2">
        <div className="text-center bg-[#1877F2] p-2 border-b-2 px-4">
          <h2 className="text-xl text-white font-bold ps-7">Our Treatment</h2>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.SKINTREATMENT}
              alt="Skin Treatment"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Skin Treatment</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.COUGHCOLD}
              alt="Cough Cold"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Cough Cold</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.GLUCOMETER}
              alt="Diabetes"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Diabetes</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.STOMACH}
              alt="Pain Relief"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Pain Relief</h2>
          </Link>
        </div>
        <div className="p-2 px-4">
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
      </div>
    </>
  );
};

export default OurTreatment;
