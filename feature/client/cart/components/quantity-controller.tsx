"use client"
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {ICart} from "@/types/object.types";
import {useCartStore} from "@/hooks/use-cart-store";
import {useQueryClient} from "@tanstack/react-query";


type QuantityControllerProps = {
    data: ICart[number]
}
const QuantityController = ({data}: QuantityControllerProps) => {
    const increaseQty = useCartStore(state => state.increaseQty)
    const reduceQty = useCartStore(state => state.reduceQty)
    const remove = useCartStore(state => state.remove)
    const queryClient = useQueryClient();
    return (
        <div className={"w-fit px-2 py-1 flex items-center gap-x-2 rounded-3xl bg-[#f0f0f0]"}>
            <Button
                variant={"link"} type={"button"}

                onClick={() => {
                    if (data.q === 1) {
                        console.log("performing remove")
                        remove({...data})
                        queryClient.removeQueries({
                            queryKey: ["cart-item", data.pid, data.cid, data.s],
                        })
                    } else {
                        reduceQty({...data})
                    }

                }}
            >

                <Minus/>
            </Button>
            <span>{data.q}</span>
            <Button variant={"link"} type={"button"}
                    onClick={() => increaseQty({...data, qty: 1})}
            >
                <Plus/>
            </Button>
        </div>
    );
};

export default QuantityController;