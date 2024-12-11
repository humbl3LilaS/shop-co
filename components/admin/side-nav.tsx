import Link from "next/link";
import {NAV_ITEMS} from "@/constants/admin-constants";
import NavItem from "@/components/admin/nav-item";

const SideNav = () => {
    return (
        <div className={"col-span-2 w-full h-full pl-8 py-8"}>
            <aside>
                <h1
                    className={"mb-3 text-2xl font-bold uppercase font-title "}>
                    <Link href={"/admin/dashboard/overview"}>
                        shop.co
                    </Link>
                </h1>
                <nav className={"pt-8"}>
                    <ul className={"flex flex-col gap-y-8"}>
                        {
                            NAV_ITEMS.map((item) => (
                                <NavItem data={item} key={item.title}/>
                            ))
                        }
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default SideNav;