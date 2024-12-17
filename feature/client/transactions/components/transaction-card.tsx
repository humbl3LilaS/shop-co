import {ITransaction} from "@/feature/client/transactions/actions/get-transactions";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import CancelTransactionBtn from "@/feature/client/transactions/components/cancel-transaction-btn";

const TransactionCard = ({data}: { data: ITransaction }) => {
    return (
        <div className={"p-4  bg-[#f0f0f0] rounded-lg"}>

            <p className={"w-fit mb-1 border-b border-b-transparent line-clamp-1 font-bold text-lg hover:border-b-black/40 transition-colors duration-500"}>
                <Link href={`/transactions/${data.id}`}>
                    Order#{data.id}
                </Link>
            </p>
            <p className={"mt-3"}>
                Ordered at: {format(data.createdAt, "do MMM yyyy")}
            </p>
            <p className={"mt-3 flex items-center gap-x-3"}>
                <span>Status: </span>
                <span
                    className={
                        cn(
                            "px-3 py-1 rounded-3xl text-white capitalize font-semibold",
                            data.status === "pending" && {"bg-orange-400": true},
                            data.status === "canceled" && {"bg-red-400": true},
                            data.status === "delivered" && {"bg-green-400": true},
                            data.status === "on-the-way" && {"bg-blue-600": true},
                        )
                    }
                >
                                {data.status}
                </span>
            </p>
            {
                data.status === "pending" &&
                <CancelTransactionBtn transactionId={data.id}/>
            }
        </div>
    );
};

export default TransactionCard;