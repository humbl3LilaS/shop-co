import Header from "@/components/share/header";
import Footer from "@/components/share/footer";

const PublicLayout = ({
                          children,
                      }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default PublicLayout;