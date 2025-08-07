package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPhoneNumber(String phoneNumber);

    @Query("SELECT MAX(p.id) FROM Patient p")
    Optional<Long> findMaxPatientId();
}