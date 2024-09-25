import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface Stock {
  logo: string;
  company: string;
  symbol: string; 
  price: string;
  changePercent: string;
  changeAmount: string;
  isPositive: boolean;
}

const trendingStocks: Stock[] = [
  {
    logo: '/images/netflix-logo.svg',
    company: 'Netflix',
    symbol: 'NFLX',
    price: '$12,453.00',
    changePercent: '0.14%',
    changeAmount: '+ $1,984.00',
    isPositive: true,
  },
  {
    logo: '/images/apple-logo.svg',
    company: 'Apple Inc.',
    symbol: 'AAPL',
    price: '$132,453.00',
    changePercent: '1.03%',
    changeAmount: '+ $2,634.00',
    isPositive: true,
  },
  {
    logo: '/images/meta-logo.svg',
    company: 'Meta',
    symbol: 'META',
    price: '$31,428.00',
    changePercent: '0.08%',
    changeAmount: '+ $2,432.00',
    isPositive: true,
  },
];

const TrendingStocks: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">인기 주식</h2>
        <HiOutlineDotsHorizontal className="text-gray-500 w-6 h-6 cursor-pointer" />
      </div>
      <ul>
        {trendingStocks.map((stock, index) => (
          <li key={index} className="py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link href={`/stock/${stock.symbol}`}>
                  <Image src={stock.logo} alt={stock.company} width={40} height={40} />
                </Link>
                <div className="ml-3">
                  <p className="font-semibold text-xl">{stock.company}</p>
                  <p className="text-gray-500 text-sm">{stock.price}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={stock.isPositive ? 'text-green-500' : 'text-red-500'}>
                  {stock.isPositive ? '▲' : '▼'} {stock.changePercent}
                </p>
                <p className="text-gray-500 text-sm">{stock.changeAmount}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md w-1/2 mr-2">Short</button>
              <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md w-1/2">Buy</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingStocks;
