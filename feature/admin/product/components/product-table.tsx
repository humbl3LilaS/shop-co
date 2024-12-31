"use client";

import DataTable from "@/components/share/data-table";
import { columns } from "@/feature/admin/product/columns/products-columns";
import { useGetAllProducts } from "@/feature/admin/product/hooks/use-get-all-products";

const ProductTable = () => {
    const { data: products } = useGetAllProducts();
    return (
        <div className={"p-8 bg-white rounded-2xl"}>
            <DataTable
                //@ts-expect-error asdf jsk
                data={products}
                columns={columns}
                paginationOn={true}
                filterOn={true}
                filterKey={"name"}
            />
        </div>
    );
};

export default ProductTable;
