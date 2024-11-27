import Image from "next/image";
import {Star} from "lucide-react";
import {calculateDiscount} from "@/lib/utils";
import Link from "next/link";
import {IProduct} from "@/types/api.types";
import PriceTag from "@/components/share/price-tag";

type ProductPreviewCardProps = {
    data: IProduct;
}
const ProductPreviewCard = ({data}: ProductPreviewCardProps) => {
    return (
        <article className={"w-full max-w-[350px] mx-auto"}>
            <Image
                src={data.coverImage}
                alt={data.name}
                width={350}
                height={350}
                className={"aspect-square w-full mb-4 rounded-xl"}
            />
            <h3 className={"mb-4 font-bold uppercase line-clamp-1"}>
                <Link href={`/product/${data.id}`}>
                    {data.name}
                </Link>
            </h3>
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
                <PriceTag price={data.price} discount={data.discount}/>
            </div>
        </article>
    );
};

export default ProductPreviewCard;