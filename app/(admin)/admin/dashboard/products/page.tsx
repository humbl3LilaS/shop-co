import CreateProductForm from "@/feature/admin/product/components/create-product-form";
import Container from "@/components/admin/Container";

const ProductPage = () => {
    return <Container className={"overflow-y-scroll"}>
        <CreateProductForm/>
    </Container>
};

export default ProductPage;