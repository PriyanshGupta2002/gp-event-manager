"use client"
import React from 'react'
import Image from 'next/image'

const EventItem = ({event}) => {
    const {name,desc,image,organisedBy,address,date} = event
     const eventDate = date ? new Date(date):new Date()
     const options = { day: 'numeric', month: 'long', year: 'numeric' };
     const formattedDate = eventDate.toLocaleDateString('en-US', options);
  return (
    <div className="w-full sm:w-[550px] md:w-[328px] flex flex-col gap-[15px] bg-[#ffffff33] backdrop-filter backdrop-blur-sm overflow-hidden rounded-xl">
    <div className="top">
      <img
        className='w-full object-contain'
        src={image} 
        alt="image"
        />
    </div>


    <div className="flex flex-col gap-3 p-3">


      <div className="flex  justify-between md:text-sm text-base  text-[#c8c8c8]">


        <div className='flex flex-col gap-2'>
        <span>
          Organiser
        </span>

        <div className='flex items-center gap-2'>
        <span className='text-white font-semibold'>
          {organisedBy?.username}
        </span>
        <Image
        height={30}
        width={30}
        alt={`Image of ${organisedBy.username}`}
        className='rounded-full object-contain'
        src={organisedBy?.image}
        />
        </div>

        </div>


      
          <span className="date font-medium text-[#efefef]">
            {formattedDate}
          </span>
        

      </div>
      
      <div className="text-[#efefef] font-medium text-">
        Venue - <span className='font-semibold'>{address}</span>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h3 className="text-xl font-bold green_gradient">
          {name}
        </h3>

        <p className="md:text-sm text-lg text-justify text-[#f5f5f5]">
          {desc.length > 70?`${desc.trim().substring(0,70)}...`:desc}
         
        </p>

      </div>
      <button className="button">
        <span className="button-content">Know More</span>
      </button>

    </div>



  </div>
  )
}

export default EventItem