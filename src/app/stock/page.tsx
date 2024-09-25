"use client";

import React, { useEffect, useState } from 'react';
import StockCard from '../components/StockCard';
import TrendingStocks from '../components/TrendingStocks';
import LatestTransactions from '../components/LatestTransactions';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // react-icons 사용
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function StockPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    containScroll: 'trim',
    align: 'start',
  });

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const stockList = [
    { symbol: 'AAPL', logo: '/images/apple-logo.svg', company: 'Apple' },
    { symbol: 'META', logo: '/images/meta-logo.svg', company: 'Meta' },
    { symbol: 'GOOGL', logo: '/images/google-logo.svg', company: 'Google' },
    { symbol: 'TSLA', logo: '/images/tesla-logo.svg', company: 'Tesla' },
    { symbol: 'MSFT', logo: '/images/microsoft-logo.svg', company: 'Microsoft' },
    { symbol: 'IBM', logo: '/images/ibm-logo.svg', company: 'IBM' },
  ];

  useEffect(() => {
    if (!emblaApi) return;

    const checkButtons = () => {
      setPrevEnabled(emblaApi.canScrollPrev());
      setNextEnabled(emblaApi.canScrollNext());
    };

    // 초기 상태 설정
    checkButtons();

    // Embla API 이벤트 리스너 추가
    emblaApi.on('select', checkButtons);
    emblaApi.on('reInit', checkButtons);

    return () => {
      emblaApi.off('select', checkButtons);
      emblaApi.off('reInit', checkButtons);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        {/* 슬라이드 영역 */}
        <div className="embla" ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div className="embla__container flex" style={{ width: '100%' }}>
            {stockList.map((stock, index) => (
              <div className="embla__slide" style={{ flex: '0 0 25%' }} key={index}>
                <StockCard symbol={stock.symbol} logo={stock.logo} company={stock.company} />
              </div>
            ))}
          </div>
        </div>

        {/* 왼쪽 화살표 (첫 번째 카드가 보이면 숨기기) */}
        {prevEnabled && (
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md"
          >
            <FiChevronLeft size={24} /> {/* 왼쪽 화살표 아이콘 */}
          </button>
        )}

        {/* 오른쪽 화살표 (마지막 카드가 보이면 숨기기) */}
        {nextEnabled && (
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md"
          >
            <FiChevronRight size={24} /> {/* 오른쪽 화살표 아이콘 */}
          </button>
        )}
      </div>

      <div className="flex flex-row pt-6 gap-6">
        <TrendingStocks />
        <LatestTransactions />
      </div>
    </div>
  );
}
