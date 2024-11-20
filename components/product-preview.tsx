import {getProducts} from "@/actions/products";
import ProductPreviewCard from "@/components/product-preview-card";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const ProductPreview = async () => {
    const products = await getProducts();

    if (!products || !products.length) {
        return <div>No product</div>
    }

    return (
        <section className={"pt-[50px] px-4 pb-16"}>
            <h2 className={"mb-8 text-4xl text-center font-bold font-title uppercase tracking-wide"}>new arrivals</h2>
            <div className={"lg:px-[100px] lg:flex items-center gap-x-6"}>
                {products.map((product) => <ProductPreviewCard key={product.id} data={product}/>)}
            </div>
            <Button
                variant="outline"
                className={"py-4 px-14 mx-auto rounded-3xl flex items-center justify-center font-bold"}
            >
                <Link href={"/new-arrivals"}>
                    View All
                </Link>
            </Button>
        </section>
    );
};

export default ProductPreview;