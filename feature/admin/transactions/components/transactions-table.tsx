"use client";
import { useGetAllTransactions } from "@/feature/admin/transactions/hooks/use-get-all-transactions";
import { columns } from "@/feature/admin/transactions/columns/transactions-columns";
import { useState } from "react";
import {
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
} from "@tanstack/table-core";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DataTableSkeleton from "@/components/share/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import TransactionsStatusSelector from "@/feature/admin/transactions/columns/transactions-status-selector";
import DataTableBody from "@/components/share/data-table-body";

const TransactionsTable = () => {
    const { data } = useGetAllTransactions();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 7,
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: data ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            pagination,
            columnFilters,
            sorting,
        },
    });
    return (
        <div className={"p-8 bg-white rounded-2xl"}>
            {data && (
                <div className={"mb-4 flex items-center justify-end gap-x-4"}>
                    <Input
                        placeholder={`Filter by Transaction ID...`}
                        value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("id")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm ml-auto"
                    />
                    <TransactionsStatusSelector
                        onChange={table.getColumn("status")?.setFilterValue}
                    />
                </div>
            )}
            <DataTableBody table={table} data={data} />
            {!data && <DataTableSkeleton paginationOn={true} />}
            {data && (
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
    );
};

export default TransactionsTable;
