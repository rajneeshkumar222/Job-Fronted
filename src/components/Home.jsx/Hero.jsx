import React from 'react'
import { PiBuildingApartmentFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center gap-1 bg-gray-200 p-[10px] rounded-2xl'>
        <div><PiBuildingApartmentFill /></div>
        <div className='font-semibold text-red-600'>No.1 Job Hunt Website</div>
      </div>
      <div>
        <div className='font-bold text-5xl pt-4 '>Search Apply & Get Your <h1 className='text-purple-800'>Dream Job</h1></div>
        
      </div>
      <div>
        <p>Start your hunt for the best, life-changing career opportunities from here in your
          selected areas conveniently and get hired quickly.</p>
      </div>
      <div className='p-6 items-center justify-center flex '>
        <input type="text"
          name="text"
          placeholder='Find Your Dream Job'
          className='border-1 rounded-l-2xl p-2  shadow-2xl'
        />
        <div className='border p-3 rounded-r-2xl text-black bg-blue-500 cursor-pointer'>
          <FaSearch />
        </div>
      </div>

    </div>
  )
}

export default Hero
