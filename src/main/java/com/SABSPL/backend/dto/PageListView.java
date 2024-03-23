package com.SABSPL.backend.dto;

import com.SABSPL.backend.models.Column;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.List;

@Data
public class PageListView implements Serializable {
    List<Column> columnInfo;
    Page<? extends RowDataView> rowData;
}
