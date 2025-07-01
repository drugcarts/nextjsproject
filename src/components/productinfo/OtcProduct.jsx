// Remove "use client" if not needed
import { IMAGES } from "@/components/common/images";
import Image from "next/image";

const OtcProduct = () => {
  return (
    <>
      <h1 className="text-2xl font-bold my-5 text-center">OTC Product</h1>
      <section className="border-2 p-2 text-center">
        <article>
          <Image
            src={IMAGES.CERTIFICATE}
            alt="Certificate of Genuine Anti Cancer Product"
            priority
            className="w-20 mx-auto"
          />
          <h2 className="font-bold text-sm">Genuine Product</h2>
        </article>
        <hr />
        <article>
          <Image
            src={IMAGES.MONEY}
            alt="Best Offers on Anti Cancer Medicine"
            priority
            className="w-20 mx-auto"
          />
          <h2 className="font-bold text-sm">Best Offers and Discounts</h2>
        </article>
        <hr />
        <article>
          <Image
            src={IMAGES.DELIVERY}
            alt="Door Step Delivery of Anti Cancer Medicine"
            priority
            className="w-20 mx-auto"
          />
          <h2 className="font-bold text-sm">Door Step Delivery</h2>
        </article>
      </section>
    </>
  );
};

export default OtcProduct;
