package br.com.tradewindsbackend.repository;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.tradewindsbackend.model.DadosFinanceiros;

import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class DadosFinanceirosRepository {

    private static final String JSON_URL = "https://raw.githubusercontent.com/emerson-diego/TradeWinds/main/dados_financeiros.json";

    public List<DadosFinanceiros> carregarDados() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Ler os dados como um Map (chave -> registro)
            Map<String, DadosFinanceiros> dadosMap = mapper.readValue(new URL(JSON_URL), new TypeReference<Map<String, DadosFinanceiros>>() {});
            
            // Converter o Map em uma Lista
            return new ArrayList<>(dadosMap.values());
        } catch (IOException e) {
            throw new RuntimeException("Erro ao carregar os dados financeiros", e);
        }
    }
}