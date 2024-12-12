export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={"overflow-hidden"}>
        {children}
        </body>
    );
}