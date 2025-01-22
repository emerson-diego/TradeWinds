package br.com.tradewindsbackend.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tradewindsbackend.service.FinancialDataService;

import br.com.tradewindsbackend.model.FinancialData;

@RestController
@RequestMapping("/api") // Adiciona um prefixo comum para a API
public class FinancialDataController {

    private final FinancialDataService financialDataService;

    public FinancialDataController(FinancialDataService financialDataService) {
        this.financialDataService = financialDataService;
    }

    @GetMapping("/financial-data")
    public ResponseEntity<List<Map<String, Object>>> getFinancialData() {
        try {
            List<Map<String, Object>> data = financialDataService.getFinancialData();
            return ResponseEntity.ok(data);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Collections.emptyList());
        }
    }
}
