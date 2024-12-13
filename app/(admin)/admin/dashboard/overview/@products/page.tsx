import Container from "@/components/admin/Container";
import {Button} from "@/components/ui/button";
import {Settings2} from "lucide-react";
import TopProducts from "@/feature/admin/overview/components/top-products";

const TopProductsPage = () => {
    return (
        <Container className={"col-span-3 row-span-2"}>
            <div className={"w-full h-full p-8 bg-white rounded-xl shadow-md"}>
                <header className={"flex items-center justify-between"}>
                    <div>
                        <h2 className={"font-bold"}>Top Products</h2>
                        <p className={"font-semibold text-black/40 text-sm"}>Best selling products in your store</p>
                    </div>
                    <Button variant={"ghost"}>
                        <Settings2/>
                    </Button>
                </header>
                <TopProducts/>
            </div>
        </Container>
    );
};

export default TopProductsPage;