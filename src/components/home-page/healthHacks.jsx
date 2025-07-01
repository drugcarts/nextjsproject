"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
const HealthHacks = () => {
  return (
    <section className="px-10 mt-3">
      <div className="p-2 font-semibold mb-2 mt-2 text-lg">
        <h1>Health Hacks</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 px-0 md:px-20 gap-3">
        <div className="border border-gray-300 p-3 rounded-lg">
          <div className="flex justify-center">
            <Image
              src={IMAGES.HACKS1}
              alt="Health hacks"
              className="w-24 h-24 object-cover"
            />
            <div className="ml-2">
              <h3 className="font-bold text-sm">
                Life Hacks for Healthy Eating
              </h3>
              <ul className="ml-5 mt-3 text-xs list-disc leading-6">
                <li>Tips for healthy eating</li>
                <li>Healthy food hacks at home</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 p-3 rounded-lg">
          <div className="flex justify-center">
            <Image
              src={IMAGES.HACKS2}
              alt="Health hacks"
              className="w-24 h-24 object-cover"
            />
            <div className="ml-2">
              <h3 className="font-bold text-sm">
                Life Hacks for Healthy Eating
              </h3>
              <ul className="ml-5 mt-3 text-xs list-disc leading-6">
                <li>Tips for healthy eating</li>
                <li>Healthy food hacks at home</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 p-3 rounded-lg">
          <div className="flex justify-center">
            <Image
              src={IMAGES.HACKS3}
              alt="Health hacks"
              className="w-24 h-24 object-cover"
            />
            <div className="ml-2">
              <h3 className="font-bold text-sm">
                Life Hacks for Healthy Eating
              </h3>
              <ul className="ml-5 mt-3 text-xs list-disc leading-6">
                <li>Tips for healthy eating</li>
                <li>Healthy food hacks at home</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthHacks;
