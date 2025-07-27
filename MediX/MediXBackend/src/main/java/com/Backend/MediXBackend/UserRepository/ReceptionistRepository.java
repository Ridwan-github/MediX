package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReceptionistRepository extends JpaRepository<User, Long> {
    @Query("SELECT MAX(u.id) FROM User u WHERE u.id BETWEEN 2502001 AND 2502999")
    Optional<Long> findMaxReceptionistId();
}