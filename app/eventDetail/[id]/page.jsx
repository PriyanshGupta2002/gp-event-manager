"use client"
import React, { useEffect, useState } from 'react'
import {useParams} from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import ContentWrapper from '@components/ContentWrapper'
import Link from 'next/link'

const EventDetailPage = () => {
    const [eventDetails, seteventDetails] = useState({})
    const {id} =  useParams()
    
    useEffect(() => {
        const fetchSinglePost=async()=>{
            const {data} = await axios.get(`/api/meetups/${id}`)
            console.log(data)
            seteventDetails(data)
        }
        fetchSinglePost()
    }, [id])
  

    const eventDate =  new Date(eventDetails?.date)
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = eventDate.toLocaleDateString('en-US', options);

  return (
    <div className='p-9'>
        <ContentWrapper className="w-full overflow-hidden max-w-5xl glassmorphism flex-col  md:flex-col flex flex-wrap ">
            <div className="right w-full">
              <img
              src={eventDetails?.image}
              className='w-full h-full object-cover'
              />
            </div>
            <div className="left text-white flex flex-col gap-4  w-full p-5" >
             <Link href={`/profile/${eventDetails?.organisedBy?._id}`}>
              <div className='flex items-center gap-2'>
                <span className="text-gray-400">Organiser - <span className='text-base  font-semibold text-gray-200 '> {eventDetails?.organisedBy?.username} </span></span> 
                <Image
                src={eventDetails?.organisedBy?.image}
                width={40}
                height={40}
                className='rounded-full object-contain'
                alt="username"
                />
             </div>
             </Link> 
              <span className='text-gray-400'>Date - {formattedDate}</span>
              <hr className='border-t border-gray-700'/>
              <span className='text-gray-400'>Address - <span className='text-gray-200 font-semibold'>{eventDetails?.address}</span></span>
              <hr className='border-t border-gray-700'/>
              <span className='text-5xl green_gradient font-bold'>{eventDetails?.name}</span>
              <p className='font-semibold text-justify'>{eventDetails?.desc}</p>
              {/* <span></span> */}
            </div>
        </ContentWrapper>
    </div>
  )
}

export default EventDetailPage