"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const FeaturedPackage = () => {
  return (
    <section className="px-10">
      <div className="p-2 font-semibold mb-5 mt-10 text-lg bg-gray-100">
        <h1>Featured Care & Package</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 px-2 md:px-20">
        <Image
          src={IMAGES.SEASONAL}
          alt="Seasonal Package"
          className="w-96 h-full object-cover"
        />
        <Image
          src={IMAGES.LABPACKAGE}
          alt="Lab Package"
          className="w-96 h-full object-cover"
        />
        <Image
          src={IMAGES.TESTKIT}
          alt="Test Kit"
          className="w-96 h-full object-cover"
        />
        <Image
          src={IMAGES.WOMEN}
          alt="Package for Women"
          className="w-96 h-full object-cover"
        />
        <Image
          src={IMAGES.BABYCARE1}
          alt="Baby Care"
          className="w-96 h-full object-cover"
        />
        <Image
          src={IMAGES.SPECIALFCARE}
          alt="Special Care"
          className="w-96 h-full object-cover"
        />
        <Image
          src={IMAGES.CLINICCARE}
          alt="Clinic Care"
          className="w-96 h-full object-cover"
        />
        <Image
          src={IMAGES.DRUGCARTS}
          alt="Drugcarts Package"
          className="w-96 h-full object-cover"
        />
      </div>
    </section>
  );
};

export default FeaturedPackage;
