"use client"
import { useEffect, useState } from "react";
export default function StockAnalyzer() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {

		const url = 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/screener?region=IN';
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": '347c7a00f5mshac0533654a7ba94p17e737jsn7fbad60924ae',
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
		console.log(data)
        setStocks(data.body || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Pre-Market Stock Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {stocks.map((stock, index) => (
			console.log(stock),
          <li key={index} className="border p-2 my-2">
            <strong>{stock.displayName}</strong>: {stock.preMarketChange} ({stock.currency})
          </li>
        ))}
      </ul>
    </div>
  );
}
