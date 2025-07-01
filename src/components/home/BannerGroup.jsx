// @components/home/bannerGroup.jsx
import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const BannerGroup = () => {
  return (
    <section className="mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Image
          priority
          src={IMAGES.AROMA}
          alt="Aroma Care products for relaxation and wellness"
          title="Aroma Care - Relaxation and Wellness"
          className="mx-auto object-cover w-full md:w-96"
        />
        <Image
          priority
          src={IMAGES.LABTEST1}
          alt="At-home lab testing services and diagnostics"
          title="Lab Test Services"
          className="mx-auto object-cover md:w-96 w-full"
        />
        <Image
          priority
          src={IMAGES.HEALTHCAREBANNER}
          alt="Health care solutions for every need"
          title="Comprehensive Health Care"
          className="mx-auto object-cover md:w-96 w-full"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 justify-items-center">
        <Image
          priority
          src={IMAGES.AYURVEDICBANNER}
          alt="Traditional Ayurvedic wellness treatments"
          title="Ayurvedic Care"
          className="mx-auto object-cover w-full md:w-96 h-full"
        />
        <Image
          priority
          src={IMAGES.SPECIALCAREBANNER}
          alt="Special care for chronic and sensitive health conditions"
          title="Special Care Solutions"
          className="mx-auto object-cover w-full md:w-96 h-full"
        />
        <Image
          priority
          src={IMAGES.EYECAREBANNER}
          alt="Eye care products and vision health solutions"
          title="Eye Care and Vision Health"
          className="mx-auto object-cover w-full md:w-96 h-full"
        />
      </div>
    </section>
  );
};

export default BannerGroup;
