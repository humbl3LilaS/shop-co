import { createColumnHelper } from "@tanstack/table-core";
import { ITransactionInfo } from "@/feature/admin/transactions/actions/get-all-transactions";
import Link from "next/link";
import TransactionStatus from "@/components/share/transaction-status";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const columnHelper = createColumnHelper<ITransactionInfo>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>Transaction Id</span>,
        cell: ({ getValue }) => (
            <Link
                href={`/admin/dashboard/transactions/${getValue()}`}
                className={"max-w-[200px] line-clamp-1"}
            >
                Transaction#{getValue()}
            </Link>
        )
    }),
    columnHelper.accessor("userId", {
        header: () => <span>Customer</span>,
        cell: ({ row, getValue }) => (
            <Link href={`/admin/dashboard/customers/${getValue()}`}>{row.original.userName}</Link>
        )
    }),
    columnHelper.accessor("createdAt", {
        header: ({ column }) => <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <span>Created At</span>
            {column.getIsSorted() === "asc" && <ArrowUp className={"size-4"} />}
            {column.getIsSorted() === "desc" && <ArrowDown className={"size-4"} />}
        </Button>,
        cell: ({ getValue }) => <span>{format(getValue(), "do MMM yyyy")}</span>
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => <TransactionStatus status={getValue()} />
    }),
    columnHelper.accessor("amount", {
        header: ({ column }) => <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <span>Amount</span>
            {column.getIsSorted() === "asc" && <ArrowUp className={"size-4"} />}
            {column.getIsSorted() === "desc" && <ArrowDown className={"size-4"} />}
        </Button>,
        cell: ({ getValue }) => <span className={"font-bold text-base"}>${getValue()}</span>
    })
];
