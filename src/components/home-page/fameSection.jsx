import Image from "next/image"
import Offers1 from '@/assets/offers/offers-1.jpg'
import Offers2 from '@/assets/offers/offers-2.jpg'
import Offers3 from '@/assets/offers/offers-3.jpg'
import WheatgrassJuice from '@/assets/product/wheatgrass-juice.png';
import Famelight from '@/assets/famelight.png';
import { useSelector } from "react-redux";

const FameSection = () => {
  const { productList } = useSelector((state) => state.productData)
  return (
    <section className='px-10 mt-10'>
      <div className="bg-bgfame px-5 py-2 mb-10 relative">
        <div className="absolute top-2 left-1 text-white text-xs px-2 py-1 rounded-full">
          <Image src={Famelight} alt="fame of the day" className="w-12 object-contain -rotate-45 opacity-50" />
        </div>
        {/* Discount Badge */}
        {/* Share Icon */}
        <div className="absolute top-2 right-2 text-gray-500">
          <Image src={Famelight} alt="fame of the day" className="w-12 object-contain rotate-45 opacity-50" />
        </div>

        <div className='p-2 font-bold mb-2 text-center text-lg'>
          <h1>Fame of the Day</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mb-10 gap-2">

          {productList && productList?.products?.map((product, i) => (
            <div className="relative mt-10 bg-white p-4 border rounded-lg shadow-md" key={i}>
              <div className="absolute top-2 left-1 text-white text-xs px-2 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>

              </div>
              {/* Discount Badge */}
              {product?.percentage ? (
                <div className="absolute top-2 ml-20  bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  -{product?.percentage}%
                </div>
              ) : null}

              {/* Share Icon */}
              <div className="absolute top-2 right-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-blue-700">
                  <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Product Image */}
              <div className="flex justify-center mb-4 mt-7">
                <Image src={WheatgrassJuice} alt="Wheatgrass Juice" className="h-32 object-contain" />
              </div>

              {/* Product Details */}
              <div>
                <h3 className="text-gray-800 font-semibold text-sm">{product?.product_name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product?.cat_name}</p>
                <p className="text-md font-bold text-gray-800 mb-0">&#8377; {product?.price}</p>

                {/* Rating */}
                <div className="flex justify-center mt-4">
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-gray-300 text-xl">&#9733;</span>
                  {/* Add to Cart Button */}
                  <button className="bg-green-500 hover:bg-green-600 text-white font-poppins font-semibold text-[12px] py-1 px-1 ml-2 rounded shadow-md">
                    <div className="flex justify-center">
                      <span>Add Cart</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 ml-1">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                      </svg></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
        <div className='p-1'>
          <Image src={Offers1} alt="Offer Banner" className='w-full object-cover' />
        </div>
        <div className='p-1'>
          <Image src={Offers2} alt="Offer Banner" className='w-full object-cover' />
        </div>
        <div className='p-1'>
          <Image src={Offers3} alt="Offer Banner" className='w-full object-cover' />
        </div>
      </div>

    </section>
  )
}

export default FameSection;
