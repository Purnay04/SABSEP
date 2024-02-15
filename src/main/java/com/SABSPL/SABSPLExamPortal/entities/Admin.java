package com.SABSPL.SABSPLExamPortal.entities;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Entity
@Table(name = "admin", schema = "sabsep")
public class Admin extends User {
    @Id
    @TableGenerator(
            name = "SEQ",
            table = "seq",
            pkColumnName = "seq_name",
            valueColumnName = "seq_value",
            pkColumnValue = "admin_pk",
            allocationSize = 4
    )
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "SEQ")
    @Column(name = "id")
    private Integer userId;
}
