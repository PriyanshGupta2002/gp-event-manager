import React, { useState } from 'react'
import Backdrop from './Backdrop';
const Form = ({type,handleSubmit,handleChange,formData,handleImageChange,removeImage,isSubmitting}) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [showbackdrop, setShowBackdrop] = useState(false)

  return (
    <section className='flex flex-col  p-4 max-w-3xl w-full gap-5 mx-auto my-7'>
        <h1 className='orange_gradient font-extrabold text-3xl'>
            {type} Event
        </h1>

        <form action="" className='flex flex-col glassmorphism p-4 gap-7 rounded-lg' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
              <label htmlFor="name" className=' font-semibold text-zinc-300 '>Event Name</label>
              <input className='focus:border-[3px] border-[3px] border-white focus:border-pink-400 focus:ring-pink-400 focus:outline-none px-4 py-2 rounded-2xl'  value={formData.name} type="text" name='name' onChange={handleChange}  required />
          </div>
          <div className='flex flex-col gap-1'>
              <label htmlFor="address" className=' font-semibold text-zinc-300 '>Address</label>
              <input className='focus:border-[3px] border-[3px] border-white focus:border-pink-400 focus:ring-pink-400 focus:outline-none px-4 py-2 rounded-2xl' value={formData.address} type="text" name='address' onChange={handleChange}  required />
          </div>
          <div className='flex flex-col gap-1'>
              <label htmlFor="date" className=' font-semibold text-zinc-300 '>Date</label>
              <input className='focus:border-[3px] border-[3px] border-white focus:border-pink-400 focus:ring-pink-400 focus:outline-none px-4 py-2 rounded-2xl' value={formData.date} type="date" name='date' onChange={handleChange} min={getCurrentDate()} required  />
          </div>
          <div className='flex flex-col gap-1'>
              <label htmlFor="desc" className=' font-semibold text-zinc-300 '>Description</label>
              <textarea className='focus:border-[3px] border-[3px] border-white focus:border-pink-400 focus:ring-pink-400 focus:outline-none px-4 py-2 rounded-2xl' value={formData.desc} rows={6} type="text" name='desc' onChange={handleChange}  required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="image" className='bg-[#21262d] px-4 rounded-md py-1 w-fit cursor-pointer text-[#e3e3e3]'>Upload Image</label>
            <input className='focus:border-[3px] hidden border-[3px] border-white focus:border-pink-400 focus:ring-pink-400 focus:outline-none px-4 py-2 rounded-2xl' type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} required/>
            <div className='flex gap-2 items-center'>
            {formData.image && <span className='bg-[#21262d] p-2 rounded-md text-white cursor-pointer w-fit' onClick={()=>setShowBackdrop(true)}>
              Preview
            </span>}
            {formData.image && <span className='text-white bg-neutral-800 py-1 px-2 cursor-pointer' onClick={removeImage}>X</span>}
            </div>
           {showbackdrop && <Backdrop
            setShowBackdrop={setShowBackdrop}
            image={formData.image}
            />}
          </div>
          <button type='submit' disabled={isSubmitting}  className={`p-2 ${isSubmitting?"bg-stone-600 text-gray-400 cursor-not-allowed":"bg-[#238636] text-white hover:bg-[#2ea043]"}  rounded-xl text-xl  font-bold `}>
               {isSubmitting?`${type}ing Event...`:`${type} Event`}
          </button>
        </form>
    </section>
  )
}

export default Form