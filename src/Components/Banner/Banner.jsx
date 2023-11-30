import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const Banner = () => {
  return (
    <div>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
            <div className='w-full h-[560px] bg-[#303030] flex flex-col justify-center gap-6 text-center'>
                <h2 className='text-4xl text-white font-bold'>Empower Your HR Journey with Our Assets Management</h2>
                <div>
                <Link to='/joinHr'>
                
                <button className='btn btn-primary'>Join As Hr</button>
                </Link>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='w-full h-[560px] bg-[#303030] flex flex-col justify-center gap-6 text-center'>
                <h2 className='text-4xl text-white font-bold'>Empower Your Employee Journey with Our Assets Management</h2>
                <div>
<Link to='/joinEmploye'>

                <button className='btn btn-primary'>Join As Employe</button>
</Link>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner
