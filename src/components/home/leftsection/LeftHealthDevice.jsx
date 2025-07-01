"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const LeftHealthDevice = () => {
  return (
    <>
      <div className="bg-[#EBEBEB] text-sm">
        <div className="p-2 border-b-2 border-gray-300">
          <Link
            href="/category/blood-pressure-monitor-bp-monitor"
            className="flex gap-2"
          >
            <Image
              src={IMAGES.BLOODPRESSURE}
              alt="Blood Pressure Monitor"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Blood Pressure Monitor</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 border-gray-300">
          <Link href="/category/blood-test-kit" className="flex gap-2">
            <Image
              src={IMAGES.BLOODTEST}
              alt="Blood Test Kit"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Blood Test Kit</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 border-gray-300">
          <Link href="/category/covid-test-kit" className="flex gap-2">
            <Image
              src={IMAGES.COVIDTEST}
              alt="Covid Test Kit"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Covid Test Kit</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 border-gray-300">
          <Link href="/category/diabetes-monitor" className="flex gap-2">
            <Image
              src={IMAGES.GLUCOMETER}
              alt="Diabetes Monitor"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Diabetes Monitor</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 border-gray-300">
          <Link href="/category/hiv-test-kit" className="flex gap-2">
            <Image
              src={IMAGES.HIV}
              alt="HIV Test Kit"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">HIV Test Kit</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 border-gray-300">
          <Link href="/category/pregnancy-test-kit" className="flex gap-2">
            <Image
              src={IMAGES.PREGNANCY}
              alt="Pregnancy Test Kit"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Pregnancy Test Kit</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 border-gray-300">
          <Link href="/category/pulse-oximeter" className="flex gap-2">
            <Image
              src={IMAGES.PULSE}
              alt="Pulse Oximeter"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Pulse Oximeter</h2>
          </Link>
        </div>
        <div className="p-2 border-b-2 border-gray-300">
          <Link href="/category/nebulizer-machines" className="flex gap-2">
            <Image
              src={IMAGES.NEBULIZER}
              alt="Nebulizer Machines"
              priority
              className="w-6 bg-white"
            />
            <h2 className="text-md font-bold">Nebulizer Machines</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LeftHealthDevice;
