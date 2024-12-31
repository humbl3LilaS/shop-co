"use client";
import {
    ColumnDef,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import DataTableSkeleton from "@/components/share/data-table-skeleton";

interface BaseDataTableProps<TData> {
    columns: ColumnDef<TData, any>[];
    data: TData[] | undefined;
    paginationOn?: boolean;
    pageSize?: number;
}

interface FilterableDataTableProps<TData> extends BaseDataTableProps<TData> {
    filterOn: true;
    filterKey: keyof TData;
}

interface NonFilterableDataTableProps<TData> extends BaseDataTableProps<TData> {
    filterOn?: false;
    filterKey?: never;
}

type DataTableProps<TData> = FilterableDataTableProps<TData> | NonFilterableDataTableProps<TData>;

const DataTable = <TData,>({
    data,
    columns,
    paginationOn,
    pageSize,
    filterOn = false,
    filterKey,
}: DataTableProps<TData>) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize ?? 5,
    });

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: data ?? [],
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
        <div>
            {filterOn && data && (
                <div className={"mb-4"}>
                    <Input
                        placeholder={`Filter by ${String(filterKey)}...`}
                        value={
                            (table.getColumn(String(filterKey))?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn(String(filterKey))?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm ml-auto"
                    />
                </div>
            )}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                {data && (
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                )}
            </Table>
            {!data && <DataTableSkeleton paginationOn={paginationOn} />}
            {paginationOn && data && (
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
export default DataTable;
