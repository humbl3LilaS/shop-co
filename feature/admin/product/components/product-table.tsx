"use client";

import DataTable from "@/components/share/data-table";
import { columns } from "@/feature/admin/product/columns/products-columns";
import { useGetAllProducts } from "@/feature/admin/product/hooks/use-get-all-products";

const ProductTable = () => {
    const { data: products } = useGetAllProducts();
    return (
        <div className={"p-8 bg-white rounded-2xl"}>
            <DataTable data={products} columns={columns} paginationOn={true} filerOn={true} />
        </div>
    );
};

export default ProductTable;
