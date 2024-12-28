import { createColumnHelper } from "@tanstack/table-core";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { IProducts } from "@/database/schema";

const columnHelper = createColumnHelper<IProducts>();

export const columns = [
    columnHelper.accessor("coverImage", {
        header: () => <span></span>,
        cell: ({ getValue, row }) => (
            <Image
                src={getValue()}
                alt={row.original.name}
                width={50}
                height={50}
                className={"w-12.5 aspect-square rounded-lg"}
            />
        )
    }),
    columnHelper.accessor("name", {
        header: () => <span className={"text-xs"}>Name</span>,
        cell: ({ getValue, row }) => (
            //TODO: add Tool tip
            <Link
                href={`/admin/dashboard/products/${row.original.id}`}
                className={"uppercase line-clamp-1"}
            >
                {getValue()}
            </Link>
        )
    }),
    columnHelper.accessor("arrivedAt", {
        header: () => <span className={"text-xs"}>Date Added</span>,
        cell: ({ getValue }) => <span>{format(getValue() ?? new Date(), "do MMM yyyy")}</span>
    }),
    columnHelper.accessor("productCategory", {
        header: () => <span className={"text-xs"}>Category</span>,
        cell: ({ getValue }) => (
            <span
                className={
                    "block px-3 py-1 rounded-3xl bg-green-200/50 text-gray-600 text-center font-bold capitalize"
                }
            >
                {getValue()}
            </span>
        )
    }),
    columnHelper.accessor("productType", {
        header: () => <span className={"text-xs"}>Type</span>,
        cell: ({ getValue }) => (
            <span
                className={
                    "block px-3 py-1 rounded-3xl bg-rose-200/50 text-gray-600 text-center font-bold capitalize"
                }
            >
                {getValue()}
            </span>
        )
    }),
    columnHelper.accessor("price", {
        header: () => <span className={"text-xs"}>Price</span>,
        cell: ({ getValue }) => (
            <span
                className={
                    "block px-3 py-1 rounded-3xl bg-blue-200/50 text-blue-600 text-center font-bold"
                }
            >
                ${getValue()}
            </span>
        )
    }),
    columnHelper.accessor("discount", {
        header: () => <span className={"text-xs"}>Discount</span>,
        cell: ({ getValue }) => (
            <span
                className={
                    "block px-3 py-1 rounded-3xl bg-orange-200/50 text-orange-600 text-center font-bold"
                }
            >
                {getValue()}%
            </span>
        )
    }),
    columnHelper.accessor("id", {
        header: () => <span></span>,
        cell: () => (
            // TODO: replace with dropdown action
            <Button variant={"ghost"}>
                <EllipsisVertical />
            </Button>
        )
    })
];
