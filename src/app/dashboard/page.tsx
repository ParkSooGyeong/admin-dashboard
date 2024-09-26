"use client";

// import { useState } from "react";
import ApexCharts from "react-apexcharts";
// import Avatar from "@mui/material/Avatar";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaEye, FaDollarSign, FaBox, FaUsers } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import Image from "next/image";
import TransactionTable from "../components/TransactionTable";
import CustomeerList from '../components/CustomerList'
import PieChart from "../components/PieChart";
import CountryStats from '../components/CountryStats';
import { PieChartList, Customer, Transaction, Country } from './types';

const Dashboard = () => {
  // const [geoData, setGeoData] = useState(null); 
  const countriesData: Country[] = [
    { id: "KOR", name: "대한민국", percentage: 87, flag: "https://flagcdn.com/kr.svg" },
    { id: "USA", name: "미국", percentage: 35, flag: "https://flagcdn.com/us.svg" },
    { id: "CAN", name: "캐나다", percentage: 26, flag: "https://flagcdn.com/ca.svg" },
    { id: "FRA", name: "프랑스", percentage: 18, flag: "https://flagcdn.com/fr.svg" },
    { id: "ITA", name: "이탈리아", percentage: 14, flag: "https://flagcdn.com/it.svg" },
    { id: "AUS", name: "호주", percentage: 10, flag: "https://flagcdn.com/au.svg" },
    { id: "IND", name: "인도", percentage: 7, flag: "https://flagcdn.com/in.svg" },
  ];

  const lineData = {
    options: {
      chart: {
        id: "수익-차트",
      },
      xaxis: {
        categories: ["2월 1일", "2월 2일", "2월 3일", "2월 4일", "2월 5일", "2월 6일", "2월 7일"],
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#a60a15", "#2d3da1"],
    },
    series: [
      {
        name: "수익",
        data: [6200, 6400, 6200, 6300, 6600, 6700, 6300],
      },
      {
        name: "이전 기간 수익",
        data: [6600, 6500, 6400, 6500, 6700, 6800, 6600],
      },
    ],
  };

  const barData1 = {
    options: {
      chart: {
        id: "제품-차트",
      },
      xaxis: {
        categories: ["월", "화", "수", "목", "금", "토", "일"],
      },
      colors: ["#2d3da1", "#a60a15"],
    },
    series: [
      {
        name: "신제품",
        data: [240, 300, 280, 320, 310, 350, 340],
      },
      {
        name: "지난주",
        data: [220, 280, 270, 310, 290, 320, 330],
      },
    ],
  };
  const barData2 = {
    options: {
      chart: {
        id: "제품-차트",
        stacked: true, // 겹친 막대차트로 설정
      },
      xaxis: {
        categories: ["월", "화", "수", "목", "금", "토", "일"],
      },
      colors: ["#1F77B4", "#FF7F0E"],
    },
    series: [
      {
        name: "신제품",
        data: [240, 300, 280, 320, 310, 350, 340],
      },
      {
        name: "지난주",
        data: [220, 280, 270, 310, 290, 320, 330],
      },
    ],
  };
  const transactionData: Transaction[] = [
    {
      id: 1,
      description: "#00910 환불",
      date: "2021년 4월 23일",
      amount: "-$670",
      status: "완료됨",
      statusColor: "text-green-800 bg-green-100",
    },
    {
      id: 2,
      description: "#087651 결제 실패",
      date: "2021년 4월 18일",
      amount: "$234",
      status: "취소됨",
      statusColor: "text-red-700 bg-purple-100",
    },
    {
      id: 3,
      description: "유관순 결제",
      date: "2021년 4월 15일",
      amount: "$5,000",
      status: "진행 중",
      statusColor: "text-purple-700 bg-purple-100",
    },
    {
      id: 4,
      description: "김구 결제",
      date: "2021년 4월 15일",
      amount: "$2,300",
      status: "완료됨",
      statusColor: "text-green-800 bg-green-100",
    },
    {
      id: 5,
      description: "THEMESBERG LLC 결제",
      date: "2021년 4월 11일",
      amount: "$560",
      status: "완료됨",
      statusColor: "text-green-800 bg-green-100",
    },
    {
      id: 6,
      description: "유관순 결제",
      date: "2021년 4월 6일",
      amount: "$1,437",
      status: "완료됨",
      statusColor: "text-green-800 bg-green-100",
    },
  ];
  const pieData = {
    options: {
      labels: ["유기적 검색", "추천", "직접", "소셜", "기타", "이메일"],
      colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0", "#546E7A", "#26a69a"],
    },
    series: [30, 24, 18, 12, 9, 7],
  };
  const pieChartData: PieChartList[] = [
    { name: "유기적 검색", users: 5649, percentage: 30 },
    { name: "추천", users: 4025, percentage: 24 },
    { name: "직접", users: 3105, percentage: 18 },
    { name: "소셜", users: 1251, percentage: 12 },
    { name: "기타", users: 734, percentage: 9 },
    { name: "이메일", users: 456, percentage: 7 },
  ];
  const customersData: Customer[] = [
    {
      id: 1,
      name: "세종대왕",
      email: "sejong@korea.com",
      amount: "$320",
      avatarColor: '#ff5722',
      avatarInitial: "세",
    },
    {
      id: 2,
      name: "이순신",
      email: "soonshin@naval.com",
      amount: "$3467",
      avatarColor: "#6a1b9a",
      avatarInitial: "이",
    },
    {
      id: 3,
      name: "안중근",
      email: "joonggeun@hero.com",
      amount: "$67",
      avatarColor: "#ff5722",
      avatarInitial: "안",
    },
    {
      id: 4,
      name: "김구",
      email: "kimkoo@freedom.com",
      amount: "$2367",
      avatarColor: "#00bcd4",
      avatarInitial: "김",
    },
    {
      id: 5,
      name: "유관순",
      email: "gwansoon@independence.com",
      amount: "$367",
      avatarColor: "#009688",
      avatarInitial: "유",
    },
  ];
  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FaEye className="text-green-500 text-2xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">3.456천</div>
              <div className="text-sm text-gray-500">총 조회수</div>
            </div>
          </div>
          <div className="text-green-500 font-bold">0.43% ↑</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaDollarSign className="text-orange-500 text-2xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">$42.2천</div>
              <div className="text-sm text-gray-500">총 수익</div>
            </div>
          </div>
          <div className="text-green-500 font-bold">4.35% ↑</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FaBox className="text-purple-500 text-2xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">2,450</div>
              <div className="text-sm text-gray-500">총 제품 수</div>
            </div>
          </div>
          <div className="text-green-500 font-bold">2.59% ↑</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUsers className="text-blue-500 text-2xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">3,465</div>
              <div className="text-sm text-gray-500">총 사용자 수</div>
            </div>
          </div>
          <div className="text-red-500 font-bold">0.95% ↓</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl font-bold">$45,385</div>
          <div className="text-sm text-gray-500">이번 주 매출</div>
          <div className="text-green-500 font-bold text-lg">12.5% ↑</div>
          <ApexCharts options={lineData.options} series={lineData.series} type="line" height={300} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-bold">2,340</div>
          <div className="text-sm text-gray-500">이번 주 신제품</div>
          <div className="text-green-500 font-bold">14.6% ↑</div>
          <ApexCharts options={barData1.options} series={barData1.series} type="bar" height={300} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-bold">5,355</div>
          <div className="text-sm text-gray-500">이번 주 방문자</div>
          <div className="text-green-500 font-bold">32.9% ↑</div>
          <ApexCharts options={barData2.options} series={barData2.series} type="bar" height={300} />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <CountryStats countriesData={countriesData}/>
          <div className="col-span-1 space-y-4">
            <PieChart pieData={pieData} pieChartData={pieChartData} />
            <CustomeerList customers={customersData}/>
          </div>
        </div>
      </div>
      <TransactionTable transactions={transactionData} />
    </div>
  );
};

export default Dashboard;
