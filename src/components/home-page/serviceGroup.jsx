"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const ServiceGroup = () => {
  return (
    <section className="px-5">
      <div className="p-2 font-bold mb-2 mt-2 text-center text-lg">
        <h1>Our Service and Care</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-3 px-2 md:px-20">
        <div className="flex flex-col items-center">
          {/* Icon Circle */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            {/* Icon */}
            <Image
              src={IMAGES.SHIPPING}
              alt="Order Medicine"
              className="w-12 h-12"
            />
          </div>
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700 text-center">
            Order Medicine
          </p>
        </div>
        <div className="flex flex-col items-center">
          {/* Icon Circle */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            {/* Icon */}
            <Image
              src={IMAGES.CUSTOMER}
              alt="Nursing Service"
              className="w-12 h-12"
            />
          </div>
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700 text-center">
            Nursing Service
          </p>
        </div>
        <div className="flex flex-col items-center">
          {/* Icon Circle */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            {/* Icon */}
            <Image
              src={IMAGES.ANTHROPOLOGY}
              alt="Physiotherapy"
              className="w-12 h-12"
            />
          </div>
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700 text-center">
            Physiotherapy
          </p>
        </div>
        <div className="flex flex-col items-center">
          {/* Icon Circle */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            {/* Icon */}
            <Image
              src={IMAGES.DRUGSTORE}
              alt="Clinic Service"
              className="w-12 h-12"
            />
          </div>
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700 text-center">
            Clinic Service
          </p>
        </div>
        <div className="flex flex-col items-center">
          {/* Icon Circle */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            {/* Icon */}
            <Image
              src={IMAGES.EMERGENCY}
              alt="Emergency care"
              className="w-12 h-12"
            />
          </div>
          {/* Label */}
          <p className="mt-2 text-sm font-bold text-gray-700 text-center">
            Emergency care
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceGroup;
