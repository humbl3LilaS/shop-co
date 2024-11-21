import Hero from "@/components/hero";
import Partners from "@/components/partners";
import ProductPreview from "@/components/product-preview";
import {getProducts} from "@/actions/products";

const Home = async () => {
    const products = await getProducts();

    if (!products || !products.length) {
        return <div>No product</div>
    }
    return (
        <main>
            <Hero/>
            <Partners/>
            <ProductPreview title={"new arrivals"} data={products}/>
        </main>
    );
}

export default Home;