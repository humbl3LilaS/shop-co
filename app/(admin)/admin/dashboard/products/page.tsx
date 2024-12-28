import Container from "@/components/admin/Container";
import ProductTable from "@/feature/admin/product/components/product-table";

const ProductPage = () => {
    return (
        <Container className={"p-8 overflow-y-scroll"}>
            <ProductTable />
        </Container>
    );
};

export default ProductPage;
