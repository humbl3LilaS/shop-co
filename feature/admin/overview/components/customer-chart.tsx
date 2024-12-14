"use client"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {RadialBar, RadialBarChart} from "recharts";

const chartData = [

    {
        customer: "nc",
        percentage: 48,
        fill: "orange"
    },
    {
        customer: "rc",
        percentage: 25,
        fill: "blue"
    },
    {
        customer: "cc",
        percentage: 66,
        fill: "red"
    },
]

const chartConfig = {
    customer: {
        label: "Customers",

    },
    cc: {
        label: "Current Customer",
        color: "red"
    },
    nc: {
        label: "New Customer",
        color: "blue"
    },
    rc: {
        label: "Retargeted Customer",
        color: "orange"
    }
} satisfies ChartConfig;

const CustomerChart = () => {
    return (
        <div className={"w-full h-full grid grid-cols-2 "}>
            <div className={"flex flex-col gap-y-4 justify-center"}>
                <div className="flex items-start gap-x-4">
                    <div className={"w-3 h-3 mt-1.5 rounded-full bg-red-600"}/>
                    <div className={"text-sm"}>
                        <p>Current Customers</p>
                        <p>66%</p>
                    </div>
                </div>
                <div className="flex items-start gap-x-4">
                    <div className={"w-3 h-3 mt-1.5 rounded-full bg-blue-700"}/>
                    <div className={"text-sm"}>
                        <p>New Customers</p>
                        <p>48%</p>
                    </div>
                </div>
                <div className="flex items-start gap-x-4">
                    <div className={"w-3 h-3 mt-1.5 rounded-full bg-orange-400"}/>
                    <div className={"text-sm"}>
                        <p>Retargeted Customers</p>
                        <p>66%</p>
                    </div>
                </div>
            </div>
            <ChartContainer config={chartConfig} className={"w-full h-full"}>
                <RadialBarChart
                    data={chartData}
                    innerRadius={50}
                    outerRadius={80}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel nameKey={"customer"}/>}
                    />
                    <RadialBar dataKey={"percentage"} background/>
                </RadialBarChart>
            </ChartContainer>
        </div>
    );
};

export default CustomerChart;