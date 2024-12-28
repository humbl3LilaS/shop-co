import { calculateDiscount } from "@/lib/utils";

type PriceTagProps = {
    discount: number | null;
    price: number;
};
const PriceTag = ({ discount, price }: PriceTagProps) => {
    return (
        <>
            {discount ? (
                <p className={"flex items-center gap-x-2 text-2xl font-bold uppercase"}>
                    <span>${calculateDiscount(price, discount)}</span>
                    <span className={"text-black/60 line-through"}>${price}</span>
                    <span
                        className={
                            "px-[13px] py-[6px] ml-2 block text-sm bg-[#ff333319] font-normal text-[#f33] rounded-2xl"
                        }
                    >
                        {discount}%
                    </span>
                </p>
            ) : (
                <p className={"text-2xl font-bold uppercase"}>${price}</p>
            )}
        </>
    );
};

export default PriceTag;
