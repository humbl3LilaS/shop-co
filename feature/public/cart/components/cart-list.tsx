import {useGetItemInCart} from "@/feature/public/cart/hooks/use-get-items-in-cart";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Loader2, ShoppingCart, Trash} from "lucide-react";
import {useCallback} from "react";
import {useCartStore} from "@/hooks/use-cart-store";
import {useQueryClient} from "react-query";

type CartListProps = {
    ids: Array<{ pid: string, cid: string }>
}

const CartList = ({ids}: CartListProps) => {

    // retrieval and mutationFn of cart data store in the session storage
    const cart = useCartStore(state => state.cart);
    const removeFromCart = useCartStore(state => state.remove);


    // Get data related to color and product from the database
    const {data, isFetching, isError} = useGetItemInCart(ids);

    // For mutating the function
    const queryClient = useQueryClient();

    const getSize = useCallback((pid: string, cid: string) => {
        return cart.find(item => item.pid === pid && item.cid === cid)?.s;
    }, [cart])

    const getQuantity = useCallback((pid: string, cid: string) => {
        return cart.find(item => item.pid === pid && item.cid === cid)?.q;
    }, [cart])

    if (isFetching) {
        return <div className={"mt-4 p-4 border border-black/20 rounded-lg"}>
            <h3 className={"py-8 text-center font-bold text-2xl flex items-center justify-center gap-x-3"}>
                <span>Loading</span> <Loader2 className={"animate-spin text-black/60"}/>
            </h3>
        </div>
    }

    if (isError) {
        return <h3 className={"py-8 text-center font-bold text-2xl flex items-center justify-center gap-x-3"}>
            <ShoppingCart strokeWidth={2.25}/> <span>Empty Cart</span>
        </h3>
    }
    console.log("data return ", data)

    return (
        <div className={"mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg"}>
            {
                (!data || data?.length === 0) &&
                <h3 className={"py-8 text-center font-bold text-2xl flex items-center justify-center gap-x-3"}>
                    <ShoppingCart strokeWidth={2.25}/> <span>Empty Cart</span>
                </h3>
            }

            {
                data && data.length > 0 && data.map((item, idx) =>
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