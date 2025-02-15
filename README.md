# TradeWinds

Este repositório contém uma aplicação Full Stack construída com um Back-end em Spring Boot (Java) e um Front-end em React (JavaScript). O objetivo principal é exibir dados financeiros de diferentes ativos (Bovespa, S&P 500, Ouro, Bitcoin e USDBRL) em um formato comparativo normalizado e filtrado por ano.

## Sumário

1.  [Visão Geral do Projeto](#visão-geral-do-projeto)
2.  [Tecnologias Utilizadas](#tecnologias-utilizadas)
3.  [Estrutura de Pastas](#estrutura-de-pastas)
4.  [Instalação e Execução](#instalação-e-execução)
    *   [Back-end (Spring Boot)](#back-end-spring-boot)
    *   [Front-end (React)](#front-end-react)
5.  [Utilização](#utilização)
6.  [Endpoints da API](#endpoints-da-api)
7.  [Customização](#customização)
8.  [Contribuição](#contribuição)
9.  [Licença](#licença)

## Visão Geral do Projeto

Este projeto demonstra o desempenho de vários indicadores/ativos financeiros ao longo de um ano selecionado. A aplicação:

*   **Back-end:** Expõe um endpoint que retorna dados financeiros filtrados pelo ano especificado. Os dados são obtidos de um arquivo JSON hospedado em um repositório público no GitHub.
*   **Front-end:** Consome o endpoint do back-end e exibe um gráfico comparativo, normalizando os valores iniciais de cada ativo para 100%.

### Funcionalidades Principais

*   **Filtro por Ano:** O usuário seleciona o ano desejado no front-end, e a aplicação recupera apenas os dados relevantes para esse período.
*   **Normalização:** O primeiro valor de cada ativo no ano selecionado é usado como base de 100% para facilitar a análise comparativa.
*   **Visualização em Gráfico:** Utiliza react-chartjs-2 para apresentar os dados em um gráfico de linha interativo.

## Tecnologias Utilizadas

### Back-end

*   Java 17+ (recomendado)
*   Spring Boot 2.7+ (ou superior)
*   Maven (gerenciamento de dependências)
*   Jackson (serialização/deserialização JSON)

### Front-end

*   React 19.0.0 (ou superior)
*   React Scripts 5.0.1
*   Chart.js e react-chartjs-2 (visualização de dados)
*   Axios (requisições HTTP)
*   Tailwind CSS (estilização)

## Estrutura de Pastas
```
TradeWinds/
├── tradewindsbackend/ # Código fonte do back-end Spring Boot
│ └── src/main/java
│ └── br/com/tradewindsbackend
│ ├── controller # Controladores REST
│ ├── model # Modelos/entidades de dados
│ ├── repository # Classes de carregamento/acesso a dados
│ └── service # Lógica de negócios e filtragem
├── tradewindsfrontend/ # Código fonte do front-end React
│ ├── src
│ │ ├── App.js
│ │ ├── FinancialChart.js
│ │ └── index.js
│ ├── package.json
│ └── ...
└── dados_financeiros.json # (Opcional) Arquivo de dados JSON local (também hospedado no GitHub)
```

## Instalação e Execução

### Pré-requisitos

*   Java 17+ instalado e adicionado ao seu PATH
*   Maven instalado e adicionado ao seu PATH
*   Node.js 16+ e npm instalado (ou Yarn, se preferir)

### Back-end (Spring Boot)

1.  Navegue até o diretório do back-end:

    ```bash
    cd TradeWinds/tradewindsbackend
    ```

2.  Compile o projeto:

    ```bash
    mvn clean install
    ```

3.  Execute a aplicação:

    ```bash
    mvn spring-boot:run
    ```

    O servidor deve iniciar na porta 8080 por padrão.

4.  Teste o endpoint: [http://localhost:8080/dados-financeiros?ano=2023](http://localhost:8080/dados-financeiros?ano=2023)

### Front-end (React)

1.  Navegue até o diretório do front-end:

    ```bash
    cd TradeWinds/tradewindsfrontend
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Inicie a aplicação:

    ```bash
    npm start
    ```

    A aplicação React será executada em [http://localhost:3000](http://localhost:3000).

## Utilização

1.  Inicie o back-end (porta padrão 8080).
2.  Inicie o front-end (porta padrão 3000).
3.  Acesse [http://localhost:3000](http://localhost:3000).
4.  Selecione o ano desejado no menu dropdown.
5.  O gráfico exibirá a variação percentual normalizada de cada ativo para aquele ano.

## Endpoints da API

*   **GET /dados-financeiros?ano={ano}**

    *   **Descrição:** Retorna uma lista de objetos contendo valores para cada ativo financeiro.
    *   **Parâmetro de Query:**
        *   `ano` (inteiro) – Ex: 2023
    *   **Exemplo de Uso:**

        ```bash
        curl http://localhost:8080/dados-financeiros?ano=2023
        ```

    *   **Exemplo de Resposta (JSON Simplificado):**

        ```json
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
        ```

## Customização

*   **Porta:** Modifique a porta padrão do servidor no arquivo `application.properties`, se necessário.
*   **Fonte de Dados:** No `DadosFinanceirosRepository`, você pode alterar a URL para apontar para outro repositório JSON ou serviço externo.
*   **Estilização e Layout:** Ajuste as classes Tailwind em `App.js` ou crie novos componentes conforme necessário.

