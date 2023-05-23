import React from 'react'

const ContentWrapper = ({className,children}) => {
  return (
    <div className={`w-full flex  ${className} m-auto`}>
        {children}
    </div>
  )
}

export default ContentWrapper