package br.com.tradewindsbackend.model;




import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;


@Data
public class DadosFinanceiros {

    private String data;

    @JsonProperty("BTC-USD")
    private Double btcUsd;

    @JsonProperty("GC=F")
    private Double gold;

    @JsonProperty("USDBRL=X")
    private Double usdBrl;

    @JsonProperty("^BVSP")
    private Double bovespa;

    @JsonProperty("^GSPC")
    private Double sp500;

    @JsonProperty("IPCA")
    private Double ipca;

    @JsonProperty("CDI")
    private Double cdi;

    // Getters e Setters
}