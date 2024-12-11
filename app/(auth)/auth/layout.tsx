const AuthLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <body>
        <main>
            {children}
        </main>
        </body>
    );
};

export default AuthLayout;