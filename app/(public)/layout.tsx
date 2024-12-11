import Header from "@/components/client/header";
import Footer from "@/components/client/footer";
import QueryProvider from "@/feature/client/product/components/query-provider";

const PublicLayout = ({
                          children,
                      }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <QueryProvider>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </QueryProvider>
    );
};

export default PublicLayout;