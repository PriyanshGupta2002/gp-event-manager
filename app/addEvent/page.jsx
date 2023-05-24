"use client"
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import upload from '@utils/uploadImage'
import axios from 'axios'

const addEvent = () => {
  const {data:session,status} = useSession()
  const router = useRouter()
  const [isSubmitting, setisSubmitting] = useState(false)
  const [formData, setformData] = useState({
    name:"",
    desc:"",
    organisedBy:"",
    date:"",
    address:"",
    image:null
  })
  const handleChange=(e)=>{

 
      setformData({...formData,[e.target.name]:e.target.value})
    
  }
  const handleImageChange=(e)=>{
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
        setformData({...formData,image:file})
    }
    else{
      setformData({...formData,image:null})
      alert("Please select a valid image file")
    }
  }

  const removeImage=()=>{
    setformData({...formData,image:null})
  }

  const handleSubmit=async(e)=>{
    //api call
    e.preventDefault()
    setisSubmitting(true)
    if (!formData.image) {
      setisSubmitting(false)
      return
    }
    try {
      const imageUrl = await upload(formData.image)
      const res = await axios.post('/api/meetups/create',{...formData,image:imageUrl,organisedBy:session?.user?.id})
      if (res.status>=200 && res.status<300) {
        router.push("/")
      }else{
        return
      }
    } catch (error) {
      setisSubmitting(false);
      console.log(error)
    }
  }
  if (status==="unauthenticated") {
    redirect("/")
  }

  return (
    <Form
    type={"Add"}
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    formData={formData}
    handleImageChange={handleImageChange}
    removeImage={removeImage}
    isSubmitting={isSubmitting}
    />
  )
}

export default addEvent