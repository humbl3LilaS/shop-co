import {useGetItemInCart} from "@/feature/public/cart/hooks/use-get-items-in-cart";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {useCallback} from "react";
import {useCartStore} from "@/hooks/use-cart-store";
import {useQueryClient} from "react-query";

type CartListProps = {
    ids: Array<{ pid: string, cid: string }>
}

const CartList = ({ids}: CartListProps) => {
    const cart = useCartStore(state => state.cart);
    const removeFromCart = useCartStore(state => state.remove);
    const {data, isFetching} = useGetItemInCart(ids);
    console.log(isFetching, data);
    const queryClient = useQueryClient();

    const getSize = useCallback((pid: string, cid: string) => {
        return cart.find(item => item.pid === pid && item.cid === cid)?.s;
    }, [cart])

    const getQuantity = useCallback((pid: string, cid: string) => {
        return cart.find(item => item.pid === pid && item.cid === cid)?.q;
    }, [cart])

    return (
        <div className={"mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg"}>
            {
                data && data.map((item, idx) =>
                    <div
                        key={item.name + idx}
                        className={"flex items-center gap-x-4"}
                    >
                        <div className={"max-w-25 aspect-square"}>
                            <Image src={item.imageUrl} alt={item.name} width={500} height={500} className={"rounded-lg"}/>
                        </div>
                        <div>
                            <h3 className={"flex items-center justify-between uppercase  gap-x-4"}>
                                <span className={"font-bold text-lg line-clamp-1"}>
                                    {item.name}
                                </span>
                                <Button
                                    variant={"link"}
                                    onClick={async () => {
                                        removeFromCart(item.pid, item.cid ?? "")

                                        queryClient.setQueryData(["cart"], data.filter(cartItem => cartItem.pid !== item.pid || cartItem.cid !== item.cid))

                                    }}
                                >
                                    <Trash color={"red"}/>
                                </Button>
                            </h3>
                            <p className={"flex items-center gap-x-4"}>
                                <span>Color: </span>
                                <span className={"sr-only"}>{item.color}</span>
                                <span
                                    className={"block w-6 aspect-square rounded-full"}
                                    style={{
                                        backgroundColor: `#${item.color}`
                                    }}
                                />

                            </p>
                            <p>
                                <span>Size: </span>
                                <span>{getSize(item.pid, item.cid ?? "")}</span>
                            </p>
                            <p>
                                <span>Quantity: </span>
                                <span>{getQuantity(item.pid, item.cid ?? "")}</span>
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CartList;