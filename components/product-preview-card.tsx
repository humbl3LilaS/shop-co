import Image from "next/image";
import {Star} from "lucide-react";
import {calculateDiscount} from "@/lib/utils";

type ProductPreviewCardProps = {
    data: {
        id: string;
        name: string;
        price: number;
        discount: number | null;
        description: string;
        coverImage: string;
        arrivedAt: Date;
    }
}
const ProductPreviewCard = ({data}: ProductPreviewCardProps) => {
    return (
        <article>
            <Image
                src={data.coverImage}
                alt={data.name}
                width={300}
                height={300}
                className={"aspect-square w-[300px] mb-4 rounded-xl"}
            />
            <h3 className={"mb-4 font-bold uppercase"}>{data.name}</h3>
            {/*TODO: later replace with actual data*/}
            <div className={"mb-1.5 flex items-center gap-x-2"}>
                <Star color="#f9f06b" fill={"#f9f06b"}/>
                <Star color="#f9f06b" fill={"#f9f06b"}/>
                <Star color="#f9f06b" fill={"#f9f06b"}/>
                <Star color="#f9f06b" fill={"#f9f06b"}/>
                <p>
                    4.5/<span className={"text-black/60"}>5</span>
                </p>
            </div>
            <div className={"mb-9"}>
                {
                    data.discount
                    ? <p className={"flex items-center gap-x-2 text-2xl font-bold uppercase"}>
                        <span>
                            ${calculateDiscount(data.price, data.discount)}
                        </span>
                        <span className={"text-black/60 line-through"}>${data.price}</span>
                        <span
                            className={"px-[13px] py-[6px] ml-2 block text-sm bg-[#ff333319] font-normal text-[#f33] rounded-2xl"}>
                            {data.discount}%
                        </span>
                    </p>
                    : <p className={"text-2xl font-bold uppercase"}>${data.price}</p>}
            </div>
        </article>
    );
};

export default ProductPreviewCard;