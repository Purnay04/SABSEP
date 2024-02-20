package com.SABSPL.SABSPLExamPortal.repo;

import com.SABSPL.SABSPLExamPortal.model.UserValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserValue, Integer> {
    Optional<UserValue> findByUserName(String userName);
    Optional<UserValue> findByEmail(String email);

}
