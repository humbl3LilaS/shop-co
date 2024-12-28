"use client";
import { columns } from "@/feature/admin/overview/components/table-columns";
import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "@/feature/admin/overview/actions/get-top-products";
import DataTable from "@/components/share/data-table";

const TopProducts = () => {
    const { data } = useQuery({
        queryKey: ["top-sales"],
        queryFn: getTopProducts,
        staleTime: Infinity,
    });
    return <DataTable columns={columns} data={data} />;
};

export default TopProducts;
