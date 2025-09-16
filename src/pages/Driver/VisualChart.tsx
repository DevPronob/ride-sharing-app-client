"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useGetEarningsQuery } from "@/redux/features/driver/driver.api"

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const chartConfig = {
  monthlyEarnings: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
  totalRides: {
    label: "Rides",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function VisualChart() {
  const { data } = useGetEarningsQuery(undefined)

  const rawData = data?.data.earningsByMonth || []

  const chartData = months.map((m, i) => {
    const found = rawData.find((item: any) => item.month === i + 1)
    return {
      month: m,
      monthlyEarnings: found?.monthlyEarnings ?? 0,
      totalRides: found?.totalRides ?? 0,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Earnings</CardTitle>
        <CardDescription>{`Year ${new Date().getFullYear()}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="monthlyEarnings" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="totalRides" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {data?.data.totalEarnings ?? 0} BDT <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total earnings for the year
        </div>
      </CardFooter>
    </Card>
  )
}
