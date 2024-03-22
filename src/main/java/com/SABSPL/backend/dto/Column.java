package com.SABSPL.backend.dto;

import lombok.Data;

@Data
public class Column {
    private String name;
    private String field;
    private MetaData metaData;
}

@Data
class MetaData {
    private String width;
    private boolean sortable;
    private boolean resizable;
}
