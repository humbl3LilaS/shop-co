import {useQuery} from "react-query";
import {getCartSummaryInfo} from "@/feature/client/cart/actions/get-cart-summary-info";

export const useGetCartSummaryInfo = (pids: string[]) => {
    return useQuery({
        queryKey: ["cart-summary", {pids}],
        queryFn: () => getCartSummaryInfo(pids),
        enabled: !!pids && !!pids.length,
        staleTime: 60 * 60 * 1000
    })

}