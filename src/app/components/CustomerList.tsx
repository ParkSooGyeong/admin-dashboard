import Avatar from "@mui/material/Avatar";
import React from 'react';
import { Customer } from '../dashboard/types'

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">최신 고객</h3>
        <a href="#" className="text-blue-500">
          모두 보기
        </a>
      </div>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <Avatar sx={{ bgcolor: customer.avatarColor }}>{customer.avatarInitial}</Avatar>
              <div className="ml-3">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {customer.name}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {customer.email}
                </p>
              </div>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {customer.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CustomerList;
