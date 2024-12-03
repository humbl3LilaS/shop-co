"use client"
import {ICart} from "@/types/object.types";
import {useQueryClient} from "react-query";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import Image from "next/image";
import {useCartStore} from "@/hooks/use-cart-store";
import {Skeleton} from "@/components/ui/skeleton";
import {useGetItemData} from "@/feature/public/cart/hooks/use-get-item-data";

type CartItemProps = {
    data: ICart[number]
}
const CartItem = ({data}: CartItemProps) => {

    const {data: cart, isFetching} = useGetItemData({...data})

    const queryClient = useQueryClient();

    const removeFromCart = useCartStore(state => state.remove)
    const removeHandler = () => {
        removeFromCart({pid: data.pid, cid: data.cid, s: data.s});
        queryClient.removeQueries({
            queryKey: ["cart-item", data.pid, data.cid, data.s],
        })
    }


    return (
        <>
            {
                isFetching && <div>
                    <Skeleton className={"w-full h-[200px] "}/>
                </div>
            }
            {
                !isFetching && cart && <div className={"flex items-center gap-x-4"}>
                    <div className={"max-w-25 aspect-square"}>
                        <Image src={cart?.imageUrl ?? ''} alt={cart?.name ?? ""} width={500} height={500}
                               className={"rounded-lg"}/>
                    </div>
                    <div>
                        <h3 className={"flex items-center justify-between uppercase  gap-x-4"}>
                                <span className={"font-bold text-lg line-clamp-1"}>
                                    {cart?.name}
                                </span>
                            <Button
                                variant={"link"}
                                onClick={removeHandler}
                            >
                                <Trash color={"red"}/>
                            </Button>
                        </h3>
                        <p className={"flex items-center gap-x-4"}>
                            <span>Color: </span>
                            <span className={"sr-only"}>{cart?.color}</span>
                            <span
                                className={"block w-6 aspect-square rounded-full"}
                                style={{
                                    backgroundColor: `#${cart?.color}`
                                }}
                            />

                        </p>
                        <p>
                            <span>Size: </span>
                            <span>{data.s}</span>
                        </p>
                        <p>
                            <span>Quantity: </span>
                            <span>{data.q}</span>
                        </p>
                    </div>
                </div>
            }
        </>
    );
};

export default CartItem;