import { ICart } from "@/types/object.types";
import { getItemDataOption } from "@/feature/client/cart/hooks/get-item-data-option";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItemData } from "@/feature/client/cart/actions/get-cart-item-data";

type CheckoutProductCardProps = {
    data: ICart[number];
};
const CheckoutProductCard = ({ data }: CheckoutProductCardProps) => {
    const queryClient = useQueryClient();

    const { data: cart, isFetching } = useQuery({
        ...getItemDataOption({ ...data }),
        placeholderData: () => {
            return queryClient.getQueriesData({
                queryKey: ["cart-item", data.pid, data.cid, data.s],
            }) as unknown as Awaited<ReturnType<typeof getCartItemData>>;
        },
    });
    return (
        <>
            {isFetching && (
                <div>
                    <Skeleton className={"w-full h-[200px] "} />
                </div>
            )}
            {!isFetching && cart && (
                <div className={"flex items-center gap-x-4 md:justify-between"}>
                    <div className={" aspect-square"}>
                        <Image
                            src={cart?.imageUrl ?? ""}
                            alt={cart?.name ?? ""}
                            width={500}
                            height={500}
                            className={"w-25 aspect-square rounded-lg md:w-[150px] lg:w-[200px]"}
                        />
                    </div>
                    <div className={"md:flex-1"}>
                        <h3 className={"font-bold uppercase text-lg line-clamp-1"}>{cart?.name}</h3>
                        <p className={"flex items-center gap-x-4"}>
                            <span className={"text-sm"}>Color: </span>
                            <span className={"sr-only"}>{cart?.color}</span>
                            <span
                                className={"block w-6 aspect-square rounded-full"}
                                style={{
                                    backgroundColor: `#${cart?.color}`,
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
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckoutProductCard;
