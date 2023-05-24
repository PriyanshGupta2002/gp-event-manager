
import { footerLinks } from '@utils/constants'
import Link from 'next/link'
import React from 'react'
import SocialDial from './SocialDial'
import ContentWrapper from './ContentWrapper'
const Footer = () => {
  return (
    <footer className='bg-[#222222] py-10'>
        <ContentWrapper key={"1"} className=' flex-col gap-10  md:flex-wrap justify-start md:flex-row max-w-[1086px]  md:justify-between  px-5  lg:px-0'>
        <Link href="/"> <div className="blue_gradient font-extrabold lg:text-3xl cursor-pointer transition-all ease-linear text-3xl logo ">
        GpEvents.
      </div> </Link>

                {footerLinks.map((link)=>(
                    <div className='flex flex-col gap-3 '>
                        <span className='text-[#a8a8a8] capitalize md:text-xs hover:text-[#fefefe] '>
                            {link.headLink}
                        </span>
                        <div className='flex flex-col gap-4'>
                            {link.subLinks.map((sub)=>(
                                <span className=' text-base lg:text-sm text-[#f5f5f5]'>
                                    {sub}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <SocialDial/>
        </ContentWrapper>  
        <hr className='my-7 border-none bg-[#6f6f6f] h-[1.7px]' />
        <ContentWrapper key={"2"} className='md:px-8 lg:px-0 flex-col md:flex-row  max-w-[1086px] items-center justify-between'>
            <span className='text-2xl text-white font-bold transition-all ease-in-out duration-300 hover:text-pink-600 cursor-pointer'>
            &copy; All Rights Reserved - 2023
            </span>
            
            <Link href={"https://nextjs.org/"} target='_blank'>
           <button className="btn">
        <div className="text">
          <span>Made</span>
          <span>in</span>
          <span>❤️</span>
          <span> with </span>
          <span> NextJs </span>
        </div>
        <div className="clone">
          <span>Made</span>
          <span>in</span>
          <span>❤️</span>
          <span> with </span>
          <span> NextJs </span>
        </div>
        <svg width="20px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
      </Link>
        </ContentWrapper>
    </footer>
  )
}

export default Footer