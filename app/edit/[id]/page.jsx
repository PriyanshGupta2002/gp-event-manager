"use client"
import Form from '@components/Form'
import { useFetch } from '@hooks/useFetch'
import upload from '@utils/uploadImage'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const editPage = ({params:{id}}) => {
  const {data,error}= useFetch(`/meetups/${id}`)
  const [isSubmitting, setisSubmitting] = useState(false)
  const router = useRouter()
  const [formData, setformData] = useState({
    name:"",
    desc:"",
    organisedBy:"",
    date:"",
    address:"",
    image:null
  })
  useEffect(() => {
    setformData({...formData,name:data.name,desc:data.desc,organisedBy:data.organisedBy,date:data.date,address:data.address,image:data.image})
  }, [data])

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
    e.preventDefault()
    setisSubmitting(true)
    if (!formData.image) {
      setisSubmitting(false)
      return
    }
    try {
      const imageUrl = await upload(formData.image)
      const res = await axios.put(`/api/meetups/edit/${id}`,{...formData,image:imageUrl})
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


  
  return (
    <Form
    type={"Edit"}
    formData={formData}
    handleChange={handleChange}
    handleImageChange={handleImageChange}
    removeImage={removeImage}
    isSubmitting={isSubmitting}
    handleSubmit={handleSubmit}
    />
  )
}

export default editPage