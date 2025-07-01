"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const RightAyushCategory = () => {
  return (
    <>
      <div className="bg-[#FFEDF2] text-sm">
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/ayurvedic"
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={IMAGES.AYUSH}
              alt="Ayurvedic"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Ayurvedic</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/siddha"
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={IMAGES.SIDDHA}
              alt="Siddha"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Siddha</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link href="/category/unani" className="flex items-center justify-start gap-2">
            <Image
              src={IMAGES.UNANI}
              alt="Unani"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Unani</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 px-4">
          <Link
            href="/category/homeopathy"
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={IMAGES.HOMEOPATHY}
              alt="Homeopathy"
              priority
              className="w-10 bg-white"
            />
            <h2 className="text-md font-bold ps-7">Homeopathy</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RightAyushCategory;
