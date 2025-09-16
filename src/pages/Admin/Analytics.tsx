/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useGetRideAnalyticsQuery } from "@/redux/features/ride/ride.api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const { data: rideData, isLoading } = useGetRideAnalyticsQuery(undefined);
  console.log(rideData,"rideData")

  if (isLoading) return <div className="p-6 text-lg">Loading Analytics...</div>;

  const analytics = rideData?.data || { monthlyData: [], totalRides: 0 };
  const labels = analytics.monthlyData.map(
    (item: any) => `${item.year}-${String(item.month).padStart(2, "0")}`
  );

  const rideVolume = analytics.monthlyData.map((item: any) => item.monthlyRides);
  const revenue = analytics.monthlyData.map((item: any) => item.revenue || 0);
  const activeDrivers = analytics.monthlyData.map((item: any) => item.activeDrivers || 0);

  const rideVolumeData = {
    labels,
    datasets: [
      {
        label: "Monthly Rides",
        data: rideVolume,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueTrendData = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenue,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        tension: 0.3,
      },
    ],
  };

  const driverActivityData = {
    labels,
    datasets: [
      {
        label: "Active Drivers",
        data: activeDrivers,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Monthly Rides" },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Revenue Trends" },
    },
  };

  const driverOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Driver Activity" },
    },
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-2xl shadow">
          <Bar data={rideVolumeData} options={barOptions} />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <Line data={revenueTrendData} options={lineOptions} />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow md:col-span-2">
          <Bar data={driverActivityData} options={driverOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
