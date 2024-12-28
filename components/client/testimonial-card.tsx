import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
    data: {
        name: string;
        content: string;
    };
};

const TestimonialCard = ({ data }: TestimonialCardProps) => {
    return (
        <div className={cn("h-[270px] px-8 py-7 border border-black/10 rounded-2xl")}>
            <div className={"mb-4 flex items-center gap-x-3"}>
                <Star color="#f9f06b" fill={"#f9f06b"} />
                <Star color="#f9f06b" fill={"#f9f06b"} />
                <Star color="#f9f06b" fill={"#f9f06b"} />
                <Star color="#f9f06b" fill={"#f9f06b"} />
                <Star color="#f9f06b" fill={"#f9f06b"} />
            </div>
            <h3 className={"mb-4 font-bold text-[20px]"}>{data.name}</h3>
            <p className={"text-black/60"}>&#34;{data.content}&#34;</p>
        </div>
    );
};

export default TestimonialCard;
