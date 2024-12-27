import {useGetReviewByProductId} from "@/feature/client/reviews/hooks/use-get-review-by-product-id";
import {useParams} from "next/navigation";
import {ChevronLeft, ChevronRight, SlidersHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import Container from "@/components/client/container";
import ReviewCard from "@/feature/client/reviews/components/review-card";
import {useState} from "react";


const ProductReviews = () => {
    const params = useParams() as { productId: string };
    const [page, setPage] = useState(0);

    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
    } = useGetReviewByProductId(params?.productId);

    return (
        <Container className={"py-5"}>
            <header>
                <div className={"flex items-center justify-between"}>
                    <h2 className={"flex items-baseline gap-x-2"}>
                        <span className={"font-bold text-xl"}>
                            All Reviews
                        </span>
                        {
                            data ? <span>
                                ({data.pages[page].length})
                            </span> : <span>(...)</span>
                        }
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
                    data && data.pages[page].map(item =>
                        <ReviewCard data={item} key={item.id}/>
                    )
                }
            </div>
            {
                data
                && data.pages[page].length === 0
                && <div className={"py-5 lg:py-8"}>
                    <h3 className={" text-center text-lg font-bold underline lg:text-xl"}>No Reviews Yet</h3>
                </div>
            }
            <div className={"flex items-center justify-end gap-x-4 mt-4"}>
                <Button onClick={async () => {
                    await fetchPreviousPage();
                    setPage(page - 1)
                }}
                        disabled={page === 0}
                >
                    <ChevronLeft/>
                </Button>
                <Button onClick={
                    async () => {
                        await fetchNextPage();
                        setPage(page + 1)
                    }
                }
                        disabled={data?.pages[page].length !== 4}
                >
                    <ChevronRight/>
                </Button>
            </div>
        </Container>
    );
};

export default ProductReviews;