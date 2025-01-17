"use client";
import { useSwiper } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SwiperNavButton = () => {
    const swiper = useSwiper();
    return (
        <div
            className={"flex items-center gap-x-5 absolute top-12 right-4 md:right-10 lg:right-25"}
        >
            <ArrowLeft onClick={() => swiper.slidePrev()} className={"cursor-pointer"} />
            <ArrowRight onClick={() => swiper.slideNext()} className={"cursor-pointer"} />
        </div>
    );
};

export default SwiperNavButton;
