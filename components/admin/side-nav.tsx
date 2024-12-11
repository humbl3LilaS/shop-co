import Link from "next/link";

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
                <nav>

                </nav>
            </aside>
        </div>
    );
};

export default SideNav;