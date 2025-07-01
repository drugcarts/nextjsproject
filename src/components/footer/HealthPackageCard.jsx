"use client";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { IMAGES } from "@/components/common/images";

const HealthPackageCard = () => {
        const router = useRouter();
        const articleClick = (url) => {
            router.push(`/health-article-details/${url}`)
          }

    return (
        <section className="max-w-7xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image src={IMAGES.ARTICLES} alt="Weight Loss Tips" className="w-full h-80 object-contain" />
                    <button className='text-center bg-green-800 p-2 w-full text-white font-bold'>Send Your Enquiry</button>
                </div>
            </div>
        </section>
    )
}

export default HealthPackageCard;