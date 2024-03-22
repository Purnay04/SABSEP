package com.SABSPL.backend.dto.gridviews;

import com.SABSPL.backend.dto.RowDataView;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class CandidateView extends RowDataView implements Serializable {
    private String id;
    private String username;
    private String email;
    private double score;
    private Date startTime;
}
