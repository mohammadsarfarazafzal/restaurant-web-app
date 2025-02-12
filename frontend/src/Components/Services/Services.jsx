import React from 'react'
import { useNavigate } from 'react-router-dom'

function Services() {
    const navigateTo=useNavigate();
    const services=[
        {
            icon:"🍽️",
            name:"Elegant Dining",
            description:"Experience an elegant atmosphere with our curated menu, offering a variety of exquisite dishes crafted by our talented chefs.",
    
        },
        {
            icon:"🛵",
            name:"Home Delivery",
            description:"Enjoy our delicious cusions in the comfort of your home with our fast and reliable delivery"
        },
        {
            icon: "🎉",
            name: "Event Catering",
            description:
              "Make your celebrations unforgettable with our professional catering service, offering customizable menus for all occasions.",
          },
          {
            icon: "☕",
            name: "Coffee and Snacks",
            description:
              "Relax with a cup of freshly brewed coffee and indulge in our range of tasty snacks, perfect for any time of the day.",
          },
          {
            icon: "🥘",
            name: "Takeaway",
            description:
              "In a hurry? Grab your favorite meals on the go with our convenient takeaway service.",
          },
    ]
  return (
    <div className='bg-gray-100 min-h-screen py-8'>
        <div className='bg-gray-900 text-white text-center py-5 md:py-10 px-4'>
            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-t from-orange-500 to-yellow-500  bg-clip-text text-transparent'>
                Our Services
            </h1>
            <p className='mt-4 text-lg md:text-xl'>
                We go beyond serving meals,our services are designed to provide an exceptional experience!
            </p>
        </div>

        {/* Services-section */}
        <div className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' >
            {
                services.map((service,index)=>(
                    <div
                     key={index}
                     className='bg-white shadow-md rounded-lg text-center transition-transform hover:scale-105 p-5'
                    >
                        <div className='text-4xl mt-3'>{service.icon}</div>
                        <h3 className='mt-2 text-xl font-bold text-gray-800'>{service.name}</h3>
                        <p className='mt-2 text-gray-600'>{service.description}</p>
                    </div>
                ))
            }
        </div>

        <div className='text-center py-8 px-1'>
            <h2 className='text-3xl font-bold text-orange-500'>Want to know more ?</h2>
            <p className='mt-4 text-lg text-gray-800'>
                Reach out to us or visit our branch to explore the full range of services.
            </p>
            <button 
            onClick={()=>navigateTo('/contact')} className='mt-6 bg-orange-500 text-white px-3 py-3 rounded-md font-semibold hover:bg-orange-600 transition-transform hover:scale-105'>
                Contact Us
            </button>
        </div>
    </div>
  )
}

export default Services