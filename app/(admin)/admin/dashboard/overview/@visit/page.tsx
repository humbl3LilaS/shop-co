import Container from "@/components/admin/Container";
import {ChevronRight, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getVisitCount} from "@/feature/admin/overview/actions/get-visit-count";
import {IVisitsCount} from "@/types/api.types";
import {calculateVisitPercentage, formatVisitCount} from "@/feature/admin/overview/lib/util";
import VisitPercentage, {VisitPercentageVariant} from "@/feature/admin/overview/components/visit-percentage";

const VisitPage = async () => {
    const visitCount = await getVisitCount();
    const totalVisitCount = visitCount
        ? (Object.keys(visitCount).map(item => visitCount[item as keyof IVisitsCount]).reduce((a, b) => a + b, 0))
        : 100000
    return (
        <Container className={"col-span-2 row-span-2"}>
            <div className={"w-full h-full p-8 bg-white rounded-xl shadow-md flex flex-col"}>
                <header className={"mb-6"}>
                    <h2 className={"font-semibold"}>
                        Store Visits
                    </h2>
                    <p className={"text-black/40 text-sm"}>Detail about your store visits</p>
                </header>
                <div className={"flex gap-x-4"}>
                    <div className={"w-12 h-12 flex items-center justify-center bg-blue-200/30 rounded-lg"}>
                        <User color="#99c1f1"/>
                    </div>
                    <p className={"*:block"}>
                        <span className={"mb-1 font-bold"}>Pro Analytics</span>
                        <span className={"font-bold text-blue-400"}>
                            {formatVisitCount(totalVisitCount)}
                        </span>
                    </p>
                    <Button variant={"link"} className={"ml-auto"}>
                        <ChevronRight color="#99c1f1"/>
                    </Button>
                </div>
                <div className={"mt-8 flex flex-col justify-center gap-y-4"}>
                    {
                        visitCount && Object.keys(visitCount).map(item =>
                            <div key={item}>
                                <p className={"mb-1 flex justify-between text-sm "}>
                                    <span className={"capitalize"}>{item}</span>
                                    <span className={"text-black/50"}>
                                    {calculateVisitPercentage(totalVisitCount, visitCount[item as keyof IVisitsCount])}%
                                </span>
                                </p>
                                <VisitPercentage
                                    value={calculateVisitPercentage(totalVisitCount, visitCount[item as keyof IVisitsCount])}
                                    variant={item as VisitPercentageVariant}
                                />
                            </div>)
                    }
                </div>
            </div>
        </Container>
    );
};

export default VisitPage;