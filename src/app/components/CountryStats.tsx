import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CountryStatsProps } from '../dashboard/types';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const CountryStats: React.FC<CountryStatsProps> = ({ countriesData }) => {
  return (
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
  );
};

export default CountryStats;
