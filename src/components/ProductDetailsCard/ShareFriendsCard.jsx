"use client";
import Image from "next/image";
import { IMAGES } from "../common/images";

const ShareFriendsCard = () => {
  return (
    <>
    <h2 className="text-xl font-bold my-5 text-center">
              Share With Your Friends
            </h2>
            <div className="border-2 text-[14px]">
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.WHATSAPP}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Whatsapp</h3>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.FACEBOOK}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Facebook</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.INSTAGRAM}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Instagram</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.PINTEREST}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Pinterest</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.LINKEDIN}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Linkedin</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.TELEGRAM}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Telegram</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.TWITTER}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Twitter</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.VIMEO}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Vimeo</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image
                  src={IMAGES.YOUTUBE}
                  alt="Whatsapp"
                  className="w-6 md:w-10"
                />
                <h3 className="text-center font-bold">Youtube</h3>
                <div className="border-2"></div>
              </div>
            </div>
        </>
  )
}

export default ShareFriendsCard