"use client"

import TestimonialCard from "@/components/testimonial-card";
import {TESTIMONIALS} from "@/constants";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import "swiper/css/navigation"
import SwiperNavButton from "@/components/swiper-nav-button";

const Testimonials = () => {
    return (
        <section className="relative px-4 mb-12.5  md:px-10 lg:px-25 lg:mb-20 z-10">
            <header>
                <div className="mb-7 flex justify-between items-end">
                    <h2 className={"max-w-[270px] text-3xl font-bold font-title uppercase"}>Our happy customer</h2>
                </div>
            </header>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                loop={true}
                style={{
                    position: "unset",
                }}

            >
                {
                    TESTIMONIALS.map((item, idx) =>
                                         <SwiperSlide
                                             key={`${item.name}+${idx}`}
                                         >
                                             <TestimonialCard
                                                 data={item}
                                             />
                                         </SwiperSlide>
                    )
                }
                <SwiperNavButton/>
            </Swiper>
        </section>
    );
};

export default Testimonials;