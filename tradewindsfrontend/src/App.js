import React, { useEffect, useState } from "react";

const App = () => {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/financial-data");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dados Financeiros</h1>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>S&P 500</th>
            <th>Ouro</th>
            <th>Bovespa</th>
            <th>Bitcoin</th>
            <th>USD/BRL</th>
            <th>IFIX</th>
            <th>IPCA</th>
            <th>CDI</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.sp500}</td>
              <td>{item.gold}</td>
              <td>{item.bovespa}</td>
              <td>{item.bitcoin}</td>
              <td>{item.usd_brl}</td>
              <td>{item.ifix}</td>
              <td>{item.ipca}</td>
              <td>{item.cdi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
