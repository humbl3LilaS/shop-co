import Hero from "@/components/client/hero";
import Partners from "@/components/client/partners";
import ProductPreview from "@/components/client/product-preview";
import {getRecentProducts} from "@/actions/product-actions";
import BrowseStyle from "@/components/client/browse-style";
import Testimonials from "@/components/client/testimonials";
import {v4 as createUUID} from "uuid";

const Home = async () => {
    const products = await getRecentProducts();

    if (!products || !products.length) {
        return <div>No product</div>
    }
    console.log(createUUID());
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
            {/*TODO: replace with top selling products's query*/}
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