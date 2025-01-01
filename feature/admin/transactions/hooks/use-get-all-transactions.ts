import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "@/feature/admin/transactions/actions/get-all-transactions";

export const useGetAllTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: getAllTransactions,
        staleTime: 60 * 60 * 1000,
    });
};
