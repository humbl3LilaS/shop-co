import { cn } from "@/lib/utils";

const TransactionStatus = ({ status }: { status: string }) => {
    return (
        <span
            className={cn(
                "px-3 py-1 rounded-3xl text-white capitalize font-semibold",
                status === "pending" && { "bg-orange-400": true },
                status === "canceled" && { "bg-red-400": true },
                status === "delivered" && { "bg-green-400": true },
                status === "on-the-way" && { "bg-blue-600": true },
            )}
        >
            {status}
        </span>
    );
};

export default TransactionStatus;
