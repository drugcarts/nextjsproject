"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="mt-3">
        <section className="bg-[#B7084B]">
          <div className="flex flex-wrap mx-auto p-4 justify-center items-center">
            <div className="w-full md:w-3/12 text-center pb-5">
              <h4 className="text-white text-2xl pb-3">
                We offer 24/7 dedicated support
              </h4>
              <p className="text-white text-sm">
                If you need support send us a message
              </p>
            </div>
            <div className="w-full md:w-3/12 mx-auto text-center pb-5">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Enter your Email"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                  className="w-6/6 md:w-[70%] px-1 py-2 h-10 border-red-100 text-gray-700 focus:outline-none rounded-l"
                />
                <button
                  // onClick={handleSearch}
                  className="flex items-center h-10 justify-center bg-green-500 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1607_8161)">
                      <path
                        d="M14 7.5L18 12M18 12L14 16.5M18 12H6M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full md:w-3/12 text-center pb-5">
              <div className="flex justify-center items-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" bg-white p-2 rounded-full"
                >
                  <g clipPath="url(#clip0_1607_9704)">
                    <path
                      d="M16.1615 4.47768L17.1911 3.96323C17.2576 3.92998 17.3359 3.97833 17.3359 4.05267V7.41171M19.5449 4.49159L20.5745 3.97715C20.6411 3.9439 20.7193 3.99225 20.7193 4.06659V7.42563M14.1723 4.67325V4.76419C14.1723 4.86541 14.1518 4.96559 14.1118 5.05863L13.0503 7.53391M1.01603 7.59069C1.45287 19.4854 10.704 23.132 16.5943 22.9964C17.0726 22.9854 17.4503 22.6087 17.501 22.1334L17.9142 18.2568C17.9694 17.7391 17.6178 17.2657 17.106 17.1684L14.1605 16.609C13.7337 16.5279 13.3033 16.7313 13.0952 17.1124L12.3677 18.4449C12.3443 18.4877 12.2935 18.5075 12.2475 18.4914C9.55942 17.5536 7.07029 15.8464 5.42068 12.0042C5.40112 11.9587 5.4179 11.905 5.46027 11.8792L6.84406 11.0371C7.20592 10.817 7.38981 10.3929 7.30315 9.9785L6.66065 6.90578C6.55375 6.39457 6.0712 6.05164 5.55289 6.11856L1.87247 6.59368C1.3735 6.65809 0.99758 7.08827 1.01603 7.59069ZM12.6974 12.7449L12.6943 10.4332C12.6943 10.378 12.6495 10.3333 12.5943 10.3333H10.9355C10.4223 10.3333 10.0063 9.9176 10.0063 9.40477V1.92857C10.0063 1.41574 10.4223 1 10.9355 1L22.0862 1C22.5994 1 23.0154 1.41574 23.0154 1.92857V9.40476C23.0154 9.9176 22.5994 10.3333 22.0862 10.3333L17.3609 10.3333C17.3341 10.3333 17.3085 10.344 17.2897 10.363L14.2873 13.3966C13.7039 13.9861 12.6986 13.574 12.6974 12.7449ZM14.1724 4.73075C14.1724 5.24679 13.7537 5.66512 13.2373 5.66512C12.7209 5.66512 12.3023 5.24679 12.3023 4.73075C12.3023 4.21472 12.7209 3.79639 13.2373 3.79639C13.7537 3.79639 14.1724 4.21472 14.1724 4.73075Z"
                      stroke="green"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>

                <p className="pl-1 text-center text-lg font-bold text-white">
                  +91 98303 43433
                </p>
              </div>
            </div>
            <div className="w-full md:w-3/12 text-center pb-2">
              <h5 className="text-center justify-center font-bold pb-3 text-white">
                Our Social Media
              </h5>
              <div className="flex gap-1 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 50 50"
                  width="32px"
                  height="32px"
                >
                  <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23c12.683,0,23-10.317,23-23S37.683,2,25,2z M32,16h-3.29 C26.772,16,26,16.455,26,17.806V21h6l-1,5h-5v13h-6V26h-3v-5h3v-2.774C20,14.001,21.686,11,26.581,11C29.203,11,32,12,32,12V16z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 30 30"
                  width="32px"
                  height="32px"
                >
                  <path d="M 15 2 C 7.832 2 2 7.832 2 15 C 2 22.168 7.832 28 15 28 C 22.168 28 28 22.168 28 15 C 28 7.832 22.168 2 15 2 z M 11.666016 6 L 18.332031 6 C 21.457031 6 24 8.5420156 24 11.666016 L 24 18.332031 C 24 21.457031 21.457984 24 18.333984 24 L 11.667969 24 C 8.5429688 24 6 21.457984 6 18.333984 L 6 11.667969 C 6 8.5429688 8.5420156 6 11.666016 6 z M 11.666016 8 C 9.6450156 8 8 9.6459688 8 11.667969 L 8 18.333984 C 8 20.354984 9.6459688 22 11.667969 22 L 18.333984 22 C 20.354984 22 22 20.354031 22 18.332031 L 22 11.666016 C 22 9.6450156 20.354031 8 18.332031 8 L 11.666016 8 z M 19.667969 9.6660156 C 20.035969 9.6660156 20.333984 9.9640312 20.333984 10.332031 C 20.333984 10.700031 20.035969 11 19.667969 11 C 19.299969 11 19 10.700031 19 10.332031 C 19 9.9640312 19.299969 9.6660156 19.667969 9.6660156 z M 15 10 C 17.757 10 20 12.243 20 15 C 20 17.757 17.757 20 15 20 C 12.243 20 10 17.757 10 15 C 10 12.243 12.243 10 15 10 z M 15 12 A 3 3 0 0 0 15 18 A 3 3 0 0 0 15 12 z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 50 50"
                  width="32px"
                  height="32px"
                >
                  <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M36.237,20.524 c0.01,0.236,0.016,0.476,0.016,0.717C36.253,28.559,30.68,37,20.491,37c-3.128,0-6.041-0.917-8.491-2.489 c0.433,0.052,0.872,0.077,1.321,0.077c2.596,0,4.985-0.884,6.879-2.37c-2.424-0.044-4.468-1.649-5.175-3.847 c0.339,0.065,0.686,0.1,1.044,0.1c0.505,0,0.995-0.067,1.458-0.195c-2.532-0.511-4.441-2.747-4.441-5.432c0-0.024,0-0.047,0-0.07 c0.747,0.415,1.6,0.665,2.509,0.694c-1.488-0.995-2.464-2.689-2.464-4.611c0-1.015,0.272-1.966,0.749-2.786 c2.733,3.351,6.815,5.556,11.418,5.788c-0.095-0.406-0.145-0.828-0.145-1.262c0-3.059,2.48-5.539,5.54-5.539 c1.593,0,3.032,0.672,4.042,1.749c1.261-0.248,2.448-0.709,3.518-1.343c-0.413,1.292-1.292,2.378-2.437,3.064 c1.122-0.136,2.188-0.432,3.183-0.873C38.257,18.766,37.318,19.743,36.237,20.524z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 50 50"
                  width="32px"
                  height="32px"
                >
                  <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 50 50"
                  width="32px"
                  height="32px"
                >
                  <path d="M25,2C12.3178711,2,2,12.3178711,2,25c0,9.8841553,6.2675781,18.3302612,15.036377,21.5769653	c-0.2525635-2.2515869-0.2129517-5.9390259,0.2037964-7.7243652c0.3902588-1.677002,2.5212402-10.6871338,2.5212402-10.6871338	s-0.6433105-1.2883301-0.6433105-3.1911011c0-2.9901733,1.7324219-5.2211914,3.8898315-5.2211914	c1.8349609,0,2.7197876,1.3776245,2.7197876,3.0281982c0,1.8457031-1.1734619,4.6026611-1.78125,7.1578369	c-0.506897,2.1409302,1.0733643,3.8865356,3.1836548,3.8865356c3.821228,0,6.7584839-4.0296021,6.7584839-9.8453369	c0-5.147583-3.697998-8.7471924-8.9795532-8.7471924c-6.1167603,0-9.7072754,4.588562-9.7072754,9.3309937	c0,1.8473511,0.7111816,3.8286743,1.6000977,4.9069824c0.175293,0.2133179,0.2009277,0.3994141,0.1488647,0.6160278	c-0.1629028,0.678894-0.5250854,2.1392822-0.5970459,2.4385986c-0.0934448,0.3944702-0.3117676,0.4763184-0.7186279,0.2869263	c-2.685791-1.2503052-4.364502-5.1756592-4.364502-8.3295898c0-6.7815552,4.9268188-13.0108032,14.206543-13.0108032	c7.4588623,0,13.2547607,5.3138428,13.2547607,12.4179077c0,7.4100342-4.6729126,13.3729858-11.1568604,13.3729858	c-2.178894,0-4.2263794-1.132019-4.9267578-2.4691772c0,0-1.0783081,4.1048584-1.3404541,5.1112061	c-0.4524536,1.7404175-2.3892822,5.3460083-3.3615723,6.9837036C20.1704712,47.6074829,22.5397949,48,25,48	c12.6826172,0,23-10.3173828,23-23C48,12.3178711,37.6826172,2,25,2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 50 50"
                  width="32px"
                  height="32px"
                >
                  <path d="M 25 3 C 12.85 3 3 12.85 3 25 C 3 37.15 12.85 47 25 47 C 37.15 47 47 37.15 47 25 C 47 12.85 37.15 3 25 3 z M 25 11 C 32.72 11 39 17.28 39 25 C 39 32.72 32.72 39 25 39 C 17.28 39 11 32.72 11 25 C 11 17.28 17.28 11 25 11 z M 25 13 C 18.383 13 13 18.383 13 25 C 13 31.617 18.383 37 25 37 C 31.617 37 37 31.617 37 25 C 37 18.383 31.617 13 25 13 z M 22.019531 18.501953 C 22.194031 18.505203 22.366984 18.552484 22.521484 18.646484 L 31.521484 24.146484 C 31.817484 24.327484 32 24.651 32 25 C 32 25.349 31.818484 25.671516 31.521484 25.853516 L 22.521484 31.353516 C 22.361484 31.450516 22.181 31.5 22 31.5 C 21.832 31.5 21.663719 31.456094 21.511719 31.371094 C 21.195719 31.194094 21 30.861 21 30.5 L 21 19.5 C 21 19.139 21.195719 18.805906 21.511719 18.628906 C 21.670219 18.540906 21.845031 18.498703 22.019531 18.501953 z" />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#FFE5EF]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 px-10 gap-2">
              <div className="py-3">
                <h3 className="text-xl pb-4 font-bold">Company</h3>
                <ul className="list-none leading-8 text-sm">
                  <li>
                    <Link href={"/about-us"}>About Drugcarts</Link>
                  </li>
                  <li>
                    <Link href={"/needhelp"}>Need Help</Link>
                  </li>
                  <li>
                    <Link href={"/feedback"}>Feedback</Link>
                  </li>
                  <li>
                    <Link href={"/contactus"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link href={"/promotion"}>Promotion</Link>
                  </li>
                  <li>
                    <Link href={"/prescription-upload"}>Prescription</Link>
                  </li>
                  <li>
                    <Link href={"/franchise"}>Franchise</Link>
                  </li>
                  <li>
                    <Link href={"/storelocator"}>Store Locator</Link>
                  </li>
                </ul>
              </div>
              <div className="py-3">
                <h3 className="text-xl pb-4 font-bold">Categories</h3>
                <ul className="list-none leading-8 text-sm">
                  <li>
                    <Link href={"/ayush"}>Ayush</Link>
                  </li>
                  <li>
                    <Link href={"/health-store"}>Healthstore</Link>
                  </li>
                  <li>
                    <Link href={"/medicine"}>Medicine</Link>
                  </li>
                  <li>
                    <Link href={"/health-care-devices"}>Healthcare Device</Link>
                  </li>
                  <li>
                    <Link href={"/generic-molecule-index"}>
                      Generic Molecule Index
                    </Link>
                  </li>
                  <li>
                    <Link href={"/manufacturer-list"}>Manufacturer List</Link>
                  </li>
                </ul>
              </div>
              <div className="py-3">
                <h3 className="text-xl pb-4 font-bold">Our Policies</h3>
                <ul className="list-none leading-8 text-sm">
                  <li>
                    <Link href={"/terms-and-conditions"}>
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href={"/privacy-policy"}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href={"/cancellation-return-refund-policy"}>
                      Cancellation & Refund
                    </Link>
                  </li>
                  <li>
                    <Link href={"/shipping-policy"}>Shipping Policy</Link>
                  </li>
                  <li>
                    <Link href={"/intellectual-policy"}>
                      Intelectual Policy
                    </Link>
                  </li>
                  <li>
                    <Link href={"/editorial-policy"}>Editorial Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="py-3">
                <h3 className="text-xl pb-4 font-bold">Our Service</h3>
                <ul className="list-none leading-8 text-sm">
                  <li>
                    <Link href={"/medicine"}>Order Medicine</Link>
                  </li>
                  <li>
                    <Link href={"/nursing"}>Nursing</Link>
                  </li>
                  <li>
                    <Link href={"/physiotherapist"}>Physiotherapist</Link>
                  </li>
                  <li>
                    <Link href={"/lab-test"}>Book Lab Test</Link>
                  </li>
                  <li>
                    <Link href={"/specialty"}>Doctor Consult</Link>
                  </li>
                  <li>
                    <Link href={"/services"}>Our Services</Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2 py-3">
                <h3 className="text-xl pb-4 font-bold">
                  Over Payment Partners
                </h3>
                <div className="flex gap-1">
                  <Image
                    priority
                    src={IMAGES.GOOGLEPAY}
                    alt="Google Pay"
                    className="w-12 h-12"
                    width={0}
                    height={0}
                  />
                  <Image
                    priority
                    src={IMAGES.MASTERCARD}
                    alt="Master Card"
                    className="w-12 h-12"
                    width={0}
                    height={0}
                  />
                  <Image
                    priority
                    src={IMAGES.VISA}
                    alt="Visa"
                    className="w-12 h-12"
                    width={0}
                    height={0}
                  />
                  <Image
                    priority
                    src={IMAGES.RUPAY}
                    alt="Rypay"
                    className="w-12 h-12"
                    width={0}
                    height={0}
                  />
                </div>
                <h3 className="text-xl pb-4 pt-5 font-bold">Download App</h3>
                <div className="flex gap-3">
                  {/* <Image
                  priority
                  src={IMAGES.APPSTORE}
                  alt="App Store"
                  className="w-26 object-cover"
                />
                <Image
                  priority
                  src={IMAGES.APPGOOGLEPAY}
                  alt="App Google Pay"
                  className="w-26 object-cover"
                /> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#FFE5EF]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-sm ml-5 mr-5">
              <div className="flex my-auto row-span-2 justify-center items-center">
                <h1 className="font-bold">Our Awareness</h1>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/health-video"}> Health Video </Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/health-article"}> Health Article</Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/health-news"}>Health News</Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/health-packages"}>Health Package</Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/blog"}>Our Blogs</Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/daily-health-tips"}>Daily Health Tips</Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/infographics"}>Infographics</Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/lab-test-information"}>
                    Lab Test Information
                  </Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/herbs"}>Know about Herbs</Link>
                </button>
              </div>
              <div className="flex my-auto justify-center">
                <button className="w-full bg-white py-2 px-6 rounded-md text-bgcolor font-bold">
                  <Link href={"/know-about-diseases"}>
                    {" "}
                    Know about Diseases
                  </Link>
                </button>
              </div>
            </div>
            <p className="text-xs p-8 px-2 md:px-20 font-bold text-center">
              Copyright @ 2025 Drugcarts. All rights reserved. In compliance
              with Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules
              1945, we don't process requests for Schedule X and other habit
              forming drugs.
            </p>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
