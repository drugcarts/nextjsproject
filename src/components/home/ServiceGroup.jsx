import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const services = [
  {
    src: IMAGES.SHIPPING,
    alt: "Order Medicine Online - Fast Home Delivery",
    title: "Order Medicine",
    label: "Order Medicine",
  },
  {
    src: IMAGES.CUSTOMER,
    alt: "Professional At-home Nursing Services",
    title: "Nursing Service",
    label: "Nursing Service",
  },
  {
    src: IMAGES.ANTHROPOLOGY,
    alt: "Physiotherapy Treatments at Home",
    title: "Physiotherapy",
    label: "Physiotherapy",
  },
  {
    src: IMAGES.DRUGSTORE,
    alt: "Local Clinic Services and Consultation",
    title: "Clinic Service",
    label: "Clinic Service",
  },
  {
    src: IMAGES.EMERGENCY,
    alt: "24/7 Emergency Care Support",
    title: "Emergency Care",
    label: "Emergency care",
  },
];

const ServiceGroup = () => {
  return (
    <section className="mt-3" aria-label="Healthcare Services">
      <div className="p-2 font-bold mb-2 mt-2 text-center text-lg">
        <h1>Our Service and Care </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-3 px-2 md:px-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            role="listitem"
          >
            <figure className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                priority
                src={service.src}
                alt={service.alt}
                title={service.title}
                width={48}
                height={48}
              />
            </figure>
            <figcaption className="mt-2 text-sm font-bold text-gray-700 text-center">
              {service.label}
            </figcaption>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceGroup;
