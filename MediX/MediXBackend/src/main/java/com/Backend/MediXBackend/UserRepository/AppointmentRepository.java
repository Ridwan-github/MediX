package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT MAX(a.id) FROM Appointment a")
    Optional<Long> findMaxAppointmentId();
    
    List<Appointment> findByPatientId(Long patientId);
}