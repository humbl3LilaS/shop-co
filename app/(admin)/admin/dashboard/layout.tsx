import SideNav from "@/components/admin/side-nav";

const DashboardLayout = ({
                             children,
                         }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main>
            <div className={"w-screen h-screen grid grid-cols-12 gap-x-4"}>
                <SideNav/>
                <div className={"col-span-10"}>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;