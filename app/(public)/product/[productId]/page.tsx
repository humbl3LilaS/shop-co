import {getProductById} from "@/feature/public/product/actions/get-product-by-id";

type PageProps = {
    params: Promise<{ productId: string }>
}

const ProductDetailsPage = async ({params}: PageProps) => {

    const {productId} = await params;
    const product = await getProductById(productId)
    return (
        <div>
            <h1>Detail page of product {productId}</h1>
        </div>
    );
};

export default ProductDetailsPage;