"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import OverallRating from "../common/OverallRating";

const CustomerSaying = ({ feedbackList }) => {
  return (
    <>
      <div className="container mx-auto bg-bgwhy rounded-md p-5 my-3">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-8 justify-center gap-5">
          <div className="mx-auto">
            <h1 className="font-bold text-3xl text-black text-center mb-6">
              Why Choose Us ?
            </h1>
            <Image
              src={IMAGES.LOGO}
              alt="Drugcarts Logo"
              className="object-cover w-42 px-8 rounded-md"
            />
          </div>
          <div className="justify-items-center">
            <Image
              src={IMAGES.STAR}
              alt="Star"
              className="w-32 h-32 object-cover"
            />
            <h2 className="font-bold p-3">4.5</h2>
            <h2 className="text-orange-600 text-xl font-bold">
              Outstanding Work
            </h2>
          </div>
          <div className="justify-items-center">
            <Image
              src={IMAGES.STORE}
              alt="Star"
              className="w-32 h-32 object-cover"
            />
            <h2 className="font-bold  p-3">1000+</h2>
            <h3 className="text-blue-600 text-xl font-bold">Offline Store</h3>
          </div>
          <div className="justify-items-center">
            <Image
              src={IMAGES.ONLINE}
              alt="Star"
              className="w-32 h-32 object-cover"
            />
            <h2 className="font-bold  p-3">20000+</h2>
            <h3 className="text-bgcolor text-xl font-bold">Happy Customer</h3>
          </div>
        </div>
      </div>
      <div className="container mx-auto rounded-md">
        <h1 className="font-bold text-lg md:text-2xl text-black mb-6 mt-5">
          What Customer Saying About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-8 justify-center gap-5">
          {feedbackList &&
            feedbackList?.map((feedback, i) => (
              <div
                className="justify-items-center bg-becustomer text-white"
                key={i}
              >
                <Image
                  src={IMAGES.CUSTOMERPIC}
                  alt="Star"
                  className="w-full h-48 p-3 object-cover"
                />
                <h2 className="text-xl">{feedback?.username}</h2>
                <p className="my-2">{feedback?.ratingStatus}</p>
                <div className="flex justify-center mt-1 mb-6">
                  <OverallRating rating={feedback?.rating} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CustomerSaying;
