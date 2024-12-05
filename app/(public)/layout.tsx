import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
import QueryProvider from "@/feature/public/product/components/query-provider";

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