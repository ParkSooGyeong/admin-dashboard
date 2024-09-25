"use client";

// import { useState } from "react";
import ApexCharts from "react-apexcharts";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaEye, FaDollarSign, FaBox, FaUsers } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";

const Dashboard = () => {
  // const [geoData, setGeoData] = useState(null); 
 
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  const countriesData = [
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
  const pieData = {
    options: {
      labels: ["유기적 검색", "추천", "직접", "소셜", "기타", "이메일"],
      colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0", "#546E7A", "#26a69a"],
    },
    series: [30, 24, 18, 12, 9, 7],
  };

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
          {/* 지도 차트 - 화면의 2/3 차지 */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">국가별 세션</h3>
            <MapContainer
              center={[20, 0]} // 초기 위치를 세계 중심으로 설정
              zoom={2}
              scrollWheelZoom={false}
              style={{ height: "500px", width: "100%" }} 
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* 각 나라에 마커 표시 */}
              <Marker position={[37.7749, -122.4194]}>
                <Popup>미국: 35%</Popup>
              </Marker>
              <Marker position={[45.4215, -75.6972]}>
                <Popup>캐나다: 26%</Popup>
              </Marker>
              <Marker position={[48.8566, 2.3522]}>
                <Popup>프랑스: 18%</Popup>
              </Marker>
              <Marker position={[41.9028, 12.4964]}>
                <Popup>이탈리아: 14%</Popup>
              </Marker>
              <Marker position={[-25.2744, 133.7751]}>
                <Popup>호주: 10%</Popup>
              </Marker>
              <Marker position={[20.5937, 78.9629]}>
                <Popup>인도: 7%</Popup>
              </Marker>
              <Marker position={[37.5665, 126.9780]}>
                <Popup>대한민국: 87%</Popup>
              </Marker>
            </MapContainer>

            <ul className="mt-4">
              {countriesData.map((country) => (
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
          </div>

          <div className="col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">유입 경로 개요</h3>
              <ApexCharts options={pieData.options} series={pieData.series} type="pie" height={400} />
              <table className="w-full text-left mt-4">
                <thead>
                  <tr>
                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg whitespace-nowrap rounded-l border-x-0 bg-gray-50 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">유입 경로</th>
                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg whitespace-nowrap rounded-l border-x-0 bg-gray-50 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">사용자</th>
                    <th className="group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg whitespace-nowrap rounded-l border-x-0 bg-gray-50 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">유입율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group/row text-gray-500 dark:text-gray-400">
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">유기적 검색</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">5,649</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span>30%</span>
                        <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="group/row text-gray-500 dark:text-gray-400">
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">추천</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">4,025</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span>24%</span>
                        <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="group/row text-gray-500 dark:text-gray-400">
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">직접</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">3,105</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span>18%</span>
                        <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="group/row text-gray-500 dark:text-gray-400">
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">소셜</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">1,251</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span>12%</span>
                        <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="group/row text-gray-500 dark:text-gray-400">
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">기타</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">734</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span>9%</span>
                        <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '9%' }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="group/row text-gray-500 dark:text-gray-400">
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">이메일</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">456</td>
                    <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span>7%</span>
                        <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '7%' }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 최신 고객 목록 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">최신 고객</h3>
                <a href="#" className="text-blue-500">
                  모두 보기
                </a>
              </div>
              <ul>
                <li className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>세</Avatar>
                    <div className="ml-3">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">세종대왕</p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">sejong@korea.com</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
                </li>
                <li className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Avatar sx={{ bgcolor: "#6a1b9a" }}>이</Avatar>
                    <div className="ml-3">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">이순신</p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">soonshin@naval.com</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$3467</div>
                </li>
                <li className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Avatar sx={{ bgcolor: "#ff5722" }}>안</Avatar>
                    <div className="ml-3">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">안중근</p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">joonggeun@hero.com</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$67</div>
                </li>
                <li className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Avatar sx={{ bgcolor: "#00bcd4" }}>김</Avatar>
                    <div className="ml-3">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">김구</p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">kimkoo@freedom.com</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$2367</div>
                </li>
                <li className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Avatar sx={{ bgcolor: "#009688" }}>유</Avatar>
                    <div className="ml-3">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">유관순</p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">gwansoon@independence.com</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$367</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className={`text-xl font-bold mb-4`}>거래 내역</h3>
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
            <tr className="group/row odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">#00910 환불</td>
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">2021년 4월 23일</td>
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">-$670</td>
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg flex whitespace-nowrap p-4">
                <div className="px-2 py-1 text-green-800 bg-green-100 rounded-full inline-block">완료됨</div>
              </td>
            </tr>
            <tr className="border-b border-gray-200"> {/* 보더바텀 추가 */}
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">#087651 결제 실패</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">2021년 4월 18일</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">$234</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg flex whitespace-nowrap p-4">
              <div className="px-2 py-1 text-red-700 bg-purple-100 rounded-full inline-block">취소됨</div>
              </td>
            </tr>
            <tr className="border-b border-gray-200"> {/* 보더바텀 추가 */}
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">유관순 결제</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">2021년 4월 15일</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">$5,000</td>
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg flex whitespace-nowrap p-4">
                <div className="px-2 py-1 text-purple-700 bg-purple-100 rounded-full inline-block">진행 중</div> {/* 보라색 상태 */}
              </td>
            </tr>
            <tr className="border-b border-gray-200"> {/* 보더바텀 추가 */}
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">김구 결제</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">2021년 4월 15일</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">$2,300</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg flex whitespace-nowrap p-4">
              <div className="px-2 py-1 text-green-800 bg-green-100 rounded-full inline-block">완료됨</div>
            </td>
            </tr>
            <tr className="border-b border-gray-200"> {/* 보더바텀 추가 */}
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">THEMESBERG LLC 결제</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">2021년 4월 11일</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">$560</td>
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg flex whitespace-nowrap p-4">
              <div className="px-2 py-1 text-green-800 bg-green-100 rounded-full inline-block">완료됨</div>
            </td>
            </tr>
            <tr className="border-b border-gray-200"> {/* 보더바텀 추가 */}
            <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">유관순 결제</td>
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">2021년 4월 6일</td>
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">$1,437</td>
              <td className="group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg flex whitespace-nowrap p-4">
                <div className="px-2 py-1 text-green-800 bg-green-100 rounded-full inline-block">완료됨</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
