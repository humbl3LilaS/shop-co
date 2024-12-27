import {getAllReviews} from "@/feature/client/reviews/actions/get-all-reviews";
import {useInfiniteQuery} from "@tanstack/react-query";

export const useGetReviewByProductId = (productId: string) => {
    return useInfiniteQuery({
        queryKey: ["reviews", productId],
        queryFn: ({pageParam}) => getAllReviews(productId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length < 4) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => {
            if (firstPageParam <= 1) {
                return undefined;
            }
            return firstPageParam - 1;
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!productId
    })
}