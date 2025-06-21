package com.Backend.MediXBackend.UserService;

import com.Backend.MediXBackend.User.Appointment;
import com.Backend.MediXBackend.User.Patient;
import com.Backend.MediXBackend.UserRepository.AppointmentRepository;
import com.Backend.MediXBackend.UserRepository.PatientRepository;
import com.Backend.MediXBackend.Utils.IdGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private IdGeneratorService idGenService;

    @Transactional
    public Appointment createAppointment(Long patientId, Long doctorId, LocalDateTime appointmentDate) {
        // Create appointment with "NOT_READY" status
        Appointment appointment = new Appointment();
        appointment.setId(idGenService.generateAppointmentId());
        appointment.setPatientId(patientId);
        appointment.setDoctorId(doctorId);
        appointment.setAppointmentDate(appointmentDate);
        appointment.setStatus("NOT_READY"); // Default status

        return appointmentRepo.save(appointment);
    }

    @Transactional
    public Appointment updateAppointmentStatus(Long id, String status) {
        return appointmentRepo.findById(id)
                .map(appointment -> {
                    appointment.setStatus(status);
                    return appointmentRepo.save(appointment);
                })
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepo.findById(id);
    }
}