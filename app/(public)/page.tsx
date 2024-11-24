import Hero from "@/components/hero";
import Partners from "@/components/partners";
import ProductPreview from "@/components/product-preview";
import {getRecentProducts} from "@/actions/product-actions";
import BrowseStyle from "@/components/browse-style";
import Testimonials from "@/components/testimonials";

const Home = async () => {
    const products = await getRecentProducts();

    if (!products || !products.length) {
        return <div>No product</div>
    }
    return (
        <main>
            <Hero/>
            <Partners/>
            <ProductPreview
                title={"new arrivals"}
                data={products}
                separator={true}
                redirect={{url: "/new-arrivals"}}
            />
            {/*TODO: replace with top selling product's query*/}
            <ProductPreview
                title={"top selling"}
                data={products}
                redirect={{url: "/top-selling"}}
            />
            <BrowseStyle/>
            <Testimonials/>

        </main>
    );
}

export default Home;