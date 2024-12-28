import SideNav from "@/components/admin/side-nav";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main>
            <div className={"w-screen h-screen grid grid-cols-12"}>
                <SideNav />
                <div className={"col-span-10 overflow-y-scroll bg-[#f0f0f0]"}>
                    <header className={"px-8 pt-8 pb-4 sticky top-0 z-10 bg-[#f0f0f0]"}>
                        <h2 className={"text-3xl font-bold"}>Dashboard</h2>
                    </header>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;
