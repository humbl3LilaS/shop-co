"use client"
import {columns, TopProduct} from "@/feature/admin/overview/components/table-columns";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

// TODO: Replace with actual query
const TOP_PRODUCTS: TopProduct[] = [
    {
        id: "c5161bad-d7bb-47d6-840b-d3beb4e9d603",
        coverImage: "https://res.cloudinary.com/dhhllchck/image/upload/v1732107969/shop-co/kehuxdhza53beehopn5f.png",
        name: "one life graphic t-shirt",
        addedDate: new Date(),
        price: 250,
        totalEarning: 7500
    },
    {
        id: "6d0195bf-75ac-45c6-b08d-93c42cd7ff7e",
        coverImage: "https://res.cloudinary.com/dhhllchck/image/upload/v1732117409/shop-co/oys6bv2pni3tfqhxxvue.png",
        name: "CHECKERED SHIRT",
        addedDate: new Date(),
        price: 180,
        totalEarning: 3500
    },
    {
        id: "9fb059b9-260b-4a1a-b144-f7ae597c546b",
        coverImage: "https://res.cloudinary.com/dhhllchck/image/upload/v1732782489/shop-co/ahav7nc7pesivbmczgsx.png",
        name: "Gradient Graphic T-shirt",
        addedDate: new Date(),
        price: 145,
        totalEarning: 2700
    }
]

const TopProducts = () => {
    const table = useReactTable({
        data: TOP_PRODUCTS,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div>
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
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            </Table>
        </div>
    );
};

export default TopProducts;