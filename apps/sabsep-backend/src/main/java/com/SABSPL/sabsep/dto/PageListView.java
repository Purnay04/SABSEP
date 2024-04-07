package com.SABSPL.sabsep.dto;

import com.SABSPL.sabsep.models.Column;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.List;

@Data
public class PageListView implements Serializable {
    List<Column> columnInfo;
    Page<? extends RowDataView> rowData;
}
