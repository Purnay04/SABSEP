package com.SABSPL.backend.dto;

import com.SABSPL.backend.models.Column;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PageListView implements Serializable {
    List<Column> columnInfo;
    List<? extends RowDataView> rowData;
}
