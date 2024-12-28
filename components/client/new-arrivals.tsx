import { getRecentProducts } from "@/actions/product-actions";
import ProductPreview from "@/components/client/product-preview";

const NewArrivals = async () => {
    const products = await getRecentProducts();
    if (!products || !products.length) {
        return <div>No product</div>;
    }
    return (
        <ProductPreview
            title={"new arrivals"}
            data={products}
            separator={true}
            redirect={{ url: "/new-arrivals" }}
        />
    );
};

export default NewArrivals;
