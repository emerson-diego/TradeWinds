TradeWinds
This repository contains a Full Stack application built with a Spring Boot (Java) Back-end and a React (JavaScript) Front-end. Its primary goal is to display financial data for different assets (Bovespa, S&P 500, Gold, Bitcoin, and USDBRL) in a normalized comparative format, filtered by year.

Table of Contents
Project Overview
Technologies Used
Folder Structure
Installation and Execution
Back-end (Spring Boot)
Front-end (React)
Usage
API Endpoints
Customization
Contributing
License
Project Overview
This project focuses on demonstrating the performance of various financial indicators/assets over a selected year. The application:

Back-end: Exposes an endpoint that returns financial data filtered by the specified year. Data is fetched from a JSON file hosted on a public GitHub repository.
Front-end: Consumes the back-end endpoint and displays a comparative chart, normalizing the initial values of each asset to 100%.
Key Features
Year-based filtering: The user selects the desired year in the front-end, and the application retrieves only the relevant data for that period.
Normalization: Each asset’s first value in the selected year is used as a base of 100% to facilitate comparative analysis.
Chart Visualization: Uses react-chartjs-2 to present the data in an interactive line chart.
Technologies Used
Back-end
Java 17+ (recommended)
Spring Boot 2.7+ (or higher)
Maven (dependency management)
Jackson (JSON serialization/deserialization)
Front-end
React 19.0.0 (or higher)
React Scripts 5.0.1
Chart.js and react-chartjs-2 (data visualization)
Axios (HTTP requests)
Tailwind CSS (styling)
Folder Structure
bash
Copiar
TradeWinds/
├── tradewindsbackend/       # Spring Boot back-end source code
│   └── src/main/java
│       └── br/com/tradewindsbackend
│           ├── controller  # REST controllers
│           ├── model       # Data models/entities
│           ├── repository  # Data loading/access classes
│           └── service     # Business logic and filtering
├── tradewindsfrontend/      # React front-end source code
│   ├── src
│   │   ├── App.js
│   │   ├── FinancialChart.js
│   │   └── index.js
│   ├── package.json
│   └── ...
└── dados_financeiros.json   # (Optional) Local JSON data file (also hosted on GitHub)
Installation and Execution
Prerequisites
Java 17+ installed and added to your PATH
Maven installed and added to your PATH
Node.js 16+ and npm installed (or Yarn, if you prefer)
Back-end (Spring Boot)
Navigate to the back-end directory:
bash
Copiar
cd TradeWinds/tradewindsbackend
Compile the project:
bash
Copiar
mvn clean install
Run the application:
bash
Copiar
mvn spring-boot:run
Check if it is working:
The server should start on port 8080 by default.
Test endpoint: http://localhost:8080/dados-financeiros?ano=2023
Front-end (React)
Navigate to the front-end directory:
bash
Copiar
cd TradeWinds/tradewindsfrontend
Install dependencies:
bash
Copiar
npm install
Start the application:
bash
Copiar
npm start
Open your browser:
The React application runs on http://localhost:3000.
Usage
Start the back-end (default port 8080).
Start the front-end (default port 3000).
Access http://localhost:3000.
Select the desired year from the dropdown menu.
The chart will display the normalized percentage variation of each asset for that year.
API Endpoints
GET /dados-financeiros?ano={ano}
Description: Returns a list of objects containing values for each financial asset.
Query Parameter:
ano (integer) – e.g., 2023
Usage Example:
bash
Copiar
curl http://localhost:8080/dados-financeiros?ano=2023
Sample Response (simplified JSON):
json
Copiar
[
  {
    "data": "2023-01-02T00:00:00.000",
    "^BVSP": 105555.55,
    "^GSPC": 3800.00,
    "GC=F": 1825.10,
    "BTC-USD": 17000.50,
    "USDBRL=X": 5.20
  },
  ...
]
Customization
Changing the port: Modify the default server port in application.properties if needed.
Data source: In DadosFinanceirosRepository, you can change the URL to point to another JSON repository or external service.
Styling and Layout: Adjust Tailwind classes in App.js or create new components as needed.
Code Example in Portuguese/BR (Clean Code Principles)
Below is a brief example (in Portuguese) showing how to create a custom header in React. Notice the use of semantic naming and simplified structure:

jsx
Copiar
function CabecalhoPersonalizado() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <h1 className="text-center text-2xl font-bold">Meu Dashboard Financeiro</h1>
    </header>
  );
}

export default CabecalhoPersonalizado;
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork this repository.
Create a new branch:
bash
Copiar
git checkout -b feature/my-changes
Make your changes and commit them:
bash
Copiar
git commit -m "My changes"
Push to your fork:
bash
Copiar
git push origin feature/my-changes
Open a Pull Request describing the proposed changes.
License
This project is available under the MIT License. Feel free to use, modify, and distribute it as you see fit.






