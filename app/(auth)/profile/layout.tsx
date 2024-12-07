import Header from "@/components/share/header";

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