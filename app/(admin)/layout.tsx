export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <body className={"overflow-hidden"}>{children}</body>;
}
