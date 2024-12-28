import { createColumnHelper } from "@tanstack/table-core";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

export interface TopProduct {
    id: string;
    coverImage: string;
    name: string;
    addedDate: Date;
    price: number;
    totalEarning: number;
}

const columnHelper = createColumnHelper<TopProduct>();

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
        ),
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
        ),
    }),
    columnHelper.accessor("addedDate", {
        header: () => <span className={"text-xs"}>Date Added</span>,
        cell: ({ getValue }) => <span>{format(getValue(), "do MMM yyyy")}</span>,
    }),
    columnHelper.accessor("price", {
        header: () => <span className={"text-xs"}>Price</span>,
        cell: ({ getValue }) => (
            <span
                className={
                    "block px-3 py-1 rounded-3xl bg-orange-200/50 text-orange-600 text-center font-bold"
                }
            >
                ${getValue()}
            </span>
        ),
    }),
    columnHelper.accessor("totalEarning", {
        header: () => <span className={"text-xs"}>Total Earning</span>,
        cell: ({ getValue }) => (
            <span
                className={
                    "block px-3 py-1 rounded-3xl bg-blue-200/50 text-blue-600 text-center font-bold"
                }
            >
                ${getValue()}
            </span>
        ),
    }),
    columnHelper.accessor("id", {
        header: () => <span></span>,
        cell: ({ getValue }) => (
            // TODO: replace with dropdown action
            <Button variant={"ghost"}>
                <EllipsisVertical />
            </Button>
        ),
    }),
];
