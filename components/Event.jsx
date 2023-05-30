import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const EventItem = ({event,type}) => {
    const {name,desc,image,organisedBy,address,date} = event
    const router = useRouter()
     const eventDate = date ? new Date(date):new Date()
     const options = { day: 'numeric', month: 'long', year: 'numeric' };
     const formattedDate = eventDate.toLocaleDateString('en-US', options);
     const [isDeleting, setisDeleting] = useState(false)
     const handleDeleteMeetup=async()=>{
      setisDeleting(true)
        try {
          await axios.delete(`/api/meetups/delete/${event._id}`)
          router.push('/')
          setisDeleting(false)
        } catch (error) {
          setisDeleting(false)
          console.log(error)
        }
     }
  return (
    <div className="w-full sm:w-[550px] md:w-[328px] flex flex-col gap-[15px] glassmorphism overflow-hidden rounded-xl">
      <Link href={`/eventDetail/${event._id}`}>
    <div className="top">
       <img
        className='w-full object-cover md:h-52'
        src={image} 
        alt="image"
        />
    </div>
        </Link>


    <div className="flex flex-col gap-3 p-3">


      <div className="flex  justify-between md:text-sm text-base  text-[#c8c8c8]">


        <div className='flex flex-col gap-2'>
        <span>
          Organiser
        </span>

        <Link href={`/profile/${organisedBy?._id}`}><div className='flex items-center flex-row-reverse gap-2'>
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
        </Link> 

        </div>


      
          <span className="date font-medium text-[#efefef]">
            {formattedDate}
          </span>
        

      </div>
      
      <div className="text-[#efefef] font-medium text-">
        Venue - <span className='font-semibold'>{address.substring(0,40)}...</span>
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
      {/* <Link href={`/eventDetail/${event._id}`}> */}
        <Link href={`/eventDetail/${event._id}`}>
        <span className="button-content">Know More</span>
        </Link>
      </button>
      
      {type && <div className='flex items-center gap-4 p-2'>
          <button className=' border-2 rounded-lg border-[#238636] hover:bg-transparent hover:text-[#238636] bg-[#238636] px-4 py-1 text-white'>Edit</button>
          <button className='border-2 rounded-lg border-red-600 text-red-500 px-2 py-1 hover:bg-red-600 hover:text-white' onClick={handleDeleteMeetup}>{isDeleting?"Deleting...":"Delete"}</button>
      </div> }
    </div>



  </div>
  )
}

export default EventItem