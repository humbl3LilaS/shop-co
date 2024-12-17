import {getAllReviews} from "@/feature/client/reviews/actions/get-all-reviews";
import {useQuery} from "@tanstack/react-query";

export const useGetReviewByProductId = (productId: string) => {
    return useQuery({
        queryKey: ["reviews", productId],
        queryFn: () => getAllReviews(productId),
        staleTime: 60 * 60 * 1000,
        enabled: !!productId
    })
}