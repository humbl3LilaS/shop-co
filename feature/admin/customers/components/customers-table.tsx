"use client";
import { useGetAllCustomers } from "@/feature/admin/customers/hooks/use-get-all-customers";
import DataTable from "@/components/share/data-table";
import { columns } from "@/feature/admin/customers/columns/customers-columns";

const CustomersTable = () => {
    const { data } = useGetAllCustomers();
    return (
        <div className={"p-8 bg-white rounded-2xl"}>
            <DataTable data={data} columns={columns} paginationOn={true} />
        </div>
    );
};

export default CustomersTable;
