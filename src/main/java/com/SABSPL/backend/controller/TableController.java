package com.SABSPL.backend.controller;

import com.SABSPL.backend.dto.QuestionDTO;
import com.SABSPL.backend.models.FilterRequest;
import com.SABSPL.backend.services.TableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/admin/table")
@RequiredArgsConstructor
public class TableController {

    private final TableService tableService;

    @GetMapping("/columnInfo/{tableName}")
    public ResponseEntity<?> getTableInfo(@PathVariable String tableName){
        return ResponseEntity.ok(tableService.getColumnInfo(tableName));
    }

    @PostMapping("/rowData/{tableName}")
    public ResponseEntity<?> getTable(@PathVariable String tableName,
                                      @RequestParam(name="page",defaultValue = "0") int page,
                                      @RequestParam(name="size",defaultValue = "10") int size,
                                      @RequestParam(name="sortBy",defaultValue = "id") String sortBy,
                                      @RequestBody FilterRequest filterRequest){
        return ResponseEntity.ok(tableService.getRowData(tableName,page,size,sortBy,filterRequest));
    }
}
