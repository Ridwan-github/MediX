package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}