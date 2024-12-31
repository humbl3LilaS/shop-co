"use client";
import { useGetAllOrders } from "@/feature/admin/orders/hooks/use-get-all-orders";
import DataTable from "@/components/share/data-table";
import { columns } from "@/feature/admin/orders/columns/orders-columns";

const OrdersTable = () => {
    const { data } = useGetAllOrders();
    return (
        <div className={"p-8 bg-white rounded-2xl"}>
            <DataTable
                data={data}
                columns={columns}
                paginationOn={true}
                filterOn={true}
                filterKey={"id"}
            />
        </div>
    );
};

export default OrdersTable;
