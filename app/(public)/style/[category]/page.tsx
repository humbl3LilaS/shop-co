import {STYLES} from "@/constants";
import {notFound} from "next/navigation";
import {getProductByCategory} from "@/actions/product-actions";
import {IProductCategory} from "@/types/object.types";
import CustomBreadcrumb from "@/components/share/custom-breadcrumb";
import Container from "@/components/share/container";
import {SlidersHorizontal} from "lucide-react";
import ProductPreviewCard from "@/components/product-preview-card";
import CustomPagination from "@/components/share/custom-pagination";

type PageProps = {
    params: Promise<{ category: string }>,
    searchParams: Promise<{ page: string }>,
}

const ProductCategoryPage = async ({params, searchParams}: PageProps) => {
    const {category} = await params;
    const {page} = await searchParams;
    if (STYLES.every(item => item.title !== category)) {
        return notFound();
    }

    const products = await getProductByCategory(category as IProductCategory, page ? parseInt(page) : 1);
    console.log(products)
    if (!products) {
        notFound();
    }

    if (products.data && products.data.length === 0) {
        return <Container>
            <div className={"py-20 text-center"}>
                <h2 className={"font-bold text-2xl lg:text-4xl"}>There is no product yet!!</h2>
            </div>
        </Container>
    }

    return (
        <Container>
            <CustomBreadcrumb/>
            <nav className={"mb-7 flex items-baseline gap-x-4"}>
                <h2 className={"text-2xl font-bold capitalize"}>{category}</h2>
                <p className={"text-black/60"}>
                    Showing {products.currentPage}-{products.totalPages} of {products.totalProducts} Products
                </p>
                {/*TODO: replace with sheet*/}
                <button
                    className={"size-8 ml-auto flex items-center justify-center rounded-full bg-[#f0f0f0] lg:hidden"}>
                    <SlidersHorizontal className={"size-4"}/>
                </button>
            </nav>
            <div className={"grid  grid-cols-2 gap-x-4"}>
                {products.data.map((product, idx) =>
                                       <ProductPreviewCard data={product} key={product.id + idx}/>
                )}
            </div>
            <CustomPagination totalPages={products.totalPages} currentPage={products.currentPage} hrefBase={"casual"}/>
        </Container>
    );
};

export default ProductCategoryPage;