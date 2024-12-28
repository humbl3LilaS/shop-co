import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/feature/admin/product/actions/get-all-products";

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
        staleTime: Infinity,
    });
};
