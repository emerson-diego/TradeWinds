import React, { useState } from "react";
import FinancialChart from "./FinancialChart";

const App = () => {
  const [ano, setAno] = useState(2023); // Ano padrão ajustado

  const handleChangeAno = (e) => {
    setAno(parseInt(e.target.value, 10));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Financial Dashboard</h1>
      <label>
        Select Year:{" "}
        <select value={ano} onChange={handleChangeAno}>
          {Array.from({ length: 26 }, (_, i) => 2000 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <FinancialChart year={ano} />
    </div>
  );
};

export default App;
