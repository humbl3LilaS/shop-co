"use client"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {cancelTransaction} from "@/feature/client/transactions/actions/cancel-transaction";

const CancelTransactionBtn = ({transactionId, redirect}: { transactionId: string, redirect?: boolean }) => {
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const {toast} = useToast();

    const cancelHandler = async () => {
        setPending(true);
        const res = await cancelTransaction(transactionId);
        if (!res) {
            toast({
                title: `Cancel Transaction Failed`,
                variant: "destructive",
                duration: 500
            })
            setPending(false)
        }
        toast({
            title: `Successfully Cancelled Order#${transactionId}`,
            duration: 500,
        })
        if (redirect) {
            router.replace("/transactions");
        } else {
            router.refresh();
        }
        setPending(false)
    }

    return (
        <Button
            className={"mt-4 bg-red-500 text-white font-semibold hover:bg-red-700 transition-colors duration-500"}
            onClick={cancelHandler}
        >
            {
                pending
                    ? <>
                        <span>Cancelling Order</span>
                        <Loader2 className={"animate-spin"}/>
                    </>
                    : <span>Cancel Order</span>
            }
        </Button>
    );
};

export default CancelTransactionBtn;