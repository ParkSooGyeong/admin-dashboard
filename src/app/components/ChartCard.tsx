import dynamic from 'next/dynamic';
import React from 'react';

// ApexCharts를 dynamic import로 변경
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartCardProps {
  title: string;
  value: string;
  percentage: string;
  chartOptions: any;
  chartSeries: any;
  chartType: 'line' | 'bar' | 'pie';
}

const ChartCard: React.FC<ChartCardProps> = ({ title, value, percentage, chartOptions, chartSeries, chartType }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-green-500 font-bold">{percentage}</div>
      <ApexCharts options={chartOptions} series={chartSeries} type={chartType} height={300} />
    </div>
  );
};

export default ChartCard;
