import Image from "next/image";
import Clientreview from '@/assets/client-review-icon.png'

const Feedback = () => {
  return (
    <section className='md:px-10 mt-5'>
        <div className='bg-bgclient rounded-md px-10'>
          <h1 className='font-bold text-xl text-center p-4 md:p-8'>Our Clients Feedback</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center md:text-left md:px-5 pb-10'>
            <div className='bg-white rounded-lg p-10 px-5'>
              <div className='flex mb-4'>
                <div className='flex justify-start bg-red-200 mr-2 rounded-full p-2'>
                  <Image src={Clientreview} alt="Client reivew icons" className='w-12 h-12 object-cover ' />
                </div>
                <div className='justify-end text-center'>
                  <h3 className='text-2xl font-bold'>Mathew</h3>
                  <p>Business</p>
                </div>
              </div>
              <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</span>
              <div className="flex  justify-center mt-6">
              <h3 className='font-bold pr-1 mt-1 text-sm text-black'>4.0</h3>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-gray-400 text-xl">&#9733;</span>
                </div>
            </div>
            <div className='bg-white rounded-lg p-10 px-5'>
              <div className='flex mb-4'>
                <div className='flex justify-start bg-red-200 mr-2 rounded-full p-2'>
                  <Image src={Clientreview} alt="Client reivew icons" className='w-12 h-12 object-cover ' />
                </div>
                <div className='justify-end text-center'>
                  <h3 className='text-2xl font-bold'>Mathew</h3>
                  <p>Business</p>
                </div>
              </div>
              <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</span>
              <div className="flex  justify-center mt-6">
              <h3 className='font-bold pr-1 mt-1 text-sm text-black'>4.0</h3>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-gray-400 text-xl">&#9733;</span>
                </div>
            </div>
            <div className='bg-white rounded-lg p-10 px-5'>
              <div className='flex mb-4'>
                <div className='flex justify-start bg-red-200 mr-2 rounded-full p-2'>
                  <Image src={Clientreview} alt="Client reivew icons" className='w-12 h-12 object-cover ' />
                </div>
                <div className='justify-end text-center'>
                  <h3 className='text-2xl font-bold'>Mathew</h3>
                  <p>Business</p>
                </div>
              </div>
              <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</span>
              <div className="flex  justify-center mt-6">
              <h3 className='font-bold pr-1 mt-1 text-sm text-black'>4.0</h3>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-gray-400 text-xl">&#9733;</span>
                </div>
            </div>
            <div className='bg-white rounded-lg p-10 px-5'>
              <div className='flex mb-4'>
                <div className='flex justify-start bg-red-200 mr-2 rounded-full p-2'>
                  <Image src={Clientreview} alt="Client reivew icons" className='w-12 h-12 object-cover ' />
                </div>
                <div className='justify-end text-center'>
                  <h3 className='text-2xl font-bold'>Mathew</h3>
                  <p>Business</p>
                </div>
              </div>
              <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</span>
              <div className="flex  justify-center mt-6">
              <h3 className='font-bold pr-1 mt-1 text-sm text-black'>4.0</h3>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-yellow-400 text-xl">&#9733;</span>
                  <span className="text-gray-400 text-xl">&#9733;</span>
                </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Feedback;