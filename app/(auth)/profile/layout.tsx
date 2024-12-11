import Header from "@/components/client/header";

const ProfileLayout = ({
                           children,
                       }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (

        <body>
            <Header/>
            <main>
                {children}
            </main>
        </body>
    );
};

export default ProfileLayout;