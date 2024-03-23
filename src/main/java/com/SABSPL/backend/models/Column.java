package com.SABSPL.backend.models;

import com.SABSPL.backend.constants.GridName;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("column_info")
public class Column {
    private String name;
    private String field;
    private MetaData metaData;
    private GridName gridName;
}

@Data
class MetaData {
    private String width;
    private boolean sortable;
    private boolean resizable;
    private String cellRenderer;
}
