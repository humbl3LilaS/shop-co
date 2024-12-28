import Container from "@/components/admin/Container";
import { getSalePeriod } from "@/feature/admin/overview/lib/util";
import { Skeleton } from "@/components/ui/skeleton";

const Chart = () => {
    const salePeriod = getSalePeriod();
    return (
        <Container className={"col-span-3 row-span-2"}>
            <div className={"w-full h-full flex flex-col p-8 bg-white rounded-xl"}>
                <h2 className={"mb-2 text-2xl font-semibold leading-none tracking-tight"}>
                    Revenue
                </h2>
                <p className={"text-sm text-muted-foreground"}>
                    {salePeriod[0]} - {salePeriod[salePeriod.length - 1]} {new Date().getFullYear()}
                </p>
                <Skeleton className={"mt-4 flex-1  h-[340px] w-full bg-gray-100"} />
            </div>
        </Container>
    );
};

export default Chart;