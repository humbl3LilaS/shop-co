import {auth} from "@/auth";
import DiscountBanner from "@/components/discount-banner";

const Header = async () => {
    const session = await auth();
    return (
        <header>
            <DiscountBanner bannerVisible={!session}/>
        </header>
    );
};

export default Header;