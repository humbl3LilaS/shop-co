import {useQuery} from "react-query";
import {getItemsInCart} from "@/feature/public/cart/actions/get-items-in-cart";

export const useGetItemInCart = (ids: Array<{ pid: string, cid: string }>) => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: async () => getItemsInCart(ids),
        enabled: !!ids.length && !!ids,
    })
}