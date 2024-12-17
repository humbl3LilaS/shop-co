import {ITransaction} from "@/feature/client/transactions/actions/get-transactions";
import {format} from "date-fns";
import Link from "next/link";
import {cn} from "@/lib/utils";
import TransactionCard from "@/feature/client/transactions/components/transaction-card";

const TransactionsList = ({data}: { data: ITransaction[] }) => {
    return (
        <div className={"p-4 flex flex-col gap-y-3 border border-black/40 rounded-lg"}>
            {
                data.length === 0 && <p>No Transaction</p>
            }
            {
                data.length > 0 && data.map(item =>
                    <TransactionCard data={item} key={item.id}/>
                )
            }
        </div>
    );
};

export default TransactionsList;