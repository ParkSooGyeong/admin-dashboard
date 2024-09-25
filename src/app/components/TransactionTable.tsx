import React from 'react';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: string;
  statusType: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-xl font-bold mb-4">거래 내역</h3>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead className="group/head text-xs uppercase text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">거래 내역</th>
            <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">날짜 & 시간</th>
            <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">금액</th>
            <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">상태</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b last:border-none">
              <td className="p-4 text-sm font-normal text-gray-900 dark:text-white">{transaction.id}</td>
              <td className="p-4 text-sm font-normal text-gray-500 dark:text-gray-400">{transaction.date}</td>
              <td className="p-4 text-sm font-semibold text-gray-900 dark:text-white">{transaction.amount}</td>
              <td className="p-4">
                <div className={`px-2 py-1 text-${transaction.statusType === 'completed' ? 'green' : 'red'}-800 bg-${transaction.statusType === 'completed' ? 'green' : 'red'}-100 rounded-full inline-block`}>
                  {transaction.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
