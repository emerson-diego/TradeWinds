package br.com.tradewindsbackend.service;


import org.springframework.stereotype.Service;

import br.com.tradewindsbackend.model.DadosFinanceiros;
import br.com.tradewindsbackend.repository.DadosFinanceirosRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DadosFinanceirosService {

    private final DadosFinanceirosRepository repository;

    public DadosFinanceirosService(DadosFinanceirosRepository repository) {
        this.repository = repository;
    }

    public List<DadosFinanceiros> obterDadosPorAno(int ano) {
        List<DadosFinanceiros> dados = repository.carregarDados();

        // Usar o formato correto do JSON
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

        return dados.stream()
                .filter(dado -> {
                    LocalDateTime data = LocalDateTime.parse(dado.getData(), formatter);
                    return data.getYear() == ano;
                })
                .collect(Collectors.toList());
    }
}