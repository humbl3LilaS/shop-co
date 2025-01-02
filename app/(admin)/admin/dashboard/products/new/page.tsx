import Container from "@/components/admin/Container";
import CreateProductForm from "@/feature/admin/products/components/create-product-form";

const NewProductPage = () => {
    return (
        <Container className={"p-8 h-auto"}>
            <div className={"p-8 bg-white rounded-2xl"}>
                <CreateProductForm />
            </div>
        </Container>
    );
};

export default NewProductPage;
