package br.com.tradewindsbackend.model;

import lombok.Data;

@Data
public class FinancialData {

    private String date;
    private double sp500;
    private double gold;
    private double bovespa;
    private double bitcoin;
    private double usdBrl;
    private double ifix;
    private double ipca;
    private double cdi;

}