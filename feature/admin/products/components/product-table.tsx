"use client";

import DataTable from "@/components/share/data-table";
import { columns } from "@/feature/admin/products/columns/products-columns";
import { useGetAllProducts } from "@/feature/admin/products/hooks/use-get-all-products";
import Link from "next/link";
import { useState } from "react";
import {
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
} from "@tanstack/table-core";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import DataTableSkeleton from "@/components/share/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DataTableBody from "@/components/share/data-table-body";

const ProductTable = () => {
    const { data: products } = useGetAllProducts();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: products ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            pagination,
            columnFilters,
        },
    });

    return (
        <div className={"p-8 bg-white rounded-2xl relative"}>
            {products && (
                <Link
                    href={"/admin/dashboard/products/new"}
                    className={"absolute px-5 py-2 bg-black rounded-lg text-white"}
                >
                    Add New Product
                </Link>
            )}
            <div>
                {products && (
                    <div className={"mb-4"}>
                        <Input
                            placeholder={`Filter by productId...`}
                            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("id")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm ml-auto"
                        />
                    </div>
                )}
                <DataTableBody table={table} data={products} />
                {!products && <DataTableSkeleton paginationOn={true} />}
                {products && (
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <p className={"text-black/40 text-sm font-semibold"}>
                            Page {pagination.pageIndex + 1} of {table.getPageCount()}
                        </p>
                        <div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className={"mr-2"}
                            >
                                <ChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTable;
