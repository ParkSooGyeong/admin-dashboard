import React from "react";
import Image from "next/image";

interface Country {
  id: string;
  name: string;
  percentage: number;
  flag: string;
}

interface CountryStatsProps {
  countries: Country[];
}

const CountryStats: React.FC<CountryStatsProps> = ({ countries }) => {
  return (
    <ul className="mt-4">
      {countries.map((country) => (
        <li key={country.id} className="flex justify-between items-center py-2">
          <div className="w-2/5 flex items-center space-x-2">
            <Image src={country.flag} alt={country.name} width={100} height={50} className="w-6 h-4" />
            <span>{country.name}</span>
          </div>
          <div className="w-3/5 flex justify-end">
            <div className="relative w-full bg-gray-200 rounded-full h-6">
              <div
                className="bg-blue-500 h-full rounded-full text-white text-center text-xs flex items-center justify-center"
                style={{ width: `${country.percentage}%` }}
              >
                {country.percentage}%
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CountryStats;
