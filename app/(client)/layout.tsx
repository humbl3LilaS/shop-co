import Header from "@/components/client/header";
import Footer from "@/components/client/footer";

import { Toaster } from "@/components/ui/toaster";

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
        </body>
    );
};

export default PublicLayout;
