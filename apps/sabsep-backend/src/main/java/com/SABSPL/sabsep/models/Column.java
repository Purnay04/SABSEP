package com.SABSPL.sabsep.models;

import com.SABSPL.sabsep.constants.GridName;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("column_info")
public class Column {
    private String name;
    private String field;
    private MetaData metaData;
    private GridName gridName;
    private int order;
}

@Data
class MetaData {
    private String width;
    private boolean sortable;
    private boolean resizable;
    private String sortBy;
    private String cellRenderer;
    private String filter;
}
