"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Skeleton from '@mui/material/Skeleton'; // Material-UI Skeleton 사용
import { Box } from '@mui/material';
import { FiHash } from 'react-icons/fi'; // react-icons에서 해시 아이콘 사용

interface CompanyOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  DividendYield: string;
}

const CompanyPage = () => {
  const [companyData, setCompanyData] = useState<CompanyOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { symbol } = useParams();

  useEffect(() => {
    if (symbol) {
      const fetchCompanyOverview = async () => {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`
          );
          const data = await response.json();

          if (data.Note) {
            setError("API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.");
          } else if (data.Symbol) {
            setCompanyData(data);
          } else {
            setError("회사 데이터를 가져오지 못했습니다.");
          }
        } catch (err) {
          console.error(err);
          setError("회사 데이터를 불러오는 중 문제가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchCompanyOverview();
    }
  }, [symbol]);

  if (loading) {
    return (
      <Box className="container mx-auto p-4">
        {/* 스켈레톤 로딩 UI */}
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="rectangular" width="100%" height={100} />
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
      </Box>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!companyData) {
    return <p>회사를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{companyData.Name}</h1>
      <p className="text-sm mb-2 flex items-center">
        <FiHash className="mr-2" /> {/* Symbol 아이콘 */}
        <strong>Symbol:</strong> {companyData.Symbol}
      </p>
      <p className="mb-4">{companyData.Description}</p>

      <h2 className="text-xl font-semibold">Company Details</h2>
      <ul className="list-disc list-inside">
        <li><strong>Sector:</strong> {companyData.Sector}</li>
        <li><strong>Industry:</strong> {companyData.Industry}</li>
        <li><strong>Market Capitalization:</strong> {companyData.MarketCapitalization}</li>
        <li><strong>PE Ratio:</strong> {companyData.PERatio}</li>
        <li><strong>Dividend Yield:</strong> {companyData.DividendYield}</li>
      </ul>
    </div>
  );
};

export default CompanyPage;
