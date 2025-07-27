// QualificationRepository.java
package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
}