"use client"
import Events from '@components/Events'
// import { events } from '@utils/meetupData'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



const home = () => {

  const [events, setEvents] = useState([])



  useEffect(() => {
    const getEvents=async()=>{
      const {data} = await axios.get('/api/meetups')
      setEvents(data)
    }
    getEvents()
  }, [])


  
  return (
    <Events events={events}/>
  )
}

export default home