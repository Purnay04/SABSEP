package com.SABSPL.sabsep.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;

@Data
@RequiredArgsConstructor
public class QuestionDTO {
    private String question;
    private ArrayList<String> options;
    private Boolean isMultipleChoice;
}
