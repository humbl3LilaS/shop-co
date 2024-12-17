import {getCartSummaryInfo} from "@/feature/client/cart/actions/get-cart-summary-info";
import {useQuery} from "@tanstack/react-query";

export const useGetCartSummaryInfo = (pids: string[]) => {
    return useQuery({
        queryKey: ["cart-summary", {pids}],
        queryFn: () => getCartSummaryInfo(pids),
        enabled: !!pids && !!pids.length,
        staleTime: 60 * 60 * 1000
    })

}