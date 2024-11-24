const DashboardLayout = ({
                             children,
                         }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <header className={"p-5 bg-slate-600 text-white"}>
                Dash board layout
            </header>
            {children}
        </>
    );
};

export default DashboardLayout;