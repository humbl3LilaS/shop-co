import {useGetReviewByProductId} from "@/feature/client/reviews/hooks/use-get-review-by-product-id";
import {useParams} from "next/navigation";
import {SlidersHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import Container from "@/components/client/container";
import ReviewCard from "@/feature/client/reviews/components/review-card";


const ProductReviews = () => {
    const params = useParams() as { productId: string };
    const {data} = useGetReviewByProductId(params?.productId);
    return (
        <Container className={"py-5"}>
            <header>
                <div className={"flex items-center justify-between"}>
                    <h2 className={"flex items-baseline gap-x-2"}>
                        <span className={"font-bold text-xl"}>
                            All Reviews
                        </span>
                        <span className={"text-black/40"}>({data?.length})</span>
                    </h2>
                    <div className={"flex items-center gap-x-2"}>
                        <button
                            className={"size-8  flex items-center justify-center rounded-full bg-[#f0f0f0]"}>
                            <SlidersHorizontal className={"size-4"}/>
                        </button>
                        {/*TODO: Replace it with pop over or smth*/}
                        <Button className={"rounded-3xl"}>
                            Write a Review
                        </Button>
                    </div>
                </div>
            </header>
            <div className={"mt-5 grid grid-cols-1 gap-4 md:grid-cols-2"}>
                {
                    data && data.map(item =>
                        <ReviewCard data={item} key={item.id}/>
                    )
                }
            </div>
            {
                data
                && data.length === 0
                && <div className={"py-5 lg:py-8"}>
                    <h3 className={" text-center text-lg font-bold underline lg:text-xl"}>No Reviews Yet</h3>
                </div>
            }
        </Container>
    );
};

export default ProductReviews;