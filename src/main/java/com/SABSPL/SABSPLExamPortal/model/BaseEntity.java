package com.SABSPL.SABSPLExamPortal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@MappedSuperclass
@Getter
@Setter
public class BaseEntity {

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_on")
    private Date createdOn;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_on")
    private Date modifiedOn;

    @PrePersist
    protected void onCreate() {
        createdOn = new Date();
        modifiedOn = createdOn;
    }

    @PreUpdate
    protected void onUpdate() {
        modifiedOn = new Date();
    }
}
