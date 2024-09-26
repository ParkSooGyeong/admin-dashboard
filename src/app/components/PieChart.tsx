import React from 'react';
import ApexCharts from 'react-apexcharts';
import { PieChartProps } from '../dashboard/types'

const PieChart: React.FC<PieChartProps> = ({ pieData, pieChartData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">유입 경로 개요</h3>
      <ApexCharts options={pieData.options} series={pieData.series} type="pie" height={400} />
      <table className="w-full text-left mt-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">유입 경로</th>
            <th className="px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">사용자</th>
            <th className="px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">유입율</th>
          </tr>
        </thead>
        <tbody>
          {pieChartData.map((source, index) => (
            <tr key={index} className="group/row text-gray-500 dark:text-gray-400">
              <td className="px-4 py-3 text-left align-middle text-sm font-normal">{source.name}</td>
              <td className="px-4 py-3 align-middle text-xs font-medium text-gray-900 dark:text-white">{source.users.toLocaleString()}</td>
              <td className="px-4 py-3 align-middle text-xs">
                <div className="flex items-center">
                  <span>{source.percentage}%</span>
                  <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${source.percentage}%` }}></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PieChart;
