const OverviewLayout = ({
                            children,
                            chart,
                            visit
                        }: Readonly<{
    children: React.ReactNode;
    chart: React.ReactNode;
    visit: React.ReactNode;
}>) => {
    return (
        <div className={"p-8 grid grid-cols-5 grid-rows-overview gap-4"}>
            {children}
            {chart}
            {visit}
        </div>
    );
};

export default OverviewLayout;