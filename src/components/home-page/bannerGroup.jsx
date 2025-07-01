"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const BannerGroup = () => {
  return (
    <section className="px-10 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Image
          priority
          src={IMAGES.AROMA}
          alt="Aroma Care"
          className="mx-auto object-cover w-full md:w-96"
        />
        <Image
          priority
          src={IMAGES.LABTEST1}
          alt="Lab Test"
          className="mx-auto object-cover md:w-96 w-full"
        />
        <Image
          priority
          src={IMAGES.HEALTHCAREBANNER}
          alt="Health Care"
          className="mx-auto object-cover md:w-96 w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 justify-items-center">
        <Image
          priority
          src={IMAGES.AYURVEDICBANNER}
          alt="Ayurvedic Care"
          className="mx-auto object-cover w-full md:w-96 h-full"
        />
        <Image
          priority
          src={IMAGES.SPECIALCAREBANNER}
          alt="Special Care"
          className="mx-auto object-cover w-full md:w-96 h-full"
        />
        <Image
          priority
          src={IMAGES.EYECAREBANNER}
          alt="Eye Care"
          className="mx-auto object-cover w-full md:w-96 h-full"
        />
      </div>
    </section>
  );
};

export default BannerGroup;
