"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Transaction {
  logo: string;
  company: string;
  symbol: string;
  type: string;
  interestRate: string;
  ratio: string;
  isPositive: boolean;
  amount: string;
  date: string;
}

const transactions: Transaction[] = [
  {
    logo: '/images/apple-logo.svg',
    company: 'Apple Inc.',
    symbol: 'AAPL',
    type: 'Buy Stock',
    interestRate: '3.8%',
    ratio: '3.69%',
    isPositive: true,
    amount: '+ $9346',
    date: '20 Sep, 27',
  },
  {
    logo: '/images/amazon-logo.svg',
    company: 'Amazon',
    symbol: 'AMZN',
    type: 'Buy Stock',
    interestRate: '2.7%',
    ratio: '3.69%',
    isPositive: true,
    amount: '+ $6879',
    date: '20 Sep, 27',
  },
  {
    logo: '/images/netflix-logo.svg',
    company: 'Netflix',
    symbol: 'NFLX',
    type: 'Buy Stock',
    interestRate: '2.5%',
    ratio: '-3.69%',
    isPositive: false,
    amount: '- $1439',
    date: '20 Sep, 27',
  },
  {
    logo: '/images/ibm-logo.svg',
    company: 'IBM',
    symbol: 'IBM', 
    type: 'Buy Stock',
    interestRate: '1.8%',
    ratio: '-3.69%',
    isPositive: false,
    amount: '- $2329',
    date: '20 Sep, 27',
  },
  {
    logo: '/images/meta-logo.svg',
    company: 'Meta',
    symbol: 'META', 
    type: 'Buy Stock',
    interestRate: '3.7%',
    ratio: '3.69%',
    isPositive: true,
    amount: '+ $1026',
    date: '20 Sep, 27',
  },
  {
    logo: '/images/microsoft-logo.svg',
    company: 'Microsoft',
    symbol: 'MSFT', 
    type: 'Buy Stock',
    interestRate: '3.7%',
    ratio: '3.69%',
    isPositive: true,
    amount: '+ $3226',
    date: '20 Sep, 27',
  },
  {
    logo: '/images/tesla-logo.svg',
    company: 'Tesla',
    symbol: 'TSLA',
    type: 'Buy Stock',
    interestRate: '3.7%',
    ratio: '-1.24%',
    isPositive: false,
    amount: '- $6426',
    date: '20 Sep, 27',
  },
];

const LatestTransactions: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-xl font-bold mb-4">최신 거래 내역</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
            <div className="flex items-center w-2/5">
              <Link href={`/stock/${transaction.symbol}`}>
                  <Image src={transaction.logo} alt={transaction.company} width={40} height={40} />
              </Link>
              <div className="ml-3">
                <p className="font-semibold">{transaction.company}</p>
                <p className="text-gray-500 text-xs">{transaction.type}</p>
              </div>
            </div>
            <div className="text-right w-1/5">
              <p className="font-semibold">이자율</p>
              <p className="text-gray-500 text-xs">{transaction.interestRate}</p>
            </div>
            <div className="text-right w-1/5">
              <p className={transaction.isPositive ? 'text-green-500' : 'text-red-500'}>
                {transaction.isPositive ? '▲' : '▼'} {transaction.ratio}
              </p>
              <p className="text-gray-500 text-xs">비율</p>
            </div>
            <div className="text-right w-1/5">
              <p>{transaction.amount}</p>
              <p className="text-gray-400 text-xs">{transaction.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestTransactions;
