import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={"overflow-hidden"}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
        </body>
    );
}
