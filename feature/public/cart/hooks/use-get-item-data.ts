import {useQuery} from "react-query";
import {getCartItemData} from "@/feature/public/cart/actions/get-cart-item-data";

export const useGetItemData = ({pid, cid, s}: { pid: string, cid: string, s: string }) => {
    return useQuery({
        enabled: !!pid && !!cid,
        queryKey: ["cart-item", pid, cid, s],
        queryFn: () => getCartItemData(pid, cid),
        staleTime: 60 * 60 * 1000
    })
}