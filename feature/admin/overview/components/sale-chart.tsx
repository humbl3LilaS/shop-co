"use client"

import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useQuery} from "@tanstack/react-query";
import {getSalesPerMonth} from "@/feature/admin/overview/actions/get-sales-per-month";
import {getSalePlaceHolder} from "@/feature/admin/overview/util/get-sale-period";


const chartConfig = {
    desktop: {
        label: "Revenue",
        color: "blue",
    },
} satisfies ChartConfig

export default function SaleChart() {
    const {data} = useQuery({
        queryKey: ["sale-data"],
        queryFn: getSalesPerMonth,
        staleTime: Infinity,
        placeholderData: getSalePlaceHolder
    })

    console.log(data)
    return (
        <Card className={"rounded-xl p-4 "}>
            <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className={"max-h-[260px] w-full"}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}

                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Line
                            dataKey="revenue"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
