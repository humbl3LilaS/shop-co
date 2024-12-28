import { getCartItemData } from "@/feature/client/cart/actions/get-cart-item-data";
import { queryOptions } from "@tanstack/react-query";

export const getItemDataOption = ({ pid, cid, s }: { pid: string; cid: string; s: string }) => {
    return queryOptions({
        queryKey: ["cart-item", pid, cid, s],
        queryFn: () => getCartItemData(pid, cid),
        enabled: !!pid && !!cid,
        staleTime: 60 * 10 * 1000,
    });
};
