"use client";

import DataTable from "@/components/share/data-table";
import { columns } from "@/feature/admin/product/columns/products-columns";
import { useGetAllProducts } from "@/feature/admin/product/hooks/use-get-all-products";
import Link from "next/link";

const ProductTable = () => {
    const { data: products } = useGetAllProducts();
    return (
        <div className={"p-8 bg-white rounded-2xl relative"}>
            <Link
                href={"/admin/dashboard/products/new"}
                className={"absolute px-5 py-2 bg-black rounded-lg text-white"}
            >
                Add New Product
            </Link>
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
