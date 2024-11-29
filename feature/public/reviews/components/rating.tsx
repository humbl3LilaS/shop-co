import {Star} from "lucide-react";
import {cn} from "@/lib/utils";

type RatingProps = {
    data: number;
    className?: string;
}
const Rating = ({data, className}: RatingProps) => {

    return (
        <div className={cn("flex items-center gap-x-2", className)}>
            {
                (new Array(data).fill(0)).map((_, idx) => (
                    <Star color="gold" fill={"gold"} key={idx}/>
                ))
            }
        </div>
    );
};

export default Rating;