import React from 'react'

const Backdrop = ({setShowBackdrop,image}) => {

  const isImageUrl = typeof image === 'string' && image.startsWith('http');
  const imageUrl = isImageUrl ? image : URL.createObjectURL(image);
  return (
    <div
    className='backdrop'
    onClick={()=>setShowBackdrop(false)}
  >
    <img src={imageUrl} alt="Preview" style={{ maxWidth: '80%', maxHeight: '80%' }} />
    <button className='absolute top-3 right-3 p-1 text-[#fff] font-bold text-2xl  border-none cursor-pointer' onClick={()=>setShowBackdrop(false)}>
        X
    </button>
  </div>
  )
}

export default Backdrop