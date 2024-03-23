package com.SABSPL.backend.controller;

import com.SABSPL.backend.dto.QuestionDTO;
import com.SABSPL.backend.services.TableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping("/api/table")
@RequiredArgsConstructor
public class TableController {

    private final TableService tableService;

    @GetMapping("/columnInfo/{tableName}")
    public ResponseEntity<?> getTableInfo(@PathVariable String tableName){
        return ResponseEntity.ok(tableService.getColumnInfo(tableName));
    }

    @GetMapping("/rowData/{tableName}")
    public ResponseEntity<?> getTable(@PathVariable String tableName,
                                      @RequestParam("sortBy") Optional<String> sortBy,
                                      @RequestParam Optional<Integer> page,
                                      @RequestParam Optional<Integer> size){
        return ResponseEntity.ok(tableService.getRowData(tableName, size, page, sortBy));
    }
}