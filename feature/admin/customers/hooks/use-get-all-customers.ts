import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "@/feature/admin/customers/actions/get-all-customers";

export const useGetAllCustomers = () => {
    return useQuery({
        queryKey: ["customers"],
        queryFn: getAllCustomers,
        staleTime: Infinity,
    });
};
