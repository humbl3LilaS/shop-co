import { notFound } from "next/navigation";
import { getProductById } from "@/feature/admin/products/actions/get-product-by-id";
import Container from "@/components/admin/Container";
import EditProductForm from "@/feature/admin/products/components/edit-product-form";

const ProductEditPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params;
    if (!productId) {
        return notFound();
    }
    const product = await getProductById(productId);
    if (!product) {
        return notFound();
    }

    return (
        <Container className={"p-8 h-auto"}>
            <div className={"p-8 bg-white rounded-2xl"}>
                <EditProductForm defaultValues={product} />
            </div>
        </Container>
    );
};

export default ProductEditPage;
