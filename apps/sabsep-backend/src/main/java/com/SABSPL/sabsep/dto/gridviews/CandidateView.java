package com.SABSPL.sabsep.dto.gridviews;

import com.SABSPL.sabsep.dto.RowDataView;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class CandidateView extends RowDataView implements Serializable {
    private String username;
    private String email;
    private double score;
    private Date startTime;
}
