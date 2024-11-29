import {Star, StarHalf} from "lucide-react";
import {cn} from "@/lib/utils";

type RatingProps = {
    data: number;
    className?: string;
    showAvg?: boolean;

}
const Rating = ({data, className}: RatingProps) => {

    if (data === 0) {
        return <div className={"text-black/40 font-bold"}>
            No reviews yet
        </div>
    }
    const hasHalfStar = data > Math.floor(data);
    const fillAmt = hasHalfStar ? Math.floor(data) : data;
    return (
        <div className={cn("flex items-center gap-x-2", className)}>
            {
                (new Array(fillAmt).fill(0)).map((_, idx) => (
                    <Star color="gold" fill={"gold"} key={idx}/>
                ))
            }
            {
                hasHalfStar && <StarHalf color="gold" fill={"gold"}/>
            }
            <div className={"text-black/40 font-bold"}>{data} / 5</div>
        </div>
    );
};

export default Rating;