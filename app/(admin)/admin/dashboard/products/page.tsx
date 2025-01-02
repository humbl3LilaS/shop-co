import Container from "@/components/admin/Container";
import ProductTable from "@/feature/admin/products/components/product-table";

const ProductPage = () => {
    return (
        <Container className={"h-auto p-8"}>
            <ProductTable />
        </Container>
    );
};

export default ProductPage;
