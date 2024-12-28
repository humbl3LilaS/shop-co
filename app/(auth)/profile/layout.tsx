import Header from "@/components/client/header";

const ProfileLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className={"w-dvw h-dvh md:w-screen md:h-screen overflow-y-scroll"}>
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default ProfileLayout;
