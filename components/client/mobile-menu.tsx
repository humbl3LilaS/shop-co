import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild={true} className={"lg:hidden"}>
                <Button variant="link">
                    <Menu className="size-6 h-full" />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader className={"sr-only"}>
                    <SheetTitle>Mobile Menu</SheetTitle>
                </SheetHeader>
                <ul className={"mt-20 flex flex-col justify-center items-center  gap-y-8"}>
                    <li>
                        {/*Todo: extract into dropdown later*/}
                        <Link href="/shop">Shops</Link>
                    </li>
                    <li>
                        <Link href="/on-sale">On Sale</Link>
                    </li>
                    <li>
                        <Link href="/new-arrivals">New Arrivals</Link>
                    </li>
                    <li>
                        <Link href="/brands">Brands</Link>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
