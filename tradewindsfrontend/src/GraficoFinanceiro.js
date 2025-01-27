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

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoFinanceiro = ({ ano }) => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const resposta = await axios.get(`http://localhost:8080/dados-financeiros?ano=${ano}`);
        setDados(resposta.data);
        setCarregando(false);
      } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
        setCarregando(false);
      }
    };

    fetchDados();
  }, [ano]);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  // Filtrar e preparar os dados para o gráfico usando os nomes corretos das propriedades
  const dadosValidos = dados.filter(
    (dado) => dado["^GSPC"] !== null || dado["^BVSP"] !== null || dado.IPCA !== null
  );

  const labels = dadosValidos.map((dado) => dado.data.split("T")[0]); // Extrair apenas a data (YYYY-MM-DD)
  const sp500 = dadosValidos.map((dado) => dado["^GSPC"] || 0);
  const bovespa = dadosValidos.map((dado) => dado["^BVSP"] || 0);
  const ipca = dadosValidos.map((dado) => dado.IPCA || 0); // Correção aqui

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "S&P 500",
        data: sp500,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Bovespa",
        data: bovespa,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "IPCA",
        data: ipca,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
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
          text: "Data",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valores",
        },
      },
    },
  };

  return (
    <div>
      <h2>Gráfico de Dados Financeiros ({ano})</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraficoFinanceiro;
