import React from 'react'

const FilterFormCard = () => {
  return (
    <>
      <div className="text-center p-2 mt-10 border-b-2 px-4">
            <h2 className="text-xl font-bold ps-7">
            Filter by Product Form
            </h2>
          </div>
          <div className="items-center justify-start gap-2 border-[1.5px] bg-[#FFEAE4] mb-10">
            <h2 className="text-md font-bold p-2 border-b-2 px-4">
            Liquid
            </h2>
            <h2 className="text-md font-bold p-2 border-b-2 px-4">
            Solution
            </h2>
            <h2 className="text-md font-bold p-2 border-b-2 px-4">
            Granules
            </h2>
            <h2 className="text-md font-bold p-2 border-b-2 px-4">
            Tablet
            </h2>
            <h2 className="text-md font-bold p-2 border-b-2 px-4">Syrup</h2>
            <h2 className="text-md font-bold p-2 border-b-2 px-4">Capsule</h2>
          </div>  
    </>
  )
}

export default FilterFormCard;