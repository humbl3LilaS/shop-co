import {getProductById} from "@/feature/public/product/actions/get-product-by-id";
import {notFound} from "next/navigation";
import Container from "@/components/share/container";
import PhotoGrid from "@/feature/public/product/components/photo-grid";
import {Star} from "lucide-react";
import PriceTag from "@/components/share/price-tag";
import AddToCartForm from "@/feature/public/product/components/add-to-cart-form";
import SectionSelector from "@/feature/public/product/components/section-selector";


type PageProps = {
    params: Promise<{ productId: string }>
}

const ProductDetailsPage = async ({params}: PageProps) => {

    const {productId} = await params;

    if (!productId) {
        notFound();
    }

    const res = await getProductById(productId)

    if (!res) {
        notFound();
    }
    const {products: product, product_colors} = res;

    const colors = product_colors.filter(item => item !== null);


    return (
        <>
            <Container className={"pt-5"}>
                <div className={"mb-12.5 lg:grid grid-cols-2"}>
                    <PhotoGrid coverImage={product.coverImage} colorImages={product.imagesUrl ?? []}/>
                    <div className={"lg:px-10"}>
                        <article className={"mt-5"}>
                            <h2 className={"mb-1.5 text-2xl font-bold font-title"}>
                                {product.name}
                            </h2>
                            {/*TODO: later replace with actual data*/}
                            <div className={"mb-1.5 flex items-center gap-x-2"}>
                                <Star color="#f9f06b" fill={"#f9f06b"}/>
                                <Star color="#f9f06b" fill={"#f9f06b"}/>
                                <Star color="#f9f06b" fill={"#f9f06b"}/>
                                <Star color="#f9f06b" fill={"#f9f06b"}/>
                                <p>
                                    4.5/<span className={"text-black/60"}>5</span>
                                </p>
                            </div>
                            <PriceTag
                                discount={product.discount}
                                price={product.price}
                            />
                            <p className={"mt-5 mb-6 text-black/40"}>
                                {product.description}
                            </p>
                            <hr/>
                        </article>
                        <AddToCartForm
                            sizes={product.sizes ?? []}
                            colors={colors}
                            productId={productId}
                        />
                    </div>
                </div>
            </Container>
            <SectionSelector/>
        </>
    );
};

export default ProductDetailsPage;