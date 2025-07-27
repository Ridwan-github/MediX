// DoctorQualificationRepository.java
package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.DoctorQualification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorQualificationRepository extends JpaRepository<DoctorQualification, Long> {
}