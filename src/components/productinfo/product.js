'use client';
import Image from 'next/image';
import Link from 'next/link';
import { IMAGES } from '../common/images';
import Feedback from '@/components/home-page/feedback';

const Product = () => {
  return (
    <>
      <section className="px-4 mt-3">
        <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-500 ">
          <Link href="#" className="hover:text-gray-700">Home</Link>
          <span>&gt;</span>
          <Link href="#" className="hover:text-gray-700">Order Medicine</Link>
          <span>&gt;</span>
          <Link href="#" className="hover:text-gray-700">Cold Cough</Link>
          <span>&gt;</span>
          <Link href="#" className="hover:text-gray-700">Common Cold</Link>
          <span>&gt;</span>
          <Link href="#" className="hover:text-gray-700">Caffeine + Cetirizine + Paracetamol</Link>
        </div>
      </section>
      <section className="px-3 mt-3">
        <section className='px-5 mt-3 bg-[#F9F9F9] p-10'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto'>
            <div className='bg-white p-3 rounded-md'>
              <Image priority src={IMAGES.HONITUS} alt="Product" className='mx-auto w-[300px]' />
              <div className='flex items-center justify-between mt-4 p-2'>
                <Image src={IMAGES.ALOVERA} alt="Product 1" className='w-20 border-2 border-gray-300' />
                <Image src={IMAGES.ALOVERA} alt="Product 1" className='w-20 border-2 border-gray-300' />
                <Image src={IMAGES.ALOVERA} alt="Product 1" className='w-20 border-2 border-gray-300' />
              </div>
            </div>
            <div className='p-1'>
              <p className='text-sm text-gray-500'>Anti Cancer</p>
              <h2 className='text-xl'>Eugebra L 75mg 40mg Capsule SR</h2>
              <div className="flex items-center mt-3">
                <span className="text-black font-bold mr-2">4.0</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-gray-500">&#9733;</span>
                <span className="text-black text-xs ml-1">(+2k reviews)</span>
              </div>
              <div className="flex items-center mt-3 gap-5">
                <h3 className='text-[#1877F2] font-bold text-lg line-through'>M.R.P : 95.00</h3>
                <h3 className='text-[#4CAF50] font-bold text-lg'>You save : &#8377; 7.50</h3>
              </div>
              <div className="flex items-center mt-3 gap-3">
                <h3 className='text-[#B7084B] font-bold text-lg md:text-2xl'>&#8377; 87.50</h3>
                <h3 className='text-md'>(inclusive of all taxes)</h3>
              </div>
              <div className="flex items-center mt-3 gap-3 bg-white p-3 w-76 md:w-80 rounded-lg">
                <h3 className='font-bold text-sm md:text-md'>Qty</h3>
                <div className='flex items-center text-sm md:text-md gap-5 bg-pink-100 px-2 py-[0.5px] rounded-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                  <p>3</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                </div>
                <p className='text-xs md:text-md'>10 Capsule(s) in Strip</p>
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <button className="bg-[#4CAF50] hover:bg-blue-600 text-white font-poppins font-semibold text-[12px] py-1 px-3 rounded shadow-md">
                  <div className="flex justify-center items-center gap-1">
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clipRule="evenodd" />
                    </svg>

                    <span className='text-md'>Add to cart</span>
                  </div>
                </button>
                <button className="bg-[#B7084B] hover:bg-blue-600 text-white font-poppins font-semibold text-[12px] py-1 px-4 rounded shadow-md">
                  <div className="flex justify-center items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className='text-md'>Buy Now</span>
                  </div>
                </button>
              </div>
              <div className='mt-5'>
                <h3 className='font-bold text-md'>Availability : <span className='text-[#B7084B]'>SOLD OUT</span></h3>
                <h3 className='text-md py-3'>Online Payment Only</h3>
                <h3>No Returnable <span className='text-[10px] text-gray-300'>Read more</span></h3>
                <h3 className='font-bold mt-2 text-xl'>Share</h3>
                <div className='flex flex-col md:flex-row gap-3 mt-2'>
                  <button className='flex items-center gap-1 border-2  py-1'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="text-[#4C4C95]"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23c12.683,0,23-10.317,23-23S37.683,2,25,2z M32,16h-3.29 C26.772,16,26,16.455,26,17.806V21h6l-1,5h-5v13h-6V26h-3v-5h3v-2.774C20,14.001,21.686,11,26.581,11C29.203,11,32,12,32,12V16z" />
                    </svg> <space className="text-[#4C4C95] text-[12px] pr-[3px]">Facebook</space>
                  </button>
                  <button className='flex items-center gap-1 border-2 py-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 50 50" width="20px" height="20px" className='text-[#4CAF50]'>
                      <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z" />
                    </svg>
                    <space className="text-[#4CAF50] text-[12px] pr-[3px]">Whatsapp</space>
                  </button>
                  <button className='flex items-center gap-1 border-2  py-1'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="text-[#F24E1E]"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5 S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z" />
                    </svg><span className="text-[#F24E1E] text-[12px] pr-[3px]">Pinterest</span>
                  </button>
                  <button className='flex items-center gap-1 border-2 py-1'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="text-[#1D9BF0]"
                      viewBox="0 0 50 50"
                      width="20px"
                      height="20px"
                    >
                      <path d="M25,2C12.3178711,2,2,12.3178711,2,25c0,9.8841553,6.2675781,18.3302612,15.036377,21.5769653	c-0.2525635-2.2515869-0.2129517-5.9390259,0.2037964-7.7243652c0.3902588-1.677002,2.5212402-10.6871338,2.5212402-10.6871338	s-0.6433105-1.2883301-0.6433105-3.1911011c0-2.9901733,1.7324219-5.2211914,3.8898315-5.2211914	c1.8349609,0,2.7197876,1.3776245,2.7197876,3.0281982c0,1.8457031-1.1734619,4.6026611-1.78125,7.1578369	c-0.506897,2.1409302,1.0733643,3.8865356,3.1836548,3.8865356c3.821228,0,6.7584839-4.0296021,6.7584839-9.8453369	c0-5.147583-3.697998-8.7471924-8.9795532-8.7471924c-6.1167603,0-9.7072754,4.588562-9.7072754,9.3309937	c0,1.8473511,0.7111816,3.8286743,1.6000977,4.9069824c0.175293,0.2133179,0.2009277,0.3994141,0.1488647,0.6160278	c-0.1629028,0.678894-0.5250854,2.1392822-0.5970459,2.4385986c-0.0934448,0.3944702-0.3117676,0.4763184-0.7186279,0.2869263	c-2.685791-1.2503052-4.364502-5.1756592-4.364502-8.3295898c0-6.7815552,4.9268188-13.0108032,14.206543-13.0108032	c7.4588623,0,13.2547607,5.3138428,13.2547607,12.4179077c0,7.4100342-4.6729126,13.3729858-11.1568604,13.3729858	c-2.178894,0-4.2263794-1.132019-4.9267578-2.4691772c0,0-1.0783081,4.1048584-1.3404541,5.1112061	c-0.4524536,1.7404175-2.3892822,5.3460083-3.3615723,6.9837036C20.1704712,47.6074829,22.5397949,48,25,48	c12.6826172,0,23-10.3173828,23-23C48,12.3178711,37.6826172,2,25,2z" />
                    </svg><span className="text-[#1D9BF0] text-[12px] pr-[3px]">Pinterest</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='p-1'>
              <table className="table-auto text-[12px] w-[100%]">
                <thead>
                  <tr className="border-[1px] bg-white">
                    <th colSpan={2} className="text-lg mx-auto text-center">Product Details</th>
                  </tr>
                </thead>
                <tbody className='text-[13px]'>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Brand Name</td>
                    <td>Eugebra L 75mg/40mg Capsule SR</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Salt Composition</td>
                    <td>Pantoprazole (40mg) + Levosulpiride (75mg)</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Strength</td>
                    <td>40mg + 75mg</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Product Form</td>
                    <td>Capsule SR</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Pack</td>
                    <td>10 Capsule(s) in Strip</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Storage</td>
                    <td>Store below 30°C</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Subcategory</td>
                    <td>Anti-ulcer</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Manufacturer</td>
                    <td>Eugenics Pharma Pvt Ltd</td>
                  </tr>
                  <tr className="border-[1px]">
                    <td className="bg-pink-200 py-[15px] px-1">Country of Origin</td>
                    <td>India</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
      <section className="px-3 mt-5">
        <div className="grid grid-cols-6 gap-4">
          <div className="md:col-span-1 col-span-6 order-2 md:order-1">
            <h2 className="font-bold hidden md:block">Product Summary</h2>
            <div className="bg-[#CEDEFC] text-[14px] hidden md:block">
              <ul className="list-disc pl-4 m-2 leading-10">
                <li>Overview</li>
                <li>Description</li>
                <li>Uses</li>
                <li>Benefit</li>
                <li>Indication</li>
                <li>Mechanism</li>
                <li>How to Works</li>
                <li>Contriaindication</li>
                <li>Side Effects</li>
                <li>General Warning</li>
                <li>Use of Tablet in Child</li>
                <li>Use of Tablet in Adult</li>
                <li>Use of Tablet in Elder</li>
                <li>General Instructions</li>
                <li>Drug Instructions</li>
                <li>Over Dose</li>
                <li>Missed Dose</li>
                <li>Doctor Consult</li>
                <li>FAQ's</li>
                <li>Expires on or after</li>
              </ul>
            </div>
            <h2 className="text-xl font-bold m-3">Author Details</h2>
            <div className="text-center border-2">
              <Image src={IMAGES.AUTHOR} alt="Description" className="w-16 h-16 mx-auto p-2" />
              <p className="text-[12px] font-bold">Written by</p>
              <h2 className="text-[14px] font-bold">Dr.Sreeramdas Jeevitha</h2>
              <h3 className="text-[14px] font-bold">Pharm.D,</h3>
            </div>
            <div className="text-center border-2 border-t-0">
              <Image src={IMAGES.AUTHOR} alt="Description" className="w-16 h-16 mx-auto p-2" />
              <p className="text-[12px] font-bold">Written by</p>
              <h2 className="text-[14px] font-bold">Dr.Sreeramdas Jeevitha</h2>
              <h3 className="text-[14px] font-bold">Pharm.D,</h3>
            </div>
            <h2 className="text-xl font-bold my-5 text-center">Share With Your Friends</h2>
            <div className="border-2 text-[14px]">
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.WHATSAPP} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Whatsapp</h3>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.FACEBOOK} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Facebook</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.INSTAGRAM} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Instagram</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.PINTEREST} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Pinterest</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.LINKEDIN} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Linkedin</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.TELEGRAM} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Telegram</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.TWITTER} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Twitter</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.VIMEO} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Vimeo</h3>
                <div className="border-2"></div>
              </div>
              <div className="border-b-2"></div>
              <div className="flex items-center px-2 gap-3 my-1">
                <Image src={IMAGES.YOUTUBE} alt="Whatsapp" className="w-6 md:w-10" />
                <h3 className="text-center font-bold">Youtube</h3>
                <div className="border-2"></div>
              </div>
            </div>
            <h2 className="text-xl font-bold my-5 text-center">Download Our Application</h2>
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
            </div>
            <h2 className="text-xl font-bold my-5 text-center">Last Updated</h2>
            <div className="border-2 p-3">
              <div className="flex gap-2 pb-3 border-b-2">
                <Image src={IMAGES.DATE} alt="Description" className="w-[25px] h-[25px]" />
                <h3 className="text-md font-bold">22 Feb, 2024</h3>
              </div>
              <div className="flex gap-2 pt-3">
                <Image src={IMAGES.TIME} alt="Description" className="w-[25px] h-[25px]" />
                <h3 className="text-md font-bold">22 Feb, 2024</h3>
              </div>
            </div>
            <h2 className="text-xl font-bold my-5 text-center">Feedback</h2>
            <div className="border-2 p-3">
              <h2 className="text-xl font-bold my-2 text-center">Did you find this helpful ?</h2>
              <p className="text-sm text-gray-400">Your feedback will help to improve the product</p>
              <div className="flex justify-center items-center gap-2 border-2 my-3">
                <Image src={IMAGES.THUMBSUP} alt="Description" className="w-[30px] md:w-[50px]" />
                <h3 className="text-lg md:text-2xl font-bold">Yes</h3>
              </div>
              <div className="flex justify-center items-center gap-2 border-2 my-3">
                <Image src={IMAGES.THUMBSDOWN} alt="Description" className="w-[30px] md:w-[50px]" />
                <h3 className="text-lg md:text-2xl font-bold">No</h3>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Something doesn’t feel right ?</h2>
            <div className="bg-[#DAEAF7] p-3">
              <h2 className="text-lg text-[#CA292C] py-3">Report on Error</h2>
              <input type="text" name="name" placeholder="Name" className="w-[98%] p-1 rounded-md mb-3" />
              <input type="text" name="mobile" placeholder="Mobile Number" className="w-[98%] p-1 rounded-md mb-3" />
              <input type="text" name="email" placeholder="Email Id" className="w-[98%] p-1 rounded-md mb-3" />
              <input type="text" name="countrycode" placeholder="Country Code" className="w-[98%] p-1 rounded-md mb-3" />
              <textarea type="text" name="subject" placeholder="Subject" className="w-[98%] p-1 rounded-md mb-3 h-24" />
              <button type="submit" className="bg-[#1877F2] text-white p-2 px-6 mx-auto flex">Report</button>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Most search Medicine Categories</h2>
            <div className="bg-[#F3F4F5] text-sm">
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.ANTICANCER} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Anti Cancer</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.ARTHRITIS} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Arthritis</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.ANTIBIOTIC} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Anti-biotic</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.ASTHMA} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Asthma</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.GASTRO} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Gastro Intestional</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.CARDIO} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Cardio Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.NEPHROLOGY} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Nephrology</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.KIDNEY} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Kidney disease/Stone</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.HYPERTENSION} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Hypertension</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.HEPATITIS} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Hepatitis</h2>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Service</h2>
            <div className="bg-[#F3F4F5] text-sm">
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.NURSE} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Nursing Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.PHYSIO} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Physiotherapy Service</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.DIETICIAN} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Dietician Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.ELDER} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Elder Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.ORTHOPEDIC} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Orthopedic Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.GLUCOMETER} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Diabetes Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.VACCINATION} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Vaccination Service</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.COVID} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Covid Care Service</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.CANCER} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Cancer Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.NATURALFOOD} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md">Nutriti Care Service</h2>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Online Consult</h2>
            <div className="text-sm border-2 p-2">
              <div className="text-center">
                <Image src={IMAGES.ONLINEDOCTOR} alt="Online Doctor" priority className="w-32 mx-auto" />
                <button className="bg-green-500 p-1 rounded-md text-white">Consult a Doctor Online</button>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Book Lab</h2>
            <div className="text-sm border-2 p-2">
              <div className="text-center">
                <Image src={IMAGES.LABTEST} alt="Lab Test" priority className="w-32 mx-auto" />
                <button className="bg-green-500 p-1 rounded-md text-white">Book Lab Test Online</button>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Scan</h2>
            <div className="bg-[#FFF7DB] text-sm">
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.PETCTSCAN} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Pet CT Scan</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.CTSCAN} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">CT Scan</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.MRISCAN} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">MRI Scan</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.USGSCAN} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">USG Scan</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.XRAY} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Pet CT Scan</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.STRESSTEST} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Stress Test</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2">
                <Image src={IMAGES.ECGTEST} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">ECG Test</h2>
              </div>
            </div>
            <h2 className="text-2xl font-bold my-5 text-center">Health Device</h2>
            <div className="bg-[#EBEBEB] text-sm">
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.BLOODPRESSURE} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Blood Pressure Monitor</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.BLOODTEST} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Blood Test Kit</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.COVIDTEST} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Covid Test Kit</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.GLUCOMETER} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Diabetes Monitor</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.HIV} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">HIV Test Kit</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.PREGNANCY} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Pregnancy Test Kit</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.PULSE} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Pulse Oximeter</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.NEBULIZER} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Nebulier Machines</h2>
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 text-center">OTC Product</h2>
            <div className="bg-[#E6F5F5] text-sm">
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.HANDSANITIZER} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Hand Sanitier</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.SKINTREATMENT} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Skin Treatment</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.VITAMINS} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Vitamins & Supplements</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.WOMENCARE} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Women Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.BABYCARE} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Baby Care</h2>
              </div>
              <div className="flex gap-2 p-2 border-b-2 border-gray-300">
                <Image src={IMAGES.MENCARE} alt="ANTI CANCER" priority className="w-6 bg-white" />
                <h2 className="text-md font-bold">Men Care</h2>
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 text-center">OTC Product</h2>
            <div className="border-2">
              <div className="p-2 justify-center items-center text-center">
                <Image src={IMAGES.CERTIFICATE} alt="ANTI CANCER" priority className="w-20 mx-auto" />
                <h2 className="font-bold text-sm">Genuine Product</h2>
                <div className="border-b-2"></div>
                <Image src={IMAGES.MONEY} alt="ANTI CANCER" priority className="w-20 mx-auto" />
                <h2 className="font-bold text-sm">Best Offers and Discounts</h2>
                <div className="border-b-2"></div>
                <Image src={IMAGES.DELIVERY} alt="ANTI CANCER" priority className="w-20 mx-auto" />
                <h2 className="font-bold text-sm">Door Step Delivery</h2>
                <div className="border-b-2"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 text-center">Care Corner</h2>
            <div className="border-2">
              <Image src={IMAGES.TURMERIC} alt="ANTI CANCER" priority className="w-20 mx-auto" />
              <h3 className="text-md text-center py-2 font-bold">Turmeric</h3>
              <ul className="ps-5 list-disc text-[12px] leading-6">
                <li>Turmeric contains curcumin, a compound that may have anti-inflammatory, antiviral,
                  and antibacterial properties.</li>
                <li>It may also be beneficial for several conditions, including a dry cough.</li>
                <li>It may also be beneficial for several conditions, including a dry cough</li>
              </ul>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 order-1 md:order-2">
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.DESCICON} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">MEDICAL DESCRIPTION OF ZUCET PLUS TABLET</h1>
              </div>
              <p className="text-justify px-8">Zucet Plus Tablet is a multidrug combination contains Paracetamol, Caffeine, Cetirizine and Phenylephrine, its an analgesic and antiallergic combination medicine used to treat pain, fever, and allergic conditions. The combination of this medicine produces its action by inhibiting certain chemical substances which are responsible for pain, fever, and allergic conditions.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.USES} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="font-bold">ZUCET PLUS TABLET USES</h1>
              </div>
              <p className="text-justify px-8">It is used in the treatment of pain, fever, and allergic conditions</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.BENEFITS} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">ZUCET PLUS TABLET BENEFITS</h1>
              </div>
              <h3 className="text-[14px] py-2 font-bold px-8">Pain relief</h3>
              <p className="text-justify px-8">The use of this medicine helps to relieve moderate to severe pain in conditions like menstrual cramps, headaches, joints, muscles, rheumatoid arthritis, and osteoarthritis by inhibiting the chemical messengers in the brain.Zucet Plus tablet acts on certain chemical messengers and reduce the pain and give relief from the pain.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.INDICATION} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">ZUCET PLUS TABLET INDICATION</h1>
              </div>
              <h3 className="text-[14px] py-2 font-bold px-8">Pain relief</h3>
              <p className="text-justify px-8">The use of this medicine helps to relieve moderate to severe pain in conditions like menstrual cramps, headaches, joints, muscles, rheumatoid arthritis, and osteoarthritis by inhibiting the chemical messengers in the brain.Zucet Plus tablet acts on certain chemical messengers and reduce the pain and give relief from the pain.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.MECHANISM} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">MECHANISM OF ACTION OF ZUCET PLUS TABLET</h1>
              </div>
              <h3 className="text-[14px] py-2 font-bold px-8">Pain relief</h3>
              <p className="text-justify px-8">The use of this medicine helps to relieve moderate to severe pain in conditions like menstrual cramps, headaches, joints, muscles, rheumatoid arthritis, and osteoarthritis by inhibiting the chemical messengers in the brain.Zucet Plus tablet acts on certain chemical messengers and reduce the pain and give relief from the pain.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.SIDEEFFECTS} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">ZUCET PLUS TABLET SIDE EFFECTS</h1>
              </div>
              <div className="flex flex-wrap gap-2 justify-between">
                <div className="rounded-lg py-3">
                  <Image src={IMAGES.SIDEEFFECT1} alt="Description" className="w-18 h-18 mx-auto rounded-full border-2" />
                  <h3 className="text-[14px] py-2 font-bold px-5">Common Side Effect </h3>
                  <ul className="list-disc text-[14px] px-5">
                    <li>Headache</li>
                    <li>Fever</li>
                    <li>Chills</li>
                    <li>Loss of appetite</li>
                    <li>Loss of appetite</li>
                    <li>Loss of appetite</li>
                  </ul>
                </div>
                <div className="rounded-lg py-3">
                  <Image src={IMAGES.SIDEEFFECT2} alt="Description" className="w-18 h-18 mx-auto rounded-full border-2" />
                  <h3 className="text-[14px] py-2 font-bold px-5">Rare SideEffect </h3>
                  <ul className="list-disc text-[14px] px-5">
                    <li>Headache</li>
                    <li>Fever</li>
                    <li>Chills</li>
                    <li>Loss of appetite</li>
                    <li>Loss of appetite</li>
                    <li>Loss of appetite</li>
                  </ul>
                </div>
                <div className="rounded-lg py-3">
                  <Image src={IMAGES.SIDEEFFECT3} alt="Description" className="w-18 h-18 mx-auto rounded-full border-2" />
                  <div className="justify-center items-center mx-auto">
                    <h3 className="text-[14px] py-2 font-bold px-5">Severe Side Effect </h3>
                    <ul className="list-disc text-[14px] px-5">
                      <li>Headache</li>
                      <li>Fever</li>
                      <li>Chills</li>
                      <li>Loss of appetite</li>
                      <li>Loss of appetite</li>
                      <li>Loss of appetite</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.FAQS} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">FAQS FOR ZUCET PLUS TABLET</h1>
              </div>
              <h3 className="text-[14px] py-2 font-bold px-8">Can the use of a Zucet Plus Tablet cause damage to the liver?</h3>
              <p className="text-justify px-8">Since this medicine contains paracetamol it may cause harmful effects on the liver in high doses. And also avoid consuming alcohol while you are receiving this medicine because this may increase the risk of developing liver damage.</p>
              <h3 className="text-[14px] py-2 font-bold px-8">What if I vomit after taking a Zucet Plus Tablet?</h3>
              <p className="text-justify px-8">If you have vomited less than 30 minutes after having this medicine, retake the medicine with the same dosage. In case you vomit after 30 minutes you need not take this medicine until the next standard dose.</p>
              <h3 className="text-[14px] py-2 font-bold px-8">Can I discontinue the medicine when my pain is relieved?</h3>
              <p className="text-justify px-8">This medicine is usually used for the short term and it can be discontinued when your pain is relieved. You can withdraw the medicine as per your doctor's suggestions.</p>
            </div>

            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.SIDEEFFECTS} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">PRECAUTIONS AND GENERAL WARNING OF ZUCET PLUS TABLET</h1>
              </div>
              <div className="flex flex-wrap justify-between md:justify-start">
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image src={IMAGES.ALCOHOL} alt="Description" className="w-24 h-24 mx-auto rounded-full border-2" />
                  <h3 className="text-[14px] py-1 font-bold px-5 text-center">ALCOHOL</h3>
                  <button className="bg-[#FFDACF] px-4 mx-auto flex m-1 rounded-md text-[#F24E1E]">Caution</button>
                  <p className="text-[14px] px-5">
                    It is considered unsafe to consume alcohol while taking this medication. Kindly consult with your doctor
                  </p>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image src={IMAGES.DRIVING} alt="Description" className="w-24 h-24 mx-auto rounded-full border-2" />
                  <h3 className="text-[14px] py-2 font-bold px-5 text-center">DRIVING </h3>
                  <button className="bg-[#E6F5F5] px-4 mx-auto flex m-1 rounded-md text-[#359494]">Caution</button>
                  <p className="text-[14px] px-5">
                    It is unsafe to drive the vehicles or operating machines due to drowsiness effect reduce your alertness feels sleepy and dizzy.Its is advised to avoid the driving and operating machines while taking this medicine. For more details kindly consult with your doctor.
                  </p>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image src={IMAGES.PREGNANCYWOMEN} alt="Description" className="w-24 h-24 mx-auto rounded-full border-2" />
                  <div className="justify-center items-center mx-auto">
                    <h3 className="text-[14px] py-2 font-bold px-5 text-center">PREGNANCY</h3>
                    <button className="bg-[#C8C8F0] px-4 mx-auto flex m-1 rounded-md text-[#444486]">Consult Your Doctor</button>
                    <p className="text-[14px] px-5">
                      It is unsafe to take the medicine during the pregnancy; Only limited information is available regarding the use of this medicine in patients during pregnancy. Kindly consult with your doctor.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t-2 py-4"></div>
              <div className="flex flex-wrap md:gap-0 justify-between md:justify-start">
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image src={IMAGES.BREASTFEEDING} alt="Description" className="w-24 h-24 mx-auto rounded-full border-2" />
                  <h3 className="text-[14px] py-1 font-bold px-5 text-center">BREAST FEEDING</h3>
                  <button className="bg-[#C8C8F0] px-4 mx-auto flex m-1 rounded-md text-[#444486]">Consult Your Doctor</button>
                  <p className="text-[14px] px-5">
                    It is considered unsafe to consume alcohol while taking this medication. Kindly consult with your doctor
                  </p>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image src={IMAGES.KIDNEY1} alt="Description" className="w-24 h-24 mx-auto rounded-full border-2" />
                  <h3 className="text-[14px] py-2 font-bold px-5 text-center">KIDNEY PROBLEM </h3>
                  <button className="bg-[#FFDACF] px-4 mx-auto flex m-1 rounded-md text-[#F24E1E]">Caution</button>
                  <p className="text-[14px] px-5">
                    It is unsafe to drive the vehicles or operating machines due to drowsiness effect reduce your alertness feels sleepy and dizzy.Its is advised to avoid the driving and operating machines while taking this medicine. For more details kindly consult with your doctor.
                  </p>
                </div>
                <div className="rounded-lg py-3 md:w-1/3 w-full">
                  <Image src={IMAGES.LIVER} alt="Description" className="w-24 h-24 mx-auto rounded-full border-2" />
                  <div className="justify-center items-center mx-auto">
                    <h3 className="text-[14px] py-2 font-bold px-5 text-center">LIVER DISEASE</h3>
                    <button className="bg-[#E6F5F5] px-4 mx-auto flex m-1 rounded-md text-[#359494]">Consult Your Doctor</button>
                    <p className="text-[14px] px-5">
                      It is unsafe to take the medicine during the pregnancy; Only limited information is available regarding the use of this medicine in patients during pregnancy. Kindly consult with your doctor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.PILL} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">HOW TO TAKE ZUCET PLUS TABLET</h1>
              </div>
              <p className="text-justify px-8">The Tablet is taken orally with or without food but it is better to take this medicine in a fixed dose. You can measure the dose with the help of a measuring cup and shake well before using this Tablet. Follow the direction mentioned within the label if you probably did not understand the appliance kindly ask your doctor or pharmacist to elucidate in detail. Do not withdraw the medicine when you feel better kindly complete the course of treatment to avoid reoccurrence.</p>
            </div>

            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.ADULT} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">USE OF ZUCET PLUS TABLET IN ADULT</h1>
              </div>
              <p className="text-justify px-8">It is considered to be safe to use this medicine in an adult patient if the medicine is prescribed by a doctor. <br />
                Kindly consult with your doctor.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.CHILD} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">USE OF ZUCET PLUS TABLET IN CHILDREN</h1>
              </div>
              <p className="text-justify px-8">The Tablet is considered unsafe in children who are below 12 years old. Kindly consult with your doctor.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.PATIENT} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">USE OF ZUCET PLUS TABLET IN ELDERLY PATIENTS</h1>
              </div>
              <p className="text-justify px-8">This Tablet should be used with caution in patients in an elderly age group, which leads to developing further medical problems, leads to worsening the patient's health conditions. Kindly consult with your doctor. Dose modification or replacement is required based on the medical conditions of the patient.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.INSTRUCTION} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">GENERAL INSTRUCTIONS</h1>
              </div>
              <p className="text-justify px-8">Paracetamol, Caffeine, Cetirizine, Phenylephrine analgesic, and antiallergic medications used to treat pain, fever, and allergic conditions. The combination of this medicine produces its action by inhibiting certain chemical substances which are responsible for pain, fever, and allergic conditions.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.INTERACTION} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">DRUG INTERACTION OF ZUCET PLUS TABLET</h1>
              </div>
              <div className="flex gap-2 py-2">
                <Image src={IMAGES.DRUGINTERACTION} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold text-[#B7084B]">DRUG-DRUG INTERACTION</h1>
              </div>

              <div className="text-justify px-8">
                <h3 className="font-bold text-sm pb-2">Apalutamide + Acetaminophen</h3>
                <p>Therapy should be administered with caution because the use of apalutamide will decrease the effect of acetaminophen by increasing its elimination. </p>
                <h3 className="font-bold text-sm pb-2">Eltrombopog + Acetaminophen</h3>
                <p>Therapy should be administered with caution because the use of eltrombopag increases the levels of acetaminophen by decreasing its metabolism.</p>
                <h3 className="font-bold text-sm pb-2">Isoniazid + Acetaminophen</h3>
                <p>Isoniazid will increase the effect of acetaminophen by affecting its hepatic enzyme metabolism. Therapy should be administered with caution.</p>
                <h3 className="font-bold text-sm pb-2">Colestipol + Acetaminophen</h3>
                <p>Colestipol decreases the effect of acetaminophen by inhibiting GI absorption. Use alternative drugs.</p>
              </div>
              <div className="flex gap-2 py-2">
                <Image src={IMAGES.DRUGFOOD} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold text-[#B7084B]">DRUG-FOOD INTERACTION</h1>
              </div>
              <p className="text-justify px-8">The use of alcohol may increase the nervous system side effects such as dizziness, drowsiness, and difficulty in concentrating. Consuming alcohol is not recommended for the patients who are receiving this medicine.</p>

              <div className="flex gap-2 py-2">
                <Image src={IMAGES.DRUGDISEASE} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold text-[#B7084B]">DRUG-DISEASE INTERACTION</h1>
              </div>
              <div className="text-justify px-8">
                <h3 className="font-bold text-sm pb-2">Liver diseases + Acetaminophen:</h3>
                <p>Therapy should be administered with caution in patients with hepatic insufficiency because severe liver injury including acute liver failure resulting in liver transplant and death has been reported in patients using acetaminophen. Patients with hepatic impairment may increase the risk of toxicity due to increased metabolic pathway activity. During acetaminophen-containing treatment, patients should avoid consuming alcohol.</p>
                <h3 className="font-bold text-sm pb-2">Alcoholism + Acetaminophen:</h3>
                <p>Therapy should be administered with caution in patients who are consuming alcohol because severe liver injury including acute liver failure resulting in liver transplant and death has been reported in patients using acetaminophen. During acetaminophen-containing treatment, patients should avoid consuming alcohol. The patient should immediately seek the hospital if they experience signs and symptoms of liver injury such as fever, rash, anorexia, nausea, vomiting, fatigue, dark urine, and jaundice.</p>
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.DOSE} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">OVER DOSE</h1>
              </div>
              <p className="text-justify px-8">Take the medicine as directed by the doctor don’t overdose on the medicine. If you have taken an overdose on this medicine immediately meet the doctor and rush to the nearby hospital.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.MISSEDDOSE} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">MISSED DOSE</h1>
              </div>
              <p className="text-justify px-8">Take the medicine as directed by the doctor. Do not skip the medicine, if you forgot to take the medicine or missed the dose. It is almost time for your next dose, skip the missed dose and go back to your regular schedule. Don’t take the extra dose take the regular dose immediately. Don’t use the two-dose at one time (Double Dose).</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.STORAGE} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">STORAGE AND DISPOSAL</h1>
              </div>
              <ul className="text-justify px-8 list-disc text-sm">
                <li>Stored at 10-30'C room temperature.</li>
                <li>Protect from light and heat.</li>
                <li>Keep away from children and pets. Otherwise, it becomes toxic to them.</li>
                <li>Disposed o properly in a suitable bag.</li>
              </ul>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.FASTTAG} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">FAST TAG</h1>
              </div>
              <ul className="text-justify px-8 list-disc text-sm">
                <li>The Tablet contains Paracetamol, Caffeine, Cetirizine, Phenylephrine analgesic, and antiallergic medication used to treat pain, fever, and allergic conditions.</li>
                <li>The combination of this medicine produces its action by inhibiting certain chemical substances which are responsible for pain, fever, and allergic conditions.</li>
                <li>Kindly inform your doctor if you have a history of liver disease</li>
                <li>Monitor the patient's kidney functions, liver function, and levels of blood components</li>
                <li>Avoid consuming alcohol because it may cause excessive drowsiness and stomach problems</li>
              </ul>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.REFERENCE} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">REFERENCE</h1>
              </div>
              <p className="text-justify px-8">Spectrum Pharmaceuticals, Inc., US Food & Drug Administration, U.S. Food and Drug Administration.</p>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.EXPIRED} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">EXPIRES ON OR AFTER</h1>
              </div>
            </div>
            <div className="border-[1px] p-3 mb-4">
              <div className="flex gap-2">
                <Image src={IMAGES.DISCLAIMER} alt="Description" className="w-[25px] h-[25px]" />
                <h1 className="text-md font-bold">PRODUCT DISCLAIMER</h1>
              </div>
              <p className="text-justify px-8">A Product Zucet Plus Tablet will be supplied by the licensed vendor partner in your nearest delivery location. <br />
                On accepting the order , the details of licensed vendor partner details will share with you before the supply of your order.<br />
                Orders acceptances depends on the availability of the medicine and with valid prescription from the registered medical practitioner (Doctor).
              </p>
            </div>
            <div className="bg-[#D8EECA] rounded-md p-2 px-6">
              <h1 className="font-bold text-md">DRUGS FACT BOX</h1>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Chemical Class</h2>
                <h2 className="w-1/2">Sulfinylbenzimidazale Derivate</h2>
              </div>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Habit Forming</h2>
                <h2 className="w-1/2">No</h2>
              </div>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Therapeutic Class</h2>
                <h2 className="w-1/2">Gastor Intestinal</h2>
              </div>
              <div className="flex bg-white p-2 my-2 rounded-md text-sm">
                <h2 className="text-gray-300 w-1/2">Action Class</h2>
                <h2 className="w-1/2">Proton pump inhibitors</h2>
              </div>
            </div>

          </div>
          <div className="md:col-span-2 col-span-6 order-3 md:order-3">
            <div className="">
              <h2 className="font-bold text-center m-2 text-xl">Generic Name</h2>
              <div className="bg-[#F3F8FC] text-[14px] text-center border-[1.5px] m-2 rounded">
                <Image src={IMAGES.ALOVERA} alt="ALOVERA" className="w-20 mx-auto" />
                <h2>Pantoprazole (40mg) + Levosulpiride (75mg)</h2>
              </div>
              <h2 className="font-bold text-center m-2 text-xl">Alternate Brands</h2>
              <div className="bg-[#F3F8FC] text-[14px] border-[1.5px] m-2 rounded">
                <div className="flex m-3">
                  <div className="w-2/3">
                    <h2 className="text-lg">Pan L Capsule</h2>
                    <div className="flex text-[10px] gap-3 font-semibold">
                      <p>Precription</p>
                      <p>Anti Cancer</p>
                      <p>Rx required</p>
                    </div>
                    <h3 className='text-[#B7084B] font-bold text-lg'>&#8377; 7.50</h3>
                    <h3 className='text-[#35A24D] font-semibold'>Get this at $87.50</h3>
                    <p className="text-xs my-1 text-gray-500">15 Tablet(s)in a strip</p>
                    <p className="text-xs text-gray-500">Mft : Eugenics Pharma Pvt Ltd</p>
                  </div>
                  <div className="w-1/3">
                    <Image src={IMAGES.ALOVERA} alt="Description" className="w-24 h-24 mx-auto" />
                  </div>
                </div>
                <div className="border-[1px] m-3"></div>
                <div className="flex m-3">
                  <div className="w-2/3">
                    <h2 className="text-lg">Pan L Capsule</h2>
                    <div className="flex text-[10px] gap-3 font-semibold">
                      <p>Precription</p>
                      <p>Anti Cancer</p>
                      <p>Rx required</p>
                    </div>
                    <h3 className='text-[#B7084B] font-bold text-lg'>&#8377; 7.50</h3>
                    <h3 className='text-[#35A24D] font-semibold'>Get this at $87.50</h3>
                    <p className="text-xs my-1 text-gray-500">15 Tablet(s)in a strip</p>
                    <p className="text-xs text-gray-500">Mft : Eugenics Pharma Pvt Ltd</p>
                  </div>
                  <div className="w-1/3">
                    <Image src={IMAGES.ALOVERA} alt="Description" className="w-24 h-24 mx-auto" />
                  </div>
                </div>
                <div className="border-[1px] m-3"></div>
                <div className="flex m-3">
                  <div className="w-2/3">
                    <h2 className="text-lg">Pan L Capsule</h2>
                    <div className="flex text-[10px] gap-3 font-semibold">
                      <p>Precription</p>
                      <p>Anti Cancer</p>
                      <p>Rx required</p>
                    </div>
                    <h3 className='text-[#B7084B] font-bold text-lg'>&#8377; 7.50</h3>
                    <h3 className='text-[#35A24D] font-semibold'>Get this at $87.50</h3>
                    <p className="text-xs my-1 text-gray-500">15 Tablet(s)in a strip</p>
                    <p className="text-xs text-gray-500">Mft : Eugenics Pharma Pvt Ltd</p>
                  </div>
                  <div className="w-1/3">
                    <Image src={IMAGES.ALOVERA} alt="Description" className="w-24 h-24 mx-auto" />
                  </div>
                </div>
                <div className="border-[1px] m-3"></div>
                <div className="flex m-3">
                  <div className="w-2/3">
                    <h2 className="text-lg">Pan L Capsule</h2>
                    <div className="flex text-[10px] gap-3 font-semibold">
                      <p>Precription</p>
                      <p>Anti Cancer</p>
                      <p>Rx required</p>
                    </div>
                    <h3 className='text-[#B7084B] font-bold text-lg'>&#8377; 7.50</h3>
                    <h3 className='text-[#35A24D] font-semibold'>Get this at $87.50</h3>
                    <p className="text-xs my-1 text-gray-500">15 Tablet(s)in a strip</p>
                    <p className="text-xs text-gray-500">Mft : Eugenics Pharma Pvt Ltd</p>
                  </div>
                  <div className="w-1/3">
                    <Image src={IMAGES.ALOVERA} alt="Description" className="w-24 h-24 mx-auto" />
                  </div>
                </div>
                <Link href="#" className="justify-center flex text-blue-500 font-bold py-3">View All</Link>
              </div>
              <div className="border-2 my-4 m-3 rounded-md">
                <div className="flex p-3 justify-between items-center text-lg ps-10">
                  <h3 className="font-bold">2 Items <br /> <span className="text-gray-300 text-sm font-semibold">in your cart</span></h3>
                  <Image src={IMAGES.MEDICINE} alt="Description" className="w-20 h-20 mx-auto" />
                </div>
                <button className="bg-[#B7084B] flex mx-auto p-1 m-2 text-white rounded-md px-3">View Cart</button>
              </div>
              <div className="border-2 my-4 m-3 rounded-md">
                <div className="flex p-3 justify-between items-center text-lg">
                  <div className="leading-5">
                    <p className="text-sm text-gray-400">Save Your Time</p>
                    <h2 className="my-3 font-bold">Order Quickly</h2>
                    <p className="text-[14px]">Upload doctor's prescription<br /> and we will add the medicine<br /> for you</p>
                  </div>
                  <div>
                    <Image src={IMAGES.PRESCRIPTION} alt="Description" className="w-32 mx-auto" />
                  </div>
                </div>
                <button className="bg-[#35A24D] flex mx-auto p-1 m-2 text-white rounded-md px-12">Upload</button>
                <ul className="list-disc text-[14px] ml-8 py-3">
                  <li>Standard Delivery in 3 - 5 day(s)</li>
                  <li>Actual delivery time may vary depending on other items in your order</li>
                </ul>
              </div>
              <div className="border-2 border-gray-300 p-4 rounded-md">
                <h2 className="font-bold text-center m-2 text-xl">Related Lab Test <br />To The Product</h2>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image src={IMAGES.DIABETESLABTEST} alt="ANTI CANCER" priority className="w-16 bg-white mx-4" />
                  <h2 className="text-md font-bold">Diabetes</h2>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image src={IMAGES.HEMOGRAMLABTEST} alt="ANTI CANCER" priority className="w-16 bg-white mx-4" />
                  <h2 className="text-md font-bold">Complete Hemogram</h2>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image src={IMAGES.THYROIDLABTEST} alt="ANTI CANCER" priority className="w-16 bg-white mx-4" />
                  <h2 className="text-md font-bold">Thyroid Test</h2>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md mb-5">
                  <Image src={IMAGES.LIPIDLABTEST} alt="ANTI CANCER" priority className="w-16 bg-white mx-4" />
                  <h2 className="text-md font-bold">Lipid Profile</h2>
                </div>
              </div>

              <div className="border-2 border-gray-300 p-4 rounded-md">
                <h2 className="font-bold text-center m-2 text-xl">How You Question ?</h2>
                <div className="bg-[#D5F1C3] p-4">
                  <p className="text-sm py-5">Although we strive to provide the most up-to-date
                    information about our products and services</p>

                  <input type="text" name="name" className="p-2 w-[100%] mb-3" />
                  <input type="text" name="mobile" className="p-2 w-[100%] mb-3" />
                  <input type="text" name="email" className="p-2 w-[100%] mb-3" />
                  <textarea type="text" name="query" className="p-2 w-[100%] mb-3 h-24" />
                  <button type="submit" className="flex mx-auto grid bg-[#4CAF50] p-2 px-10 text-white rounded-md">Submit</button>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-xl">Medicine Related Indication</h2>
              <div className="bg-[#F4FFFF] p-4 border-2">
                <div className="flex items-center gap-2 border-b-2 border-gray-300 py-5">
                  <Image src={IMAGES.PAINRELIFER} alt="ANTI CANCER" priority className="w-28 bg-white mx-4 border-2 rounded-md" />
                  <h2>Pain Reliver</h2>
                </div>
                <div className="flex items-center gap-2 p-2 border-b-2 border-gray-300 py-5">
                  <Image src={IMAGES.ALLERGIC} alt="ANTI CANCER" priority className="w-28 bg-white mx-4 border-2 rounded-md" />
                  <h2>Allergic Condition</h2>
                </div>
                <div className="flex items-center gap-2 p-2 border-b-2 border-gray-300 py-5">
                  <Image src={IMAGES.FEVER} alt="ANTI CANCER" priority className="w-28 bg-white mx-4 border-2 rounded-md" />
                  <h2>Fever</h2>
                </div>
              </div>
              <h2 className="font-bold text-center m-2 text-xl">Frequently bought Together</h2>
              <div className="grid grid-cols-2 gap-2 justify-center items-center mx-auto ">
                <div className="border-2">
                  <div className="bg-pink-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">-10%</span>
                    <Image src={IMAGES.Product_Eugebra} alt="ANTI CANCER" priority className="w-24 mx-auto py-2 rounded-md" />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">Emcof Herbal (pack of 2)</h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-[#B7084B]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                  </div>
                </div>
                <div className="border-2">
                  <div className="bg-pink-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">-10%</span>
                    <Image src={IMAGES.Product_Eugebra} alt="ANTI CANCER" priority className="w-24 mx-auto py-2 rounded-md" />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">Emcof Herbal (pack of 2)</h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-[#B7084B]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="font-bold text-center m-2 text-xl">Tranding Product</h2>
              <div className="grid grid-cols-2 gap-2 justify-center items-center mx-auto ">
                <div className="border-2">
                  <div className="bg-green-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">-10%</span>
                    <Image src={IMAGES.Product_Eugebra} alt="ANTI CANCER" priority className="w-24 mx-auto py-2 rounded-md" />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">Emcof Herbal (pack of 2)</h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-[#B7084B]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                  </div>
                </div>
                <div className="border-2">
                  <div className="bg-pink-200 m-3 rounded-md">
                    <span className="bg-[#B7084B] mx-1 text-[10px] text-white p-[0.5px]">-10%</span>
                    <Image src={IMAGES.Product_Eugebra} alt="ANTI CANCER" priority className="w-24 mx-auto py-2 rounded-md" />
                  </div>
                  <p className="text-gray-400 text-[12px] px-2">Cold Cough</p>
                  <h3 className="text-[12px] px-2 font-bold">Emcof Herbal (pack of 2)</h3>
                  <h2 className="text-[12px] px-2 font-bold">Rs. 299.00</h2>
                  <div className="flex justify-between gap-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-[#B7084B]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-5 border-2 my-10">
                <h2 className="font-bold text-center m-2 text-xl">WE WILL HELP YOU?</h2>
                <div className="flex items-center gap-5">
                  <Image src={IMAGES.HELP} className="w-24" alt="Help" />
                  <ul className="list-disc text-sm">
                    <li>A Guide to Drugcarts</li>
                    <li>Prescription Guide</li>
                    <li>Policy</li>
                  </ul>
                </div>
              </div>
              <h2 className="font-bold text-center m-2 text-2xl">Our Categories</h2>
              <div className="bg-[#FFEDF2] text-sm">
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.AYUSH} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Ayush</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.SIDDHA} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Siddha</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.UNANI} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Unani</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.HOMEOPATHY} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Homeopathy</h2>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-2xl my-8">Our Care</h2>
              <div className="bg-[#CEDEFC] text-sm">
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.BABYCARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Baby Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.FACECARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Face Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.FRAGRANCES} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Fragrances</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.HAIRCARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Hair Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.HOMECARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Home Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.SKINCARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Skin Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.WOMENCARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Women Care</h2>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-2xl my-8">Health Store Availability</h2>
              <div className="bg-[#FBE8E2] text-sm">
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.PERSONALCARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Personal Care</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.SUPPLEMENTS} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Fitness Supplements</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.HEALTHCARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Health Care Products</h2>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-2xl my-8">Our Home Service</h2>
              <div className="text-sm">
                <div className="text-center bg-[#4C4C95] p-2 border-b-2 px-4">
                  <h2 className="text-xl text-white font-bold ps-7">Our Service</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.NURSECARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Nurse Care at home</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.ELDERCARE} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Elder Care at home</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.DIAGNOSTIC} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Diagnostic at home</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.DOCTOR} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Doctor Consultations</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.MEDICAL} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Medical Equipment</h2>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-2xl my-8">Our Home Service</h2>
              <div className="bg-[#E4EDFF] text-sm">
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.AYURVEDIC} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Ayurvedic Supplements</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.NUTRITION} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Family Nutrition</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.HEALTHFOOD} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Health Food and Drinks</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.ORGANIC} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Health Supplements</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.SMOKING} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Smoking Cessation</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.PROTEIN} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Sports Supplements</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.VITAMINS} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Vitamins and Supplements</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.WEIGHT} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Weight Management</h2>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-2xl my-8">Our Treatment</h2>
              <div className="text-sm border-2">
                <div className="text-center bg-[#1877F2] p-2 border-b-2 px-4">
                  <h2 className="text-xl text-white font-bold ps-7">Our Treatment</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.SKINTREATMENT} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Skin Treatment</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.COUGHCOLD} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Cough Cold</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.GLUCOMETER} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Diabetes</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 border-b-2 px-4">
                  <Image src={IMAGES.STOMACH} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Pain Relief</h2>
                </div>
                <div className="flex items-center justify-start gap-2 p-2 px-4">
                  <Image src={IMAGES.SMOKING} alt="ANTI CANCER" priority className="w-10 bg-white" />
                  <h2 className="text-md font-bold ps-7">Smoking Cessation</h2>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-2xl my-8">Our Ayurvedic</h2>
              <div className="text-sm border-2 bg-[#D8EECA]">
                <div className="bg-[#D8EECA] p-2 border-b-2 px-4 border-gray-300">
                  <h2 className="text-xl text-[#B7084B] font-bold ps-7">Ayurvedic Product</h2>
                </div>
                <div className="bg-[#D8EECA] p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Popular Categories</h2>
                </div>
                <div className="bg-[#D8EECA] p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Ayurvedic Personal Care</h2>
                </div>
                <div className="bg-[#D8EECA] p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Best Selling Product</h2>
                </div>
                <div className="bg-[#D8EECA] p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Top Health Product</h2>
                </div>
                <div className="bg-[#D8EECA] p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Top Selling Product</h2>
                </div>
              </div>

              <h2 className="font-bold text-center m-2 text-2xl my-8">Our Homeopathy</h2>
              <div className="text-sm border-2 bg-[#FFF6D5]">
                <div className="p-2 border-b-2 px-4 border-gray-300">
                  <h2 className="text-xl text-[#B7084B] font-bold ps-7">Homeopathy Product</h2>
                </div>
                <div className="p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Homeopathy Top Brands</h2>
                </div>
                <div className="p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Homeopathy Wellness Combo</h2>
                </div>
                <div className="p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Homeopathy Popular Categories</h2>
                </div>
                <div className="p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Homeopathy Medicine</h2>
                </div>
                <div className="p-2 border-b-2 border-gray-300 px-4">
                  <h2 className="text-md ps-7">* Homeopathy Top Selling Product</h2>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F3F4F5] mt-3 p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
          <h2 className="p-4 font-bold">Your Medicine</h2>
          <div className="bg-white rounded-md p-4 px-10">
            <div className="flex">
              <div>
                <h2 className="font-bold">Pan L Capsule</h2>
                <div className="flex gap-2">
                  <p className="text-[10px] bg-[#F0F5FF] px-4 rounded-md">Percription</p>
                  <p className="text-[10px] bg-[#F0F5FF] px-4 rounded-md">Anti-cancer</p>
                  <p className="text-[10px] bg-[#F0F5FF] px-4 rounded-md">Rx required</p>
                </div>
                <h2 className="text-[#B7084B] font-bold py-1">Rs.87.50</h2>
                <h4 className="text-[#35A24D] font-bold">Get this at $87.50</h4>
                <p>15 Tablet(s)in a strip</p>
                <p>Mft : Eugenics Pharma Pvt Ltd</p>
              </div>
              <Image src={IMAGES.EUGEBRAL} alt="Medicine" className="w-32 h-24 mt-3 mx-auto" />
            </div>
          </div>
          </div>
          <div>
          <h2 className="p-4 font-bold">Durgcarts Suggestion</h2>
          <div className="bg-[#CEDEFC] rounded-md p-4 px-10">
            <div className="flex">
              <div>
                <h2 className="font-bold">Pan L Capsule</h2>
                <div className="flex gap-2">
                  <p className="text-[10px] bg-[#F0F5FF] px-4 rounded-md">Percription</p>
                  <p className="text-[10px] bg-[#F0F5FF] px-4 rounded-md">Anti-cancer</p>
                  <p className="text-[10px] bg-[#F0F5FF] px-4 rounded-md">Rx required</p>
                </div>
                <h2 className="text-[#B7084B] font-bold py-1">Rs.87.50</h2>
                <h4 className="text-[#35A24D] font-bold">Get this at $87.50</h4>
                <p>15 Tablet(s)in a strip</p>
                <p>Mft : Eugenics Pharma Pvt Ltd</p>
              </div>
              <Image src={IMAGES.EUGEBRAL} alt="Medicine" className="w-32 h-24 mt-3 mx-auto" />
            </div>
          </div>
          </div>
        </div>
      </section>
      <div className="text-center p-2 bg-[#4C4C95]">
        <h2 className="text-white">Save $ 250 on 30 Tablets 80% cheaper    </h2>
      </div>
      <section className="bg-[#FFEDF2] mt-3">
        <h2 className="font-bold text-md">Customer Reviews at Drugcarts</h2>
        <div className="flex flex-wrap p-2 justify-center items-center">
          <div className="w-full md:w-1/4 text-center">
            <h3 className="text-[#B7084B] text-[35px] font-bold">4.0</h3>
            <div className="flex items-center justify-center">
              <span className="text-yellow-500 text-[35px]">&#9733;</span>
              <span className="text-yellow-500 text-[35px]">&#9733;</span>
              <span className="text-yellow-500 text-[35px]">&#9733;</span>
              <span className="text-yellow-500 text-[35px]">&#9733;</span>
              <span className="text-gray-500 text-[35px]">&#9733;</span>
            </div>
            <p>Average Rating</p>
          </div>
          <div className="w-full md:w-2/4 my-4">
            <div className="space-y-7">
              <div className="w-2/3 mx-auto bg-green-500 h-3 rounded-full"></div>
              <div className="w-1/2 mx-auto bg-blue-500 h-3 rounded-full"></div>
              <div className="w-1/3 mx-auto bg-yellow-500 h-3 rounded-full"></div>
              <div className="w-1/6  mx-auto bg-purple-500 h-3 rounded-full"></div>
              <div className="w-1/12  mx-auto bg-gray-300 h-3 rounded-full"></div>
            </div>
          </div>
          <div className="w-full md:w-1/4 text-center">
            <div className="flex justify-center items-center mx-auto">
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
            </div>
            <div className="flex justify-center items-center mx-auto">
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
            </div>
            <div className="flex justify-center items-center mx-auto">
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
            </div>
            <div className="flex justify-center items-center mx-auto">
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
            </div>
            <div className="flex  justify-center items-center mx-auto">
              <span className="text-yellow-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
              <span className="text-gray-500 text-[25px]">&#9733;</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#CEDEFC] mt-3">
        <Feedback />
      </section>
      <section className="bg-[#D8EECA] mt-3 p-10">
        <h2 className="text-[#1C7730] font-bold text-center">INDIA’S LARGEST HEALTHCARE PLATFORM</h2>
        <div className="flex justify-around items-center gap-2 py-5 border-b-2 border-green-300">
          <div className="text-center">
            <Image src={IMAGES.SHOP} alt="shop" className="w-24 mx-auto bg-white p-3 rounded-full" />
            <h3 className="font-bold text-3xl">200m+</h3>
            <p className="text-[#1C7730]">Visitors</p>
          </div>
          <div className="text-center">
            <Image src={IMAGES.DELIVERY} alt="shop" className="w-24 mx-auto bg-white p-3 rounded-full" />
            <h3 className="font-bold text-3xl">31m+</h3>
            <p className="text-[#1C7730]">Order Delivered</p>
          </div>
          <div className="text-center">
            <Image src={IMAGES.LOCATION} alt="shop" className="w-24 mx-auto bg-white p-3 rounded-full" />
            <h3 className="font-bold text-3xl">1k+</h3>
            <p className="text-[#1C7730]">Cities</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-around items-center px-10">
          <h3 className="w-full md:w-1/2 text-center text-xl font-bold mt-4">Get the link to download app</h3>
          <div className="w-full md:w-1/2 flex py-5 text-gray-300">
            <input type="text" name="email" readOnly value="Enter Phone Number" className="p-1 w-[60%] rounded-md" />
            <button type="submit" className="bg-[#35A24D] text-white p-1 rounded-sm px-5">Send Link</button>
          </div>
        </div>
      </section>
      <section className="bg-[#FFEAE4] mt-3 p-3">
        <h2 className="text-[#F24E1E] font-bold text-center">DISCLAIMER</h2>
        <p className="px-12 text-center">The content and information on Drugcarts.com are provided for informational purposes and are not designed to be a substitute for professional medical advice, diagnosis, or treatment. Although we strive to provide the most up-to-date information about our products and services, as well as other information about our website, we do not guarantee the accuracy, effectiveness, or suitability of any information on this Web page. The information presented is not intended to be a substitute for the advice of a licensed and qualified medical professional. This content may not include all possible side effects, drug interactions, warnings, or alerts. Kindly consult your doctor with any queries you have about a disease or medication. We intend to support, not replace, the doctor-patient relationship.
        </p>
      </section>
    </>
  )
}

export default Product;









