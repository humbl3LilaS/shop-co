"use client"
import {ICart} from "@/types/object.types";

import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import Image from "next/image";
import {useCartStore} from "@/hooks/use-cart-store";
import {Skeleton} from "@/components/ui/skeleton";
import {useGetItemData} from "@/feature/client/cart/hooks/use-get-item-data";
import QuantityController from "@/feature/client/cart/components/quantity-controller";
import {useQueryClient} from "@tanstack/react-query";
import {useGotToCheckoutBtnState} from "@/feature/client/cart/hooks/use-got-to-checkout-btn-state";
import {useEffect} from "react";

type CartItemProps = {
    data: ICart[number]
}
const CartItem = ({data}: CartItemProps) => {

    const {data: cart, isLoading} = useGetItemData({...data})
    const setDisable = useGotToCheckoutBtnState(state => state.setDisable)
    const btnState = useGotToCheckoutBtnState(state => state.disable)

    useEffect(() => {
        setDisable(btnState && isLoading)
    }, [isLoading, btnState, setDisable])
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
                isLoading && <div>
                    <Skeleton className={"w-full h-[200px] "}/>
                </div>
            }
            {
                !isLoading && cart && <div className={"flex items-center gap-x-4 md:justify-between"}>
                    <div className={" aspect-square"}>
                        <Image src={cart?.imageUrl ?? ''} alt={cart?.name ?? ""} width={500} height={500}
                               className={"w-25 aspect-square rounded-lg md:w-[150px] lg:w-[200px]"}/>
                    </div>
                    <div className={"md:flex-1"}>
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
                            <span className={"text-sm"}>Color: </span>
                            <span className={"sr-only"}>{cart?.color}</span>
                            <span
                                className={"block w-6 aspect-square rounded-full"}
                                style={{
                                    backgroundColor: `#${cart?.color}`
                                }}
                            />

                        </p>
                        <p className={"text-sm"}>
                            <span>Size: </span>
                            <span className={"capitalize"}>{data.s}</span>
                        </p>
                        <p className={"text-sm"}>
                            <span>Quantity: </span>
                            <span>{data.q}</span>
                        </p>
                        <div className={"flex items-center justify-between"}>
                            <p className={"text-xl font-bold"}>${data.q * cart.price}</p>
                            <QuantityController data={data}/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default CartItem;