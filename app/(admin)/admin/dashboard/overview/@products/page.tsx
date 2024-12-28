import Container from "@/components/admin/Container";
import TopProducts from "@/feature/admin/overview/components/top-products";

const TopProductsPage = () => {
    return (
        <Container className={"col-span-5 row-span-2"}>
            <div className={"w-full h-full p-8 bg-white rounded-xl shadow-md"}>
                <header>
                    <div>
                        <h2 className={"font-bold"}>Top Products</h2>
                        <p className={"font-semibold text-black/40 text-sm"}>
                            Best selling products in your store
                        </p>
                    </div>
                </header>
                <TopProducts />
            </div>
        </Container>
    );
};

export default TopProductsPage;
