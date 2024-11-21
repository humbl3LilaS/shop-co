import {getProducts} from "@/actions/products";
import ProductPreviewCard from "@/components/product-preview-card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {IProduct} from "@/types/api.types";

type ProductPreviewProps = {
    title: string;
    data: IProduct[];
}

const ProductPreview = async ({title, data}: ProductPreviewProps) => {

    return (
        <section className={"pt-[50px] px-4 pb-16"}>
            <h2 className={"mb-8 text-4xl text-center font-bold font-title uppercase tracking-wide"}>{title}</h2>
            <div className={"md:px-[100px] md:flex items-start justify-center flex-wrap gap-x-6 lg:flex-nowrap"}>
                {data.map((product) => <ProductPreviewCard key={product.id} data={product}/>)}
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