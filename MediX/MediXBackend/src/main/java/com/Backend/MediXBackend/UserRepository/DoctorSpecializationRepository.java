// DoctorSpecializationRepository.java
package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.DoctorSpecialization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorSpecializationRepository extends JpaRepository<DoctorSpecialization, Long> {
}