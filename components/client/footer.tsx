import Link from "next/link";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import { FOOTER_SUB_NAVS } from "@/constants/ui-constants";
import FooterSubNav from "@/components/client/footer-sub-nav";
import Image from "next/image";
import NewsletterFrom from "@/components/client/newsletter-from";

const Footer = () => {
    return (
        <>
            <NewsletterFrom />
            <footer>
                <div
                    className={
                        "px-4 mb-12.5 grid grid-cols-2 gap-y-6 md:px-10 md:grid-cols-4  lg:px-25 lg:mb-20 lg:grid-cols-6"
                    }
                >
                    <div className={"col-span-2 md:col-span-4 lg:col-span-2"}>
                        <h2 className={"mb-3 text-2xl font-bold uppercase font-title "}>
                            <Link href={"/public"}>shop.co</Link>
                        </h2>
                        <p className={"mb-5 text-black/60 lg:max-w-[250px]"}>
                            We have clothes that suits your style and which you’re proud to wear.
                            From women to men.
                        </p>
                        <ul className={"flex items-center gap-x-3"}>
                            <li
                                className={
                                    "size-8 flex items-center justify-center border-[1.5px] border-black/40  rounded-full"
                                }
                            >
                                <Link href="https://facebook.com">
                                    <Twitter size={16} fill="black" />
                                </Link>
                            </li>
                            <li
                                className={
                                    "size-8 flex items-center justify-center border-[1.5px] border-black/40  rounded-full"
                                }
                            >
                                <Link href="https://facebook.com">
                                    <Facebook size={16} fill="black" />
                                </Link>
                            </li>
                            <li
                                className={
                                    "size-8 flex items-center justify-center border-[1.5px] border-black/40  rounded-full"
                                }
                            >
                                <Link href="https://facebook.com">
                                    <Instagram size={16} />
                                </Link>
                            </li>
                            <li
                                className={
                                    "size-8 flex items-center justify-center border-[1.5px] border-black/40  rounded-full"
                                }
                            >
                                <Link href="https://facebook.com">
                                    <Github size={16} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {FOOTER_SUB_NAVS.map((item, idx) => (
                        <FooterSubNav data={item} key={idx} />
                    ))}
                </div>
                <div
                    className={
                        "px-4 mb-12.5  md:px-10 lg:px-25 lg:mb-20 lg:flex lg:items-center lg:justify-between"
                    }
                >
                    <hr />
                    <p className={"mt-4 text-center text-black/60 lg:text-left lg:flex-1"}>
                        Shop.co © {new Date().getFullYear()}, All Rights Reserved
                    </p>
                    <ul className={"mt-3 flex items-center justify-center gap-x-4"}>
                        <li
                            className={
                                "w-fit px-4 py-3 bg-white shadow-lg border border-black/20 rounded-xl"
                            }
                        >
                            <Image
                                src={"/images/visa.png"}
                                alt={"visa"}
                                width={40}
                                height={26}
                                className={"w-[40px] h-[16px]"}
                            />
                        </li>
                        <li
                            className={
                                "w-fit px-4 py-3 bg-white shadow-lg border border-black/20 rounded-xl"
                            }
                        >
                            <Image
                                src={"/images/mastercard.png"}
                                alt={"mastercard"}
                                width={40}
                                height={26}
                                className={"w-[40px] h-[16px]"}
                            />
                        </li>
                        <li
                            className={
                                "w-fit px-4 py-3 bg-white shadow-lg border border-black/20 rounded-xl"
                            }
                        >
                            <Image
                                src={"/images/paypal.png"}
                                alt={"paypal"}
                                width={40}
                                height={26}
                                className={"w-[40px] h-[16px]"}
                            />
                        </li>
                        <li
                            className={
                                "w-fit px-4 py-3 bg-white shadow-lg border border-black/20 rounded-xl"
                            }
                        >
                            <Image
                                src={"/images/apple-pay.png"}
                                alt={"apple-pay"}
                                width={40}
                                height={26}
                                className={"w-[40px] h-[16px]"}
                            />
                        </li>
                        <li
                            className={
                                "w-fit px-4 py-3 bg-white shadow-lg border border-black/20 rounded-xl"
                            }
                        >
                            <Image
                                src={"/images/g-pay.png"}
                                alt={"g-pay"}
                                width={40}
                                height={26}
                                className={"w-[40px] h-[16px]"}
                            />
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default Footer;
