"use client";
import Image from "next/image";
import { IMAGES } from "../common/images";

const DownloadAppCard = () => {
    return (
        <>
            <h2 className="text-xl font-bold my-5 text-center">
                Download Our Application
            </h2>
            <div className="border-2 p-3">
                <Image
                    priority
                    src={IMAGES.APPSTORE}
                    alt="call us"
                    className="w-26 object-cover my-5"
                />
                <Image
                    priority
                    src={IMAGES.APPGOOGLEPAY}
                    alt="call us"
                    className="w-26 object-cover"
                />
            </div></>
    )
}

export default DownloadAppCard