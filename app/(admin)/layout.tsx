import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={"overflow-hidden"}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </body>
    );
}
