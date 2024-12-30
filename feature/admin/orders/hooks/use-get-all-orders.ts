import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/feature/admin/orders/actions/get-all-orders";

export const useGetAllOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
        staleTime: 60 * 60 * 1000 * 4,
    });
};
