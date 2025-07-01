import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const featuredPackages = [
  {
    src: IMAGES.SEASONAL,
    alt: "Seasonal Health Package for Immunity Boost",
    title: "Seasonal Package",
  },
  {
    src: IMAGES.LABPACKAGE,
    alt: "Complete Lab Testing Package at Home",
    title: "Lab Package",
  },
  {
    src: IMAGES.TESTKIT,
    alt: "At-Home Diagnostic Test Kit",
    title: "Test Kit",
  },
  {
    src: IMAGES.WOMEN,
    alt: "Women's Health and Wellness Package",
    title: "Package for Women",
  },
  {
    src: IMAGES.BABYCARE,
    alt: "Comprehensive Baby Care Health Package",
    title: "Baby Care",
  },
  {
    src: IMAGES.SPECIALFCARE,
    alt: "Special Care for Chronic Conditions",
    title: "Special Care",
  },
  {
    src: IMAGES.CLINICCARE,
    alt: "Clinic Care Services and Checkups",
    title: "Clinic Care",
  },
  {
    src: IMAGES.DRUGPACKAGE,
    alt: "Affordable Drugcarts Package Deals",
    title: "Drugcarts Package",
  },
];

const FeaturedPackage = () => {
  return (
    <section className="mt-3" aria-label="Featured Healthcare Packages">
      <div className="p-2 font-semibold mb-5 mt-10 text-lg bg-gray-100">
        <h1>Featured Care & Package</h1>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 px-2 md:px-20 my-5"
        role="list"
      >
        {featuredPackages.map((pkg, index) => (
          <figure key={index} role="listitem" className="m-3">
            <Image
              src={pkg.src}
              alt={pkg.alt}
              title={pkg.title}
              width={384} // w-96 in Tailwind is 384px
              height={256} // adjust height based on image aspect ratio
              className="w-96 h-full object-cover rounded-lg"
            />
            <figcaption className="text-sm text-center mt-1 text-gray-700 font-bold">
              {pkg.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPackage;
