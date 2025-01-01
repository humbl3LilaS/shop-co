"use client";
import { useGetAllTransactions } from "@/feature/admin/transactions/hooks/use-get-all-transactions";
import DataTable from "@/components/share/data-table";
import { columns } from "@/feature/admin/transactions/columns/transactions-columns";

const TransactionsTable = () => {
    const { data } = useGetAllTransactions();
    console.log(data);
    return (
        <div className={"p-8 bg-white rounded-2xl"}>
            <DataTable data={data} columns={columns} paginationOn={true} />
        </div>
    );
};

export default TransactionsTable;
