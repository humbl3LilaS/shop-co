import Container from "@/components/admin/Container";
import {ArrowDownUp, ChartPie, ShoppingCart, User} from "lucide-react";
import {getSalesInfo} from "@/feature/admin/overview/actions/get-sales-info";

const OverviewPage = async () => {
    const salesData = await getSalesInfo();

    return (
        <Container className={"col-span-5"}>
            <div className={"py-10 px-14 grid grid-cols-4 gap-x-10 rounded-xl bg-white shadow-md"}>
                {/*Todo: replace with actual transaction data*/}
                <div className={"flex gap-x-4 border-r border-r-black/20"}>
                    <div className={"w-12 h-12 flex items-center justify-center bg-orange-300/30 rounded-lg"}>
                        <ShoppingCart stroke={"orange"}/>
                    </div>
                    <p className={"*:block"}>
                        <span className={"mb-1 text-black/30 text-sm"}>Order Completed</span>
                        <span className={"font-bold text-orange-600"}>{salesData?.completedOrders}</span>
                    </p>
                </div>

                <div className={"flex gap-x-4 border-r border-r-black/20"}>
                    <div className={"w-12 h-12 flex items-center justify-center bg-blue-300/30 rounded-lg"}>
                        <ArrowDownUp stroke={"blue"} />
                    </div>
                    <p className={"*:block"}>
                        <span className={"mb-1 text-black/30 text-sm"}>Total revenue made</span>
                        <span className={"font-bold text-blue-600"}>${salesData?.totalRevenue}</span>
                    </p>
                </div>

                <div className={"flex gap-x-4 border-r border-r-black/20"}>
                    <div className={"w-12 h-12 flex items-center justify-center bg-blue-200/30 rounded-lg"}>
                        <User color="#99c1f1" />
                    </div>
                    <p className={"*:block"}>
                        <span className={"mb-1 text-black/30 text-sm"}>Total Store visits</span>
                        <span className={"font-bold text-blue-400"}>2.5m</span>
                    </p>
                </div>

                <div className={"flex gap-x-4"}>
                    <div className={"w-12 h-12 flex items-center justify-center bg-red-300/30 rounded-lg"}>
                        <ChartPie stroke={"red"} />
                    </div>
                    <p className={"*:block"}>
                        <span className={"mb-1 text-black/30 text-sm"}>Total sales made</span>
                        <span className={"font-bold text-red-600"}>{salesData?.sales}</span>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default OverviewPage;