"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";
const LeftService = () => {
  return (
    <>
      <div className="bg-[#F3F4F5] text-sm">
        <div className="p-2 border-b-2">
          <Link href="/nursing" className="flex gap-2">
            <Image
              src={IMAGES.NURSE}
              alt="Nursing Care"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Nursing Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/physiotherapist" className="flex gap-2">
            <Image
              src={IMAGES.PHYSIO}
              alt="Physiotherapy"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Physiotherapy Service</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/dietician" className="flex gap-2">
            <Image
              src={IMAGES.DIETICIAN}
              alt="Dietician Care"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Dietician Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/elder-care" className="flex gap-2">
            <Image
              src={IMAGES.ELDER}
              alt="Elder Care"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Elder Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/orthopedic-care" className="flex gap-2">
            <Image
              src={IMAGES.ORTHOPEDIC}
              alt="Orthopedic Care"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Orthopedic Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/" className="flex gap-2">
            <Image
              src={IMAGES.GLUCOMETER}
              alt="Gluco Meter"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Gluco Meter</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/vaccination" className="flex gap-2">
            <Image
              src={IMAGES.VACCINATION}
              alt="ANTI CANCER"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Vaccination Service</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/covid-care" className="flex gap-2">
            <Image
              src={IMAGES.COVID}
              alt="Covid Care Service"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Covid Care Service</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/cancer-care" className="flex gap-2">
            <Image
              src={IMAGES.CANCER}
              alt="Cancer Care"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Cancer Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link
            href="/catalog/Nutritional%20Supplements"
            className="flex gap-2"
          >
            <Image
              src={IMAGES.NATURALFOOD}
              alt="Nutriti Care Service"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Nutriti Care Service</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LeftService;
