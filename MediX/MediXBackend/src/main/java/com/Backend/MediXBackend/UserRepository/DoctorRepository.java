package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("SELECT MAX(d.doctorId) FROM Doctor d")
    Optional<Long> findMaxDoctorId();
}