import {IOrderInfo} from "@/feature/client/transactions/actions/get-orders-by-transaction-id";
import Image from "next/image";

const OrderItemList = ({data}: { data: IOrderInfo[] }) => {
    return (
        <div className={"flex flex-col gap-y-3"}>
            {
                data.map(item =>
                    <div className={"flex items-center gap-x-4 md:justify-between"} key={item.id}>
                        <div className={" aspect-square"}>
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={500}
                                height={500}
                                className={"w-25 aspect-square rounded-lg md:w-[150px] lg:w-[200px]"}
                            />
                        </div>

                        <div className={"md:flex-1 flex flex-col gap-y-1.5"}>
                            <h3 className={"uppercase"}>
                                <span className={"font-bold text-lg line-clamp-1"}>
                                    {item.name}
                                </span>
                            </h3>
                            <p className={"flex items-center gap-x-4"}>
                                <span className={"text-sm"}>Color: </span>
                                <span className={"sr-only"}>{item.colorHex}</span>
                                <span
                                    className={"block w-6 aspect-square rounded-full"}
                                    style={{
                                        backgroundColor: `#${item.colorHex}`
                                    }}
                                />
                            </p>
                            <p className={"text-sm"}>
                                <span>Size: </span>
                                <span className={"capitalize"}>{item.size}</span>
                            </p>
                            <p className={"text-sm"}>
                                <span>Quantity: </span>
                                <span>{item.quantity}</span>
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default OrderItemList;