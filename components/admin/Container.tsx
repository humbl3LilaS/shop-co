import {ReactNode} from "react";
import {cn} from "@/lib/utils";

const Container = ({children, className}: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn("p-8 w-full h-full bg-[#f0f0f0]", className)}>
            {children}
        </div>
    );
};

export default Container;