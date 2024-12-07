import {STYLES} from "@/constants";
import {notFound} from "next/navigation";
import {getProductByCategory} from "@/actions/product-actions";
import {IProductCategory} from "@/types/object.types";
import CustomBreadcrumb from "@/components/share/custom-breadcrumb";
import Container from "@/components/share/container";
import {SlidersHorizontal} from "lucide-react";
import ProductPreviewCard from "@/components/product-preview-card";
import CustomPagination from "@/components/share/custom-pagination";
import FilterForm from "@/feature/client/category/components/filter-form";
import {FilterFormSchemaType} from "@/validation/schema";
import {slugToArray} from "@/lib/utils";
import FilterSheet from "@/feature/client/category/components/filter-sheet";

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

    const formDefaultValues: FilterFormSchemaType = {
        sizes: slugToArray(query.sizes),
        types: slugToArray(query.types),
        priceRange: [parseInt(query.min) || 0, parseInt(query.max) || 400]
    }


    return (
        <Container>
            <CustomBreadcrumb/>
            <div className={"lg:grid grid-cols-4 gap-x-5"}>
                <div className={"hidden lg:block h-fit col-span-1 border border-black/20 rounded-xl"}>
                    <div className={"px-6 py-5"}>

                        <h2 className={"mb-6 flex items-center justify-between"}>
                            <span className={"text-xl font-bold"}>Filters</span>
                            <SlidersHorizontal className={"size-5"}/>
                        </h2>
                        <hr className={"bg-black/60"}/>
                        <FilterForm defaultValues={formDefaultValues}/>
                    </div>
                </div>
                <div className={"lg:col-span-3"}>
                    <nav className={"mb-7 flex items-baseline gap-x-4 lg:justify-between"}>
                        <h2 className={"text-2xl font-bold capitalize"}>{category}</h2>
                        <p className={"text-black/60"}>
                            Showing {products.currentPage}-{products.totalPages} of &nbsp;{products.totalProducts} Products
                        </p>
                        <FilterSheet defaultValues={formDefaultValues}/>
                    </nav>
                    {
                        products.data && products.data.length === 0 &&
                        <h1 className={"mt-10 text-2xl font-bold text-center lg:text-3xl"}>No products</h1>
                    }
                    <div className={"grid  grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5"}>
                        {products.data.map((product, idx) =>
                            <ProductPreviewCard data={product} key={product.id + idx}/>
                        )}
                    </div>
                    {products.data && products.data.length > 0 && <hr className={"mb-6"}/>}
                    {
                        products.data && products.data.length > 0 &&
                        <CustomPagination
                            totalPages={products.totalPages}
                            currentPage={products.currentPage}
                            hrefBase={"casual"}
                        />
                    }

                </div>
            </div>
        </Container>
    );
};

export default ProductCategoryPage;