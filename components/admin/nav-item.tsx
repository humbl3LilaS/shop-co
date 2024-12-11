"use client"
import {ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

type NavItemProps = {
    data: {
        icon: ReactNode;
        title: string;
    }
}
const NavItem = ({data}: NavItemProps) => {
    const pathname = usePathname();
    const pathArray = pathname.split("/");
    const currentPath = pathArray[pathArray.length - 1];
    return (
        <li key={data.title}
            className={cn("flex items-center gap-x-3", currentPath === data.title && "text-blue-600")}
        >
            {data.icon}
            <Link
                href={`/admin/dashboard/${data.title}`}
                className={"capitalize font-semibold"}
            >
                {data.title}
            </Link>
        </li>
    );
};

export default NavItem;