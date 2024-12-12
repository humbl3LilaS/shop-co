"use client"
import {Button} from "@/components/ui/button";
import {ReactNode, useState} from "react";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

type ActionButtonProps = {
    onClick: () => void,
    children: ReactNode,
    className?: string,
    pendingLabel?: string;
}

const ActionButton = ({onClick, pendingLabel, className, children}: ActionButtonProps) => {
    const [pending, setPending] = useState(false)
    return (
        <Button
            disabled={pending}
            onClick={() => {
                setPending(true);
                onClick();
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
    );
};

export default ActionButton;