import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancialChart = ({ year = 2023 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!year) {
        console.error("Year is undefined. Please pass a valid year.");
        return;
      }

      setLoading(true); // Garantir que o estado de carregamento seja atualizado

      try {
        const response = await axios.get(`http://localhost:8080/dados-financeiros?ano=${year}`);
        console.log("Dados recebidos:", response.data); // Log para depuração
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  // Filtrar dados válidos
  const validData = data.filter(
    (item) =>
      item["^GSPC"] !== null &&
      item["^BVSP"] !== null &&
      item["GC=F"] !== null &&
      item["BTC-USD"] !== null &&
      item["USDBRL=X"] !== null
  );

  if (validData.length === 0) {
    return <p className="text-center text-gray-600">No valid data available for the selected year.</p>;
  }

  // Extrair datas e valores
  const labels = validData.map((item) => item.data.split("T")[0]);
  const bovespa = validData.map((item) => item["^BVSP"]);
  const sp500 = validData.map((item) => item["^GSPC"]);
  const gold = validData.map((item) => item["GC=F"]);
  const bitcoin = validData.map((item) => item["BTC-USD"]);
  const usdbrl = validData.map((item) => item["USDBRL=X"]);

  // Verificar valores iniciais para evitar divisão por zero
  const initialBovespa = bovespa[0];
  const initialSp500 = sp500[0];
  const initialGold = gold[0];
  const initialBitcoin = bitcoin[0];
  const initialUsdbrl = usdbrl[0];

  if (initialBovespa === 0 || initialSp500 === 0 || initialGold === 0 || initialBitcoin === 0 || initialUsdbrl === 0) {
    return <p className="text-center text-gray-600">Invalid initial data for normalization.</p>;
  }

  // Normalizar valores
  const normalizedBovespa = bovespa.map((value) => (value / initialBovespa) * 100);
  const normalizedSp500 = sp500.map((value) => (value / initialSp500) * 100);
  const normalizedGold = gold.map((value) => (value / initialGold) * 100);
  const normalizedBitcoin = bitcoin.map((value) => (value / initialBitcoin) * 100);
  const normalizedUsdbrl = usdbrl.map((value) => (value / initialUsdbrl) * 100);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Bovespa (Normalized)",
        data: normalizedBovespa,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "S&P 500 (Normalized)",
        data: normalizedSp500,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Gold (Normalized)",
        data: normalizedGold,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
      },
      {
        label: "Bitcoin (Normalized)",
        data: normalizedBitcoin,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "USDBRL (Normalized)",
        data: normalizedUsdbrl,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Variation (%)",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Financial Market Evolution Chart ({year})
      </h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default FinancialChart;