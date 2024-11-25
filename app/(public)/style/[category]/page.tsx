import {STYLES} from "@/constants";
import {notFound} from "next/navigation";
import {getProductByCategory} from "@/actions/product-actions";
import {IProductCategory} from "@/types/object.types";
import CustomBreadcrumb from "@/components/share/custom-breadcrumb";
import Container from "@/components/share/container";
import {SlidersHorizontal} from "lucide-react";
import ProductPreviewCard from "@/components/product-preview-card";
import CustomPagination from "@/components/share/custom-pagination";
import FilterForm from "@/feature/public/product-category/components/filter-form";

export type CategoryPageQuery = {
    page: string;
    min: string;
    max: string;
    types: string;
    sizes: string;
}

type PageProps = {
    params: Promise<{ category: string }>,
    searchParams: Promise<CategoryPageQuery>,
}

const ProductCategoryPage = async ({params, searchParams}: PageProps) => {
    const {category} = await params;
    const query = await searchParams;

    if (STYLES.every(item => item.title !== category)) {
        return notFound();
    }

    const products = await getProductByCategory(category as IProductCategory, query);
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
                    Showing {products.currentPage}-{products.totalPages} of &nbsp;{products.totalProducts} Products
                </p>
                {/*TODO: replace with sheet*/}
                <button
                    className={"size-8 ml-auto flex items-center justify-center rounded-full bg-[#f0f0f0] lg:hidden"}>
                    <SlidersHorizontal className={"size-4"}/>
                </button>
            </nav>
            <div className={"lg:grid grid-cols-4 gap-x-5"}>
                <div className={"hidden lg:block col-span-1 border border-black/20 rounded-xl"}>
                    <div className={"px-6 py-5"}>

                        <h2 className={"mb-6 flex items-center justify-between"}>
                            <span className={"text-xl font-bold"}>Filters</span>
                            <SlidersHorizontal className={"size-5"}/>
                        </h2>
                        <hr className={"bg-black/60"}/>
                        <FilterForm/>
                    </div>
                </div>
                <div className={"lg:col-span-3"}>
                    <div className={"grid  grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5"}>
                        {products.data.map((product, idx) =>
                            <ProductPreviewCard data={product} key={product.id + idx}/>
                        )}
                    </div>
                    <CustomPagination totalPages={products.totalPages} currentPage={products.currentPage}
                                      hrefBase={"casual"}/>
                </div>
            </div>
        </Container>
    );
};

export default ProductCategoryPage;