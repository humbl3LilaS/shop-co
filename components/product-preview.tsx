import ProductPreviewCard from "@/components/product-preview-card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {IProduct} from "@/types/api.types";
import {cn} from "@/lib/utils";

type ProductPreviewProps = {
    title: string;
    data: IProduct[];
    separator?: boolean;
    redirect?: {
        url: string;
    }
}

const ProductPreview = async ({title, data, separator, redirect}: ProductPreviewProps) => {

    return (
        <section className={cn("pt-10 px-4", !separator && "pb-16")}>
            <h2 className={"mb-8 text-4xl text-center font-bold font-title uppercase tracking-wide"}>{title}</h2>
            <div className={"md:px-25 md:grid grid-cols-2 gap-6 lg:grid-cols-4"}>
                {data.map((product) => <ProductPreviewCard key={product.id} data={product}/>)}
            </div>
            {
                redirect && <Button
                    variant="outline"
                    className={"py-4 px-14 mx-auto rounded-3xl flex items-center justify-center font-bold"}
                >
                    <Link href={redirect.url}>
                        View All
                    </Link>
                </Button>
            }
            {separator && <hr className="mt-10"/>}
        </section>
    );
};

export default ProductPreview;