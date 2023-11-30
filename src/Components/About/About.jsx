import React from 'react'
import UseHr from '../../hooks/UseHr/UseHr'

const About = () => {
  const [hr] = UseHr()
  console.log(hr)
  const packages = hr[0]?.package;
  console.log(packages)
  return (
    <div>
      <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-wrap justify-center items-center">
    <h2 class="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">Asset Management</h2>
    <div class="md:w-3/5 md:pl-6">
      <p class="leading-relaxed text-base">Our company called Asset Management is creating a web application to help businesses
manage their assets and products. Any company can use this web app by
purchasing a subscription. The main goal of this software is to make it easy for
HR/Admins to track how employees are using company assets. These assets can
be divided into two types: Returnable (like laptop, keyboard, mouse, chair, desk,
cell phones) and Non-returnable (like pens, pencils, paper, diaries, tissue paper).
</p>
      <div class="flex md:mt-4 mt-6">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
        <a class="text-indigo-500 inline-flex items-center ml-4">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default About
