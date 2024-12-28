import { getRecentProducts } from "@/actions/product-actions";
import ProductPreview from "@/components/client/product-preview";

const PopularProducts = async () => {
    const products = await getRecentProducts();
    if (!products || !products.length) {
        return <div>No product</div>;
    }
    return (
        <ProductPreview
            title={"popular products"}
            data={products}
            separator={true}
            redirect={{ url: "/popular-products" }}
        />
    );
};

export default PopularProducts;
