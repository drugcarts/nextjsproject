"use client";

import dynamic from "next/dynamic";

const CustomerSaying = dynamic(
  () => import("@/components/home/CustomerSaying"),
  {
    loading: () => <p className="text-center">Loading testimonials...</p>,
  }
);

const ServiceGroup = dynamic(() => import("@/components/home/ServiceGroup"));

export default function ClientAboutExtras() {
  return (
    <>
      <div className="bg-[#FFEDF2] rounded-md py-4 my-5">
        <ServiceGroup />
        <p className="text-center py-6 w-[50%] mx-auto">
          DrugCarts brings all services to a single digital platform, connecting
          multiple services with just one click.
        </p>
      </div>

      <CustomerSaying />
    </>
  );
}
