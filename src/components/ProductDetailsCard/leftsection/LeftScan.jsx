"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const LeftScan = () => {
  return (
    <>
      <div className="bg-[#FFF7DB] text-sm">
        <div className="p-2 border-b-2">
          <Link href="/scan/petctscan" className="flex gap-2">
            <Image
              src={IMAGES.PETCTSCAN}
              alt="Pet CT Scan"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Pet CT Scan</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/scan/ctscan" className="flex gap-2">
            <Image
              src={IMAGES.CTSCAN}
              alt="CT Scan"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">CT Scan</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/scan/mriscan" className="flex gap-2">
            <Image
              src={IMAGES.MRISCAN}
              alt="MRISCAN"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">MRI Scan</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/scan/usgscan" className="flex gap-2">
            <Image
              src={IMAGES.USGSCAN}
              alt="USG Scan"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">USG Scan</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/stress-test" className="flex gap-2">
            <Image
              src={IMAGES.STRESSTEST}
              alt="Stress Test"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Stress Test</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/ecg-test" className="flex gap-2">
            <Image
              src={IMAGES.ECGTEST}
              alt="ECG Test"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">ECG Test</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LeftScan;
