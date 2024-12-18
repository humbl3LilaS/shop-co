import {getOrdersByTransactionId} from "@/feature/client/transactions/actions/get-orders-by-transaction-id";
import OrderItemList from "@/feature/client/transactions/components/order-item-list";
import {notFound} from "next/navigation";

const TransactionDetailPage = async ({params}: { params: Promise<{ transactionId: string }> }) => {
    const {transactionId} = await params;
    const orders = await getOrdersByTransactionId(transactionId);
    if (!orders) {
        return notFound();
    }

    return (
        <div>
            <header className={"mb-4"}>
                <h2 className={"text-2xl font-bold line-clamp-1"}>Order#{transactionId}</h2>
            </header>
            <OrderItemList data={orders}/>
        </div>
    );
};

export default TransactionDetailPage;