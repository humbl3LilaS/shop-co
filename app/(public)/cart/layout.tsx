import QueryProvider from "@/feature/public/product/components/query-provider";

const CartLayout = ({
                                  children,
                              }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
};

export default CartLayout;