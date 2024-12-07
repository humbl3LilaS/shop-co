import {IReview} from "@/types/api.types";
import {format} from "date-fns";
import Rating from "@/feature/client/reviews/components/rating";

type ReviewCardProps = {
    data: IReview;
}
const ReviewCard = ({data}: ReviewCardProps) => {

    return (
        <div className={"p-6 flex flex-col gap-y-4 border border-black/20 rounded-2xl"}>
            <Rating data={data.rating} className={""}/>
            <h3 className={" font-bold text-xl"}>{data.userName}</h3>
            <p className={"text-black/40 text-sm"}> {data.content}</p>
            <p className={"mt-auto text-black/40 font-bold"}>Posted on {format(data.createdAt, "do MMM yyyy")}</p>
        </div>
    );
};

export default ReviewCard;