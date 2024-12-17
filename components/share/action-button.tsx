"use client"
import {Button} from "@/components/ui/button";
import {ReactNode, useState} from "react";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

type ActionButtonProps = {
    onClick: () => void,
    children: ReactNode,
    className?: string,
    pendingLabel?: string;
    refresh?: boolean;
}

const ActionButton = ({onClick, pendingLabel, className, children, refresh}: ActionButtonProps) => {
    const [pending, setPending] = useState(false)
    const router = useRouter();
    return (
        <Button
            disabled={pending}
            onClick={async () => {
                setPending(true);
                await onClick();
                if (refresh) {
                    router.refresh();
                }
            }}
            className={cn("flex items-center gap-x-2", className)}
        >
            {
                pending ? <>
                    {pendingLabel ? <span>{pendingLabel}</span> : children}
                    <Loader2 className={"animate-spin"}/>
                </> : children
            }
        </Button>
    )
        ;
};

export default ActionButton;