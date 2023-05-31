"use client"
import Events from '@components/Events'
// import { events } from '@utils/meetupData'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'



const home = () => {

  const [events, setEvents] = useState([])
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search');
  

  useEffect(() => {
    const getEvents=async()=>{
      const {data} = await axios.get('/api/meetups')
      if (searchTerm) {
        const filteredEvents = data?.filter((d)=>{
          return d.name.includes(searchTerm) || d.desc.includes(searchTerm) || d.address.includes(searchTerm) || d?.organisedBy?.username?.includes(searchTerm)
        })
        setEvents(filteredEvents)
      }else{
        setEvents(data)
      }
    }
    getEvents()
  }, [searchTerm])


  
  return (
    <Events events={events}/>
  )
}

export default home