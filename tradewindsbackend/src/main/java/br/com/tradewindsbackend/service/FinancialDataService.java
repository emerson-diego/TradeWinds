package br.com.tradewindsbackend.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Service
public class FinancialDataService {

    private List<Map<String, Object>> financialData;

    @PostConstruct
    private void init() {
        try {
            // Ler o arquivo JSON da pasta resources
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/financial_data_simulation.json");
            if (inputStream == null) {
                throw new FileNotFoundException("Arquivo financial_data_simulation.json não encontrado em /resources.");
            }
            financialData = objectMapper.readValue(inputStream, new TypeReference<List<Map<String, Object>>>() {});
        } catch (IOException e) {
            throw new IllegalStateException("Erro ao carregar os dados financeiros do arquivo JSON.", e);
        }
    }

    public List<Map<String, Object>> getFinancialData() throws IOException {
        if (financialData == null) {
            throw new IllegalStateException("Os dados financeiros não foram carregados corretamente.");
        }
        return financialData;
    }
}

