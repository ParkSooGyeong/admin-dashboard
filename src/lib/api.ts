// const API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;
// const BASE_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY';

interface StockData {
  'Meta Data': Record<string, string>;
  'Time Series (Daily)': Record<string, Record<string, string>>;
}

export async function fetchStockData(symbol: string): Promise<StockData> {
  const url =
    symbol === 'IBM'
      ? `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
      : `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
      // : `${BASE_URL}&symbol=${symbol}&apikey=${API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }
  const data: StockData = await response.json();
  return data;
}

export async function transformStockDataToChart(stockData: StockData) {
  const timeSeries = stockData['Time Series (Daily)'];
  const dates = Object.keys(timeSeries).reverse();
  const prices = dates.map((date) => parseFloat(timeSeries[date]['4. close']));

  return { dates, prices };
}
