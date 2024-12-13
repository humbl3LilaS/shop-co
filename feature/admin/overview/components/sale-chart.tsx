"use client"

import {TrendingUp} from "lucide-react"
import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    {month: "January", revenue: 186},
    {month: "February", revenue: 305},
    {month: "March", revenue: 237},
    {month: "April", revenue: 73},
    {month: "May", revenue: 209},
    {month: "June", revenue: 214},
]

const chartConfig = {
    desktop: {
        label: "Revenue",
        color: "blue",
    },
} satisfies ChartConfig

export default function SaleChart() {
    return (
        <Card className={"rounded-xl p-4 "}>
            <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent >
                <ChartContainer config={chartConfig} className={"max-h-[260px] w-full"}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
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
