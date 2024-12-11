import Header from "@/components/client/header";

const ProfileLayout = ({
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
        </>
    );
};

export default ProfileLayout;