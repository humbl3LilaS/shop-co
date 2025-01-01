import { ITransaction } from "@/feature/client/transactions/actions/get-transactions";
import Link from "next/link";
import { format } from "date-fns";
import CancelTransactionBtn from "@/feature/client/transactions/components/cancel-transaction-btn";
import TransactionStatus from "@/components/share/transaction-status";

const TransactionCard = ({ data }: { data: ITransaction }) => {
    return (
        <div className={"p-4  bg-[#f0f0f0] rounded-lg"}>
            <p
                className={
                    "w-fit mb-1 border-b border-b-transparent line-clamp-1 font-bold text-lg hover:border-b-black/40 transition-colors duration-500"
                }
            >
                <Link href={`/transactions/${data.id}`}>Order#{data.id}</Link>
            </p>
            <p className={"mt-3"}>Ordered at: {format(data.createdAt, "do MMM yyyy")}</p>
            <p className={"mt-3 flex items-center gap-x-3"}>
                <span>Status: </span>
                <TransactionStatus status={data.status} />
            </p>
            {data.status === "pending" && <CancelTransactionBtn transactionId={data.id} />}
        </div>
    );
};

export default TransactionCard;
