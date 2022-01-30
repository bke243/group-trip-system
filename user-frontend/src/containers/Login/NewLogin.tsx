import { MapIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import { Footer } from '../../components/Footer';
const images = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1519&q=80',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
]

const features = [
  {
    name: 'Fastest way to start your journey',
    description:
      "You'll travel the local way on the group vacation tour. We offer low-cost vacation packages and once-in-a-lifetime experiences. Book an Intrepid trip today and get started on your adventure right away.",
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      "We provide Free Group Travel Website and Free Account that Never Expires.  No contract.  Cancel Anytime. Sign up for free and start your journey now.",
    icon: ScaleIcon,
  },

]

export const NewLogin = () => {
  return <div className='w-full h-auto'>
    <div className='w-full h-auto bg-white sticky top-0 left-0 right-0 flex items-center z-30 justify-center py-4 shadow-md'>
      <div className='container flex flex-row justify-between text-zinc-700 '>
        <div className='inline-flex items-center'>
          <MapIcon className='h-7 w-7 mr-2 text-zinc-700 ' />
          <p className='text-lg font-semibold'>Group Trip Settlement</p>
        </div>
        <div className=' inline-flex items-center justify-center space-x-4'>
          <Link to={'/login'} className='text-zinc-700 font-semibold'>Login</Link>
          <Link to={'/register'} className='bg-purple-700 hover:bg-purple-800 rounded-lg shadow-md px-3 py-2 text-white font-semibold'>Register</Link>
        </div>
      </div>
    </div>
    <div className='w-full h-[500px] bg-gray-300 relative'>
      <img src={images[Math.floor(Math.random() * 4)]} className='absolute w-full brightness-50 z-10 h-[550px] object-cover' alt="" />
      <div className='absolute w-full z-20 h-[550px] flex justify-center items-center' >
        <div className='container'>
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Find your way</span><br />{' '}
            <span className="block text-indigo-600 xl:inline">with your group!</span>
          </h1>
          <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Group Trip Settlement is the best place to start your journey with your friends, family, and your loved ones!
          </p>
        </div>

      </div>
    </div>
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Trips for everybody</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to start a new trip
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our Group travel tours can help shape and simplify your holiday, whether you're arranging a family reunion or business group trip. we provide top quality group trip service. Use our website and you will have a change to explore the world with your loved ones.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>;
};
