package br.com.tradewindsbackend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.tradewindsbackend.model.DadosFinanceiros;
import br.com.tradewindsbackend.service.DadosFinanceirosService;

import java.util.List;

@RestController
public class DadosFinanceirosController {

    private final DadosFinanceirosService service;

    public DadosFinanceirosController(DadosFinanceirosService service) {
        this.service = service;
    }

    @GetMapping("/dados-financeiros")
    public List<DadosFinanceiros> obterDadosPorAno(@RequestParam("ano") int ano) {
        return service.obterDadosPorAno(ano);
    }
}