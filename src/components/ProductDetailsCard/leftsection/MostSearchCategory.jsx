"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const MostSearchCategory = () => {
  return (
    <>
      <div className="bg-[#F3F4F5] text-sm">
        <div className="p-2 border-b-2">
          <Link href="/catalog/anti-cancer" className="flex gap-2">
            <Image
              src={IMAGES.ANTICANCER}
              alt="ANTI CANCER"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Anti Cancer</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/arthritis" className="flex gap-2">
            <Image
              src={IMAGES.ARTHRITIS}
              alt="ARTHRITIS"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Arthritis</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/anti-biotic" className="flex gap-2">
            <Image
              src={IMAGES.ANTIBIOTIC}
              alt="ANTI BIOTIC"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Anti-biotic</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/asthma-copd" className="flex gap-2">
            <Image
              src={IMAGES.ASTHMA}
              alt="ASTHMA"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Asthma</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/gastro-intestional-tract" className="flex gap-2">
            <Image
              src={IMAGES.GASTRO}
              alt="Gastro Intestional"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Gastro Intestional</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/cardiac-care" className="flex gap-2">
            <Image
              src={IMAGES.CARDIO}
              alt="Cardio Care"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Cardiac Care</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/nephrology" className="flex gap-2">
            <Image
              src={IMAGES.NEPHROLOGY}
              alt="Nephrology"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Nephrology</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/kidney-disease-stones" className="flex gap-2">
            <Image
              src={IMAGES.KIDNEY}
              alt="kidney-disease-stones"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Kidney disease/Stone</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/hypertension" className="flex gap-2">
            <Image
              src={IMAGES.HYPERTENSION}
              alt="Hypertension"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Hypertension</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2">
          <Link href="/catalog/hepatitis" className="flex gap-2">
            <Image
              src={IMAGES.HEPATITIS}
              alt="Hepatitis"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md">Hepatitis</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MostSearchCategory;
