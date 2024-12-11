import {Button} from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
    return (
        <section>
            <div className={"md:grid grid-cols-2 md:bg-[#f2f0f1]"}>
                <div className={"py-10 px-4 md:pb-0 md:px-10  lg:px-25 lg:flex flex-col justify-center items-start"}>
                    <h2 className={"mb-5 text-4xl font-bold uppercase font-title tracking-wide lg:text-[54px] leading-none lg:mb-7"}>
                        find clothes that matches your style
                    </h2>
                    <p className={"mb-6 text-[14px] text-black/60 lg:text-base lg:mb-8"}>
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your
                        individuality and cater to your sense of style.
                    </p>
                    <Button className={"w-full py-4 mb-5 rounded-2xl font-bold lg:w-[200px] lg:mb-14"}>
                        Shop Now
                    </Button>
                    <div className={"px-6 grid grid-cols-4 grid-rows-2 gap-y-6 lg:grid-cols-6 lg:w-full lg:px-0"}>
                        <div className={"col-span-2 border-r border-r-black/60"}>
                            <p className={"mb-2 text-2xl font-bold"}>200+</p>
                            <p className={"text-xs text-black/60"}>International Brands</p>
                        </div>
                        <div className={"pl-4 col-span-2 text-left lg:border-r lg:border-r-black/60"}>
                            <p className={"mb-2 text-2xl font-bold"}>2000+</p>
                            <p className={"text-xs text-black/60"}>High-Quality Products</p>
                        </div>
                        <div className={"col-start-2 col-span-2 lg:pl-4 lg:col-start-5"}>
                            <p className={"mb-2 text-2xl font-bold"}>30,000+</p>
                            <p className={"text-xs text-black/60"}>Happy Customer</p>
                        </div>
                    </div>
                </div>
                <div className={"max-h-[600px]  relative"}>
                    <Image
                        src={"/images/banner-mobile.png"}
                        alt={"banner image"}
                        width={400}
                        height={500}
                        className={"w-full max-h-[600px] object-cover bg-center"}
                    />
                    <Image
                        src={"/icons/star.svg"}
                        alt={"star"}
                        width={40}
                        height={40}
                        className={"absolute z-20 block top-10 right-5"}
                    />
                    <Image
                        src={"/icons/star.svg"}
                        alt={"star"}
                        width={40}
                        height={40}
                        className={"absolute z-20 block top-32 left-7"}
                    />

                </div>
            </div>
        </section>
    );
};

export default Hero;