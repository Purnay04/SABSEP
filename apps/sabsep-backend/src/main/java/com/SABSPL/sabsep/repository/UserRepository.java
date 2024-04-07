package com.SABSPL.sabsep.repository;

import com.SABSPL.sabsep.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findByEmail(String email);
    List<User> findAllByRole(String role);
}
