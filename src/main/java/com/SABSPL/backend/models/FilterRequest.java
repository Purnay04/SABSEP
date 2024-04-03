package com.SABSPL.backend.models;

import lombok.Data;

import java.util.HashMap;

@Data
public class FilterRequest {
    private HashMap<String,String> filters;
}
