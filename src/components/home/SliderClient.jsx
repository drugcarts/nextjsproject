"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IMAGES } from "@/components/common/images";

const SliderClient = ({ slides }) => {
  return (
    <>
      <section className="px-5 md:px-0 z-10">
        <div className="container mx-auto">
          <div className="bg-gray-100 py-2">
            <div className="flex flex-wrap pl-8 md:pl-14">
              <div className="p-1 w-full md:w-1/3 lg:w-1/5">
                <div className="flex">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 text-white my-auto rounded-3xl bg-bgcolor p-1 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 22L1.25192 18.6279C1.08766 18.3815 1 18.092 1 17.7958V13.25C1 12.5596 1.55964 12 2.25 12C2.94036 12 3.5 12.5596 3.5 13.25V16.0211C3.5 16.1162 3.52712 16.2093 3.57817 16.2895L3.79872 16.6361M5.44444 19.2222L3.79872 16.6361M8.22222 21.9999V19.4235C8.22222 18.93 8.07612 18.4474 7.80234 18.0368L6.79337 16.5233C6.34922 15.8571 5.46013 15.6572 4.77355 16.0691L3.79872 16.6361M20.7223 22L22.782 18.6088C22.9246 18.3741 23 18.1048 23 17.8301V13.2499C23 12.5596 22.4404 12 21.7501 12C21.0598 12 20.5001 12.5596 20.5001 13.2499V16.0211C20.5001 16.1162 20.473 16.2093 20.422 16.2895L20.4166 16.298M18.5557 19.2222L20.4166 16.298M16 22V19.0903C16 18.5967 16.1461 18.1142 16.4199 17.7035L17.4289 16.1901C17.873 15.5238 18.7621 15.3239 19.4487 15.7359L20.4166 16.298M12.9999 2C13.5521 2 13.9999 2.44772 13.9999 3V5.90014C13.9999 5.95536 14.0446 6.00013 14.0999 6.00013L17 6.00014C17.5523 6.00014 18 6.44785 18 7.00014V9.00013C18 9.55242 17.5523 10.0001 17 10.0001H14.0999C14.0446 10.0001 13.9999 10.0449 13.9999 10.1001V13C13.9999 13.5523 13.5521 14 12.9999 14H10.9999C10.4476 14 9.99985 13.5523 9.99985 13V10.1001C9.99985 10.0449 9.95508 10.0001 9.89985 10.0001H7.00005C6.44776 10.0001 6.00005 9.55242 6.00005 9.00013V7.00013C6.00005 6.44785 6.44776 6.00013 7.00005 6.00013L9.89985 6.00013C9.95508 6.00013 9.99985 5.95536 9.99985 5.90014V3C9.99985 2.44771 10.4476 2 10.9999 2H12.9999Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="pl-3 my-auto">
                    <h2 className="text-bgcolor text-sm font-medium">
                      Medicine
                    </h2>
                    <p className="text-xs">Over 25000 product</p>
                  </div>
                </div>
              </div>
              <div className="p-1 w-full md:w-1/3 lg:w-1/5">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 my-auto text-white rounded-2xl bg-bgcolor p-1 overflow-hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <div className="pl-3">
                    <h2 className="text-bgcolor text-sm font-medium">
                      Welness
                    </h2>
                    <p className="text-xs">Health Product</p>
                  </div>
                </div>
              </div>
              <div className="p-1 w-full md:w-1/3 lg:w-1/5">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 text-white my-auto rounded-3xl bg-bgcolor p-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                  <div className="pl-3 my-auto">
                    <h2 className="text-bgcolor text-sm font-medium">
                      Diagnostic
                    </h2>
                    <p className="text-xs">Book test & checkups</p>
                  </div>
                </div>
              </div>
              <div className="p-1 w-full md:w-1/3 lg:w-1/5">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 text-white my-auto rounded-3xl bg-bgcolor p-1"
                  >
                    <path
                      d="M12 20V20.0318M9.5 4H14.5M7 1H17C17.5523 1 18 1.44772 18 2V22C18 22.5523 17.5523 23 17 23H7C6.44772 23 6 22.5523 6 22V2C6 1.44772 6.44772 1 7 1ZM13.8523 8.85409C13.8523 9.87808 13.0222 10.7082 11.9982 10.7082C10.9743 10.7082 10.1442 9.87808 10.1442 8.85409C10.1442 7.8301 10.9743 7 11.9982 7C13.0222 7 13.8523 7.8301 13.8523 8.85409ZM7.88 16.7974C7.90221 14.5409 9.73829 12.7186 12 12.7186C14.2617 12.7186 16.0978 14.5409 16.12 16.7974C16.1202 16.8202 16.1018 16.8388 16.079 16.8388H7.921C7.89824 16.8388 7.87978 16.8202 7.88 16.7974Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="pl-3 my-auto">
                    <h2 className="text-bgcolor text-sm font-medium">
                      Health Corner
                    </h2>
                    <p className="text-xs">Trending for health experts</p>
                  </div>
                </div>
              </div>
              <div className="p-1 w-full md:w-1/3 lg:w-1/5">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 text-white my-auto rounded-3xl bg-bgcolor p-1"
                  >
                    <path
                      d="M8.00006 16.1556C8.0567 17.1333 8.65299 19.2845 10.585 20.0667M11.5527 1.89444L5.91936 13.1613C3.65925 17.6816 6.94624 23 12 23C17.0538 23 20.3408 17.6815 18.0807 13.1613L12.4472 1.89443C12.2629 1.52591 11.737 1.52591 11.5527 1.89444Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="pl-3 my-auto">
                    <h2 className="text-bgcolor text-sm font-medium">Others</h2>
                    <p className="text-xs">More Info</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 md:px-0 mt-3 mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-[70%]">
            {slides.length > 0 && (
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="rounded-lg shadow-lg w-[95%] h-[220px] md:h-[350px]"
              >
                {slides.map((slide, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={
                        slide?.slide_image
                          ? `https://assets1.drugcarts.com/admincolor/homepage/slider/${slide?.slide_image}`
                          : IMAGES.NO_IMAGE
                      }
                      alt="Drugcarts - Find best medicines and healthcare products online|Drugcarts.com"
                      className="rounded-lg h-[220px] md:h-[350px] w-full"
                      width={500}
                      height={100}
                      priority
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="w-full md:w-[30%]">
            <Image
              priority
              src={IMAGES.TOP}
              alt="Drugcarts Banner top"
              className="w-full h-50 md:h-[165px] mt-4 md:mt-0 mb-4 md:mb-4 rounded-md px-3"
            />
            <Image
              priority
              src={IMAGES.TOP1}
              alt="Drugcarts Banner Bottom"
              className="w-full h-50 md:h-[165px] rounded-md px-3"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SliderClient;
