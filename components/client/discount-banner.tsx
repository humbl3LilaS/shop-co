"use client"

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";

type DiscountBannerProps = {
    bannerVisible: boolean,
}

const DiscountBanner = ({bannerVisible}: DiscountBannerProps) => {
    const [visible, setVisible] = useState(bannerVisible)

    return (
        <>
            {visible && (
                <div className={"relative bg-black text-white text-center z-10"}>
                    <p className={"py-3 text-sm md:text-base"}>
                        Sign up and get 20% off to your first order.
                        <br className={"md:hidden"}/>
                        <Link
                            href={"/auth/sign-up"}
                            className={"font-bold border-b border-b-white"}
                        >
                            &nbsp;Sign Up Now
                        </Link>
                    </p>
                    <Button
                        variant="link"
                        onClick={() => setVisible(false)}
                        className={"block size-5 my-4 top-0 right-4 absolute z-20 md:my-1.5"}
                    >
                        <X className={"size-4 text-white"}/>
                    </Button>
                </div>
            )}
        </>

    );
};

export default DiscountBanner;