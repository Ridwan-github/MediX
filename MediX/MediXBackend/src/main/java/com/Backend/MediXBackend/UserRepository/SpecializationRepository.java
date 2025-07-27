// SpecializationRepository.java
package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecializationRepository extends JpaRepository<Specialization, Integer> {
}