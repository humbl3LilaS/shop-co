import Hero from "@/components/client/hero";
import Partners from "@/components/client/partners";
import BrowseStyle from "@/components/client/browse-style";
import Testimonials from "@/components/client/testimonials";
import {Suspense} from "react";
import NewArrivals from "@/components/client/new-arrivals";
import PopularProducts from "@/components/client/popular-products";
import ProductPreviewSkeleton from "@/components/client/product-preview-skeleton";



const Home = async () => {

    return (
        <main>
            <Hero/>
            <Partners/>
            <Suspense fallback={<ProductPreviewSkeleton title={"new arrivals"}/>}>
                <NewArrivals/>
            </Suspense>
            <Suspense fallback={<ProductPreviewSkeleton title={"new arrivals"}/>}>
                <PopularProducts/>
            </Suspense>
            <BrowseStyle/>
            <Testimonials/>
        </main>
    );
}

export default Home;