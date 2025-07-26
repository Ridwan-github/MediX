package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
}