import {auth} from "@/auth";
import DiscountBanner from "@/components/discount-banner";
import {CircleUser, Search} from "lucide-react";
import Link from "next/link";
import NavSearch from "@/components/NavSearch";
import MobileMenu from "@/components/mobile-menu";
import CartButton from "@/components/cart-button";

const Header = async () => {
    const session = await auth();
    return (
        <header>
            <DiscountBanner bannerVisible={!session}/>
            <nav
                className={"py-6 px-5 flex items-center shadow gap-x-5  lg:px-25 lg:justify-between lg:gap-x-8 xl:gap-x-14"}>
                <MobileMenu/>
                <h1 className={"mb-2 text-2xl font-bold uppercase font-title "}>
                    <Link href={"/public"}>
                        shop.co
                    </Link>
                </h1>
                <ul className={"hidden items-center  gap-x-4 lg:flex"}>
                    <li>
                        {/*Todo: extract into dropdown later*/}
                        <Link href="/shop">
                            Shops
                        </Link>
                    </li>
                    <li>
                        <Link href="/on-sale">
                            On Sale
                        </Link>
                    </li>
                    <li>
                        <Link href="/new-arrivals">
                            New Arrivals
                        </Link>
                    </li>
                    <li>
                        <Link href="/brands">
                            Brands
                        </Link>
                    </li>
                </ul>
                <NavSearch/>
                <div className={"ml-auto flex items-center gap-x-3 font-bold lg:ml-0 lg:gap-x-5"}>
                    {/*TODO: extract into search function in mobile view*/}
                    <Search strokeWidth={3} className={"lg:hidden"}/>

                    <CartButton/>

                    {/*TODO: extract into profile popup*/}
                    <Link href={"/profile"}>
                        <CircleUser strokeWidth={3}/>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;