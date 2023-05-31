"use client"
import ContentWrapper from '@components/ContentWrapper'
import Events from '@components/Events'
import Loader from '@components/Loader'
import NoEvents from '@components/NoEvents'
import { useFetch } from '@hooks/useFetch'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const {id} = useParams()
  const {data:session,status} = useSession()
   const {data,error} = useFetch(`/users/${id}`)
   const {data:meetData} = useFetch("/meetups")
   const [isFollowing, setIsFollowing] = useState(false)
    const [meetups, setMeetups] = useState([])
    const [followerCount, setfollowerCount] = useState(null)
 
  useEffect(() => {
    if (meetData) {
      setMeetups(meetData.filter((meet)=>meet.organisedBy._id===id))
    }
  }, [id,meetData])

  useEffect(() => {
    if (data) {
      setfollowerCount(data?.followers?.length)
      if (data?.followers?.includes(session?.user?.id)) {
        setIsFollowing(true)
       }else{
        setIsFollowing(false)
       }
    }
  }, [data,data?.followers,session])

  

  const profileBackgroundColors = ["bg-gradient-to-r from-purple-500 to-pink-500","bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%","bg-gradient-to-r from-sky-500 to-indigo-500"]
  const randomIndex = Math.floor(Math.random() * profileBackgroundColors.length);
  const randomProfileBackgroundColor = profileBackgroundColors[randomIndex];
  if (status==='unauthenticated') {
    redirect('/')
  }
  if (status === "loading") {
    return <Loader/>;
  }

  const handleFollowUser = async()=>{
    try {
      const {data} = await axios.patch(`/api/users/follow/${id}`,{id:session.user.id})
      if (data==="Successfully followed") {
        setIsFollowing(true)
        setfollowerCount((prevState)=>prevState+1)
      }else{
        setIsFollowing(false)
        setfollowerCount((prevState)=>prevState-1)

      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <section className=''>
      <div key={1} className={`wrapper flex flex-col gap-2 items-center justify-center ${randomProfileBackgroundColor}  h-[50vh]`}>
               {data.image && <Image
                src={data.image}
                width={100}
                height={100}
                className='rounded-full'
                alt="username"
                />}
                <span className='text-white font-semibold'>
                  {data?.username} ✅
                </span>
               <a href={`mailto:${data?.email}`} target='_blank'> 
               <span className='text-gray-700 font-bold'>
                  {data?.email} 📧
                </span>
                </a>
                  {id !== session?.user?.id && <button className={`py-2 px-3  rounded-xl relative ${isFollowing ?"bg-purple-700" :"bg-purple-500"} text-white font-semibold`} onClick={handleFollowUser}>
                      {isFollowing ? "Following":"Follow"}
                  </button>}
                  <div className='flex gap-5 items-center'>
                    <span className='text-gray-100'>Followers - {followerCount}</span>
                    <span className='text-gray-100'>Following - {data?.following?.length}</span>
                  </div>
      </div>
      <ContentWrapper className="max-w-5xl flex flex-col gap-7 p-4" key={859}>
            <h2 className='text-white text-4xl font-bold blue_gradient '>
              Welcome, <br className='md:hidden'/> {data?.username} <br className='md:hidden'/> to your personalized profile.
            </h2>
      </ContentWrapper>
            {/* <hr className='border-t border-gray-700 my-4' /> */}
             {meetups.length ===0 ?  <NoEvents/> : <h3 className='max-w-5xl p-2 text-white font-semibold m-auto text-4xl blue_gradient'>Your Events</h3>}
          <Events
          events={meetups}
          type="owner"
          />
    </section>
  )
}

export default page