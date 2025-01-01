import { createColumnHelper } from "@tanstack/table-core";
import { ITransactionInfo } from "@/feature/admin/transactions/actions/get-all-transactions";
import Link from "next/link";
import TransactionStatus from "@/components/share/transaction-status";
import { format } from "date-fns";

const columnHelper = createColumnHelper<ITransactionInfo>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>Transaction Id</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>Transaction#{getValue()}</span>
        ),
    }),
    columnHelper.accessor("userId", {
        header: () => <span>Customer</span>,
        cell: ({ row, getValue }) => (
            <Link href={`/customers/${getValue()}`}>{row.original.userName}</Link>
        ),
    }),
    columnHelper.accessor("createdAt", {
        header: () => <span>Created At</span>,
        cell: ({ getValue }) => <span>{format(getValue(), "do MMM yyyy")}</span>,
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ getValue }) => <TransactionStatus status={getValue()} />,
    }),
    columnHelper.accessor("amount", {
        header: () => <span>Amount</span>,
        cell: ({ getValue }) => <span className={"font-bold text-base"}>${getValue()}</span>,
    }),
];
