"use client";
import { IMAGES } from "@/components/common/images";
import Image from "next/image";
import Link from "next/link";

const RightOurService = () => {
  return (
    <>
      <div className="text-sm my-8">
                <div className="text-center bg-[#4C4C95] p-2 border-b-2 px-4">
                  <h2 className="text-xl text-white font-bold ps-7">
                    Our Service
                  </h2>
                </div>
                <div className="p-2 border-b-2 px-4">
                  <Link href="/nursing" className="flex items-center justify-start gap-2">
                    <Image
                      src={IMAGES.NURSECARE}
                      alt="Nurse Care at home"
                      priority
                      className="w-10 bg-white"
                    />
                    <h2 className="text-md font-bold ps-7">
                      Nurse Care at home
                    </h2>
                  </Link>
                </div>
                <div className="p-2 border-b-2 px-4">
                  <Link href="/" className="flex items-center justify-start gap-2">
                    <Image
                      src={IMAGES.ELDERCARE}
                      alt="Elder Care at home"
                      priority
                      className="w-10 bg-white"
                    />
                    <h2 className="text-md font-bold ps-7">
                      Elder Care at home
                    </h2>
                  </Link>
                </div>
                <div className="p-2 border-b-2 px-4">
                  <Link href="/" className="flex items-center justify-start gap-2">
                    <Image
                      src={IMAGES.DIAGNOSTIC}
                      alt="Diagnostic at home"
                      priority
                      className="w-10 bg-white"
                    />
                    <h2 className="text-md font-bold ps-7">
                      Diagnostic at home
                    </h2>
                  </Link>
                </div>
                <div className="p-2 border-b-2 px-4">
                  <Link href="/" className="flex items-center justify-start gap-2">
                    <Image
                      src={IMAGES.DOCTOR}
                      alt="Doctor Consultations"
                      priority
                      className="w-10 bg-white"
                    />
                    <h2 className="text-md font-bold ps-7">
                      Doctor Consultations
                    </h2>
                  </Link>
                </div>
                <div className="p-2 border-b-2 px-4">
                  <Link href="/" className="flex items-center justify-start gap-2">
                    <Image
                      src={IMAGES.MEDICAL}
                      alt="Medical Equipment"
                      priority
                      className="w-10 bg-white"
                    />
                    <h2 className="text-md font-bold ps-7">
                      Medical Equipment
                    </h2>
                  </Link>
                </div>
              </div>
    </>
  );
};

export default RightOurService;
