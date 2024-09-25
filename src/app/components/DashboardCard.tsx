import React from "react";

interface DashboardCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
  changeType: "up" | "down";
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, value, label, change, changeType, color }) => {
  const changeColor = changeType === "up" ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
      <div className="flex items-center">
        <div className={`p-3 ${color} rounded-full`}>
          {icon}
        </div>
        <div className="ml-4">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </div>
      <div className={`${changeColor} font-bold`}>{change}</div>
    </div>
  );
};

export default DashboardCard;
