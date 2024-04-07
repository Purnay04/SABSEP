package com.SABSPL.sabsep.repository;

import com.SABSPL.sabsep.constants.GridName;
import com.SABSPL.sabsep.models.Column;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ColumnRepository extends MongoRepository<Column,String> {
    List<Column> findAllByGridNameOrderByOrder(GridName gridName);
}
