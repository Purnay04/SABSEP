package com.SABSPL.backend.repository;

import com.SABSPL.backend.constants.GridName;
import com.SABSPL.backend.models.Column;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ColumnRepository extends MongoRepository<Column,String> {
    List<Column> findAllByGridNameOrderByOrder(GridName gridName);
}
