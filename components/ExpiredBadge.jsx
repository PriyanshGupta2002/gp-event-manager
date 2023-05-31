import React from 'react'

const ExpiredBadge = () => {
  return (
    <div 
  className="inline-flex absolute right-0 top-0 z-10 items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="-ms-1 me-1.5 h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  <p className="whitespace-nowrap text-sm">Expired</p>
</div>
  )
}

export default ExpiredBadge