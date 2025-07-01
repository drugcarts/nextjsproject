
const Cart = () => {
  return (
    <div class="flex justify-center items-center space-x-2 py-6">
  <div class="flex flex-col items-center">
    <div class="w-12 h-12 flex justify-center items-center bg-green-500 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7H19m-8-7v7m4-7v7" />
      </svg>
    </div>
    <span class="mt-2 text-sm font-medium text-black">Cart</span>
  </div>
   <div className="h-[2px] bg-gray-400 w-[10%]"></div> 

  <div class="flex flex-col items-center">
    <div class="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 12v1m-6 8h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm0-6h12m-6 0v6" />
      </svg>
    </div>
    <span class="mt-2 text-sm font-medium text-black">Upload Prescription</span>
  </div>
   <div className="h-[2px] bg-gray-400 w-[10%]"></div> 

  <div class="flex flex-col items-center">
    <div class="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zM12 13c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z" />
      </svg>
    </div>
    <span class="mt-2 text-sm font-medium text-black">Address</span>
  </div>
   <div className="h-[2px] bg-gray-400 w-[10%]"></div> 

  <div class="flex flex-col items-center">
    <div class="w-12 h-12 flex justify-center items-center bg-gray-200 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16h8m-6-4h6m-4-4h4M3 5h18M5 7v14a2 2 0 002 2h10a2 2 0 002-2V7H5z" />
      </svg>
    </div>
    <span class="mt-2 text-sm font-medium text-black">Order Summary</span>
  </div>
  
</div>

  )
}

export default Cart