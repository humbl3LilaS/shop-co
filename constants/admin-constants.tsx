import {Briefcase, ChartArea, LayoutGrid, ShoppingCart, Truck, Users, WalletMinimal} from "lucide-react";

export const NAV_ITEMS = [
    {
        icon: <LayoutGrid/>,
        title: "overview"
    },
    {
        icon: <ShoppingCart />,
        title: "orders",
    },
    {
        icon: <Briefcase />,
        title: "products",
    },
    {
        icon: <Users />,
        title: "customers",
    },
    {
        icon: <ChartArea />,
        title: "reports",
    },
    {
        icon: <WalletMinimal />,
        title: "transactions"
    },
    {
        icon: <Truck />,
        title: "shipment",
    }
]