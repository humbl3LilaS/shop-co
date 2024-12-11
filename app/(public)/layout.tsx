import Header from "@/components/client/header";
import Footer from "@/components/client/footer";
import QueryProvider from "@/feature/client/product/components/query-provider";
import {Toaster} from "@/components/ui/toaster";

const PublicLayout = ({
                          children,
                      }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <body>
        <QueryProvider>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </QueryProvider>
        <Toaster/>
        </body>
    );
};

export default PublicLayout;