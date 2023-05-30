import React from 'react'
import EventItem from './Event'
import ContentWrapper from './ContentWrapper'
const Events = ({events,type}) => {

  return (
    <section className='py-8 px-5 md:px-7 lg:px-10 '>
        <ContentWrapper key={"23"} className=" max-w-5xl flex-col md:flex-row items-center flex-wrap  gap-5  justify-center lg:justify-start">
                {events.map((event)=>(
                  <EventItem
                  event={event}
                  key={event.name}
                  type={type}
                  />
                ))}
        </ContentWrapper>
    </section>
  )
}

export default Events