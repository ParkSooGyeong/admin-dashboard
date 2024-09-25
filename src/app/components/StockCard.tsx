"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { Line } from 'react-chartjs-2'; 
import 'chart.js/auto'; 
import Skeleton from '@mui/material/Skeleton'; 
import Box from '@mui/material/Box';
import { fetchStockData, transformStockDataToChart } from '../../lib/api'; 

interface StockCardProps {
  symbol: string;
  logo: string;
  company: string;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, logo, company }) => {
  const [chartData, setChartData] = useState<{ dates: string[], prices: number[] } | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [isRising, setIsRising] = useState<boolean | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const stockData = await fetchStockData(symbol);
        const transformedData = await transformStockDataToChart(stockData);
        
        setChartData(transformedData);

        const latestPrice = transformedData.prices[transformedData.prices.length - 1];
        const previousPrice = transformedData.prices[transformedData.prices.length - 2];
        setPrice(latestPrice);
        setIsRising(latestPrice >= previousPrice);
      } catch (error) {
        console.error('주식 데이터를 가져오는 데 실패했습니다.', error);
      }
    }
    getData();
  }, [symbol]);

  if (!chartData || price === null || isRising === null) {
    return (
      <Box className="bg-white shadow-md p-4 flex flex-col justify-between items-center">
        <div className="flex justify-between items-center w-full mb-2">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={96} height={40} />
        </div>
        <div className="flex justify-between w-full mt-2">
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={50} />
        </div>
        <div className="flex justify-between w-full mt-2">
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={50} />
        </div>
      </Box>
    );
  }

  const data = {
    labels: chartData.dates,
    datasets: [
      {
        label: company,
        data: chartData.prices,
        fill: true,
        backgroundColor: isRising ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
        borderColor: isRising ? '#4caf50' : '#f44336',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md p-4 flex flex-col justify-between items-center">
      <div className="flex justify-between items-center w-full mb-2">
        <Link href={`/stock/${symbol}`} passHref>
          <div className="flex justify-center items-center cursor-pointer">
            <Image src={logo} alt={`${company} 로고`} width={40} height={40} className="w-10 h-10" />
            <p className="pl-3 font-bold text-xl">{company}</p>
          </div>
        </Link>
        <div className="w-24 h-10">
          <Line
            data={data}
            options={{
              plugins: { legend: { display: false } },
              scales: { x: { display: false }, y: { display: false } },
            }}
          />
        </div>
      </div>

      <div className="flex justify-between w-full mt-2">
        <span className="text-gray-500 text-sm">총 주식</span>
        <span className="font-normal text-base">${price.toFixed(2)}</span>
      </div>

      <div className="flex justify-between w-full mt-2">
        <span className="text-gray-500 text-sm">총 수익</span>
        <span className={isRising ? "text-green-500 font-normal" : "text-red-500 font-normal"}>
          {isRising ? "▲" : "▼"} {((price / chartData.prices[chartData.prices.length - 2] - 1) * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default StockCard;
