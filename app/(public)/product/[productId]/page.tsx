import {getProductById} from "@/feature/public/product/actions/get-product-by-id";
import {notFound} from "next/navigation";
import Container from "@/components/share/container";
import PhotoGrid from "@/feature/public/product/components/photo-grid";

type PageProps = {
    params: Promise<{ productId: string }>
}

const ProductDetailsPage = async ({params}: PageProps) => {

    const {productId} = await params;

    if (!productId) {
        notFound();
    }

    const res = await getProductById(productId)

    if (!res) {
        notFound();
    }
    const {products, product_colors: colors} = res;

    return (
        <Container className={"pt-10"}>
            <PhotoGrid coverImage={products.coverImage} colorImages={colors[0]?.imagesUrl ?? []}/>
        </Container>
    );
};

export default ProductDetailsPage;