import {getTransactionDetails} from "@/feature/client/transactions/actions/get-transaction-details";
import {notFound} from "next/navigation";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import CancelTransactionBtn from "@/feature/client/transactions/components/cancel-transaction-btn";

const DetailsInTransactionPage = async ({params}: { params: Promise<{ transactionId: string }> }) => {
    const {transactionId} = await params;
    const details = await getTransactionDetails(transactionId);
    if (!details) {
        return notFound()
    }
    return (
        <div className={"mt-8 border border-black/40 p-4 rounded-lg"}>
            <h3 className={"mb-4 font-bold"}>Order Details</h3>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Region: </span>
                <span>{details.region}</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Township: </span>
                <span>{details.township}</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Address: </span>
                <span>{details.address}</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Postal Number: </span>
                <span>{details.postalCode}</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Phone Number: </span>
                <span>{details.phoneNumber}</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Email: </span>
                <span>{details.email}</span>
            </p>
            <p className={"mb-3"}>
                <span className={"font-bold text-black/60"}>Ordered Date: </span>
                <span>{format(details.createdAt, "do MMM yyyy")}</span>
            </p>
            <p>
                <span className={"font-bold text-black/60"}>Status: </span>
                <span
                    className={
                        cn(
                            "px-3 py-1 rounded-3xl text-white capitalize font-semibold",
                            details.status === "pending" && {"bg-orange-400": true},
                            details.status === "canceled" && {"bg-red-400": true},
                            details.status === "delivered" && {"bg-green-400": true},
                            details.status === "on-the-way" && {"bg-blue-600": true},
                        )
                    }
                >
                                {details.status}
                </span>
            </p>
            {
                details.status === "pending" &&
                <CancelTransactionBtn transactionId={transactionId} redirect={true}/>
            }
        </div>
    );
};

export default DetailsInTransactionPage;