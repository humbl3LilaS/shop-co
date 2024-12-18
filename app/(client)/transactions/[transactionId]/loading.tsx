import {Skeleton} from "@/components/ui/skeleton";

const TransactionDetailsLoading = () => {
    return (
        <div className={"flex flex-col gap-y-3"}>
            {
                [0, 1].map(item =>
                    <div className={"flex items-center gap-x-4 md:justify-between"} key={item}>
                        <Skeleton className={"w-25 aspect-square rounded-lg md:w-[150px] lg:w-[200px]"}/>
                        <div className={"w-full h-full md:flex-1 flex flex-col gap-y-1.5"}>
                            <Skeleton className={"w-4/5 h-5"}/>
                            <Skeleton className={"w-2/5 h-3"}/>
                            <Skeleton className={"w-2/5 h-3"}/>
                            <Skeleton className={"w-2/5 h-3"}/>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default TransactionDetailsLoading;