import {getCartItemData} from "@/feature/client/cart/actions/get-cart-item-data";
import {useQuery} from "@tanstack/react-query";

export const useGetItemData = ({pid, cid, s}: { pid: string, cid: string, s: string }) => {
    return useQuery({
        enabled: !!pid && !!cid,
        queryKey: ["cart-item", pid, cid, s],
        queryFn: () => getCartItemData(pid, cid),
        staleTime: 60 * 60 * 1000
    })
}