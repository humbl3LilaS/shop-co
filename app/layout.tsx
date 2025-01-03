import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import QueryProvider from "@/feature/client/product/components/query-provider";

const satoshi = localFont({
    src: [
        {
            path: "./fonts/satoshi/Satoshi-Bold.woff2",
            weight: "700",
        },
        {
            path: "./fonts/satoshi/Satoshi-Regular.woff2",
            weight: "400",
        },
    ],
    variable: "--font-body",
});

const integralCF = localFont({
    src: [
        {
            path: "./fonts/integralCF/integralcf-bold.otf",
        },
    ],
    variable: "--font-title",
});

export const metadata: Metadata = {
    title: "ShopCo",
    description: "S",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${satoshi.variable} ${integralCF.variable} font-sans`}>
            <QueryProvider>{children}</QueryProvider>
        </html>
    );
}
