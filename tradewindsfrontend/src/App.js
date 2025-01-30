import React, { useState } from "react";
import FinancialChart from "./FinancialChart";

const App = () => {
  const [ano, setAno] = useState(2023); // Ano padrão ajustado

  const handleChangeAno = (e) => {
    setAno(parseInt(e.target.value, 10));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Financial Dashboard
        </h1>

        <div className="bg-white p-4 rounded-lg shadow-lg mb-8 w-64 mx-auto"> {/* Reduzi o padding e o tamanho do container */}
          <label className="block text-sm font-medium text-gray-700 mb-1"> {/* Reduzi o tamanho da fonte e o espaçamento */}
            Select Year:
          </label>
          <select
            value={ano}
            onChange={handleChangeAno}
            className="block w-full p-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" // Reduzi o padding e o tamanho da fonte
          >
            {Array.from({ length: 26 }, (_, i) => 2000 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FinancialChart year={ano} />
        </div>
      </div>
    </div>
  );
};

export default App;