import {useQuery} from "react-query";
import {getAllReviews} from "@/feature/public/reviews/actions/get-all-reviews";

export const useGetReviewByProductId = (productId: string) => {
    return useQuery({
        queryKey: ["reviews", productId],
        queryFn: () => getAllReviews(productId),
        staleTime: 60 * 60 * 1000,
        enabled: !!productId
    })
}