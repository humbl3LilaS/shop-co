const OverviewLayout = ({
                            children,
                            chart,
                            visit,
                            products,
                            customers
                        }: Readonly<{
    children: React.ReactNode;
    chart: React.ReactNode;
    visit: React.ReactNode;
    products: React.ReactNode;
    customers: React.ReactNode;
}>) => {
    return (
        <div className={"p-8 grid grid-cols-5 grid-rows-overview gap-4 overflow-y-scroll"}>
            {children}
            {chart}
            {visit}
            {products}
            {customers}
        </div>
    );
};

export default OverviewLayout;