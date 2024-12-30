import Header from "@/components/client/header";
import Footer from "@/components/client/footer";

import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const PublicLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <body>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
        </body>
    );
};

export default PublicLayout;
