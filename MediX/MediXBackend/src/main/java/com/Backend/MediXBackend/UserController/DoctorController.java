package com.Backend.MediXBackend.UserController;

import com.Backend.MediXBackend.User.Doctor;
import com.Backend.MediXBackend.User.User;
import com.Backend.MediXBackend.UserService.DoctorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public ResponseEntity<?> createDoctorWithUser(@RequestBody Map<String, Object> request) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            User user = mapper.convertValue(request.get("user"), User.class);
            Doctor doctor = mapper.convertValue(request.get("doctor"), Doctor.class);
            Set<Integer> qualificationIds = mapper.convertValue(request.get("qualificationIds"), Set.class);
            Set<Integer> specializationIds = mapper.convertValue(request.get("specializationIds"), Set.class);

            Doctor savedDoctor = doctorService.createDoctorWithUser(user, doctor, qualificationIds, specializationIds);

            return ResponseEntity.ok(savedDoctor);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create doctor", "details", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        Optional<Doctor> doctorOpt = doctorService.getDoctorById(id);
        return doctorOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Doctor) Map.of("error", "Doctor not found", "doctorId", id)));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getDoctorByEmail(@PathVariable String email) {
        Optional<Doctor> doctorOpt = doctorService.getDoctorByEmail(email);
        return doctorOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Doctor) Map.of("error", "Doctor not found", "email", email)));
    }

    @PostMapping("/{doctorId}/qualifications")
    public ResponseEntity<?> addQualifications(@PathVariable Long doctorId, @RequestBody Set<Integer> qualificationIds) {
        try {
            Doctor doctor = doctorService.addQualifications(doctorId, qualificationIds);
            return ResponseEntity.ok(doctor);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to add qualifications", "details", e.getMessage()));
        }
    }

    @PostMapping("/{doctorId}/specializations")
    public ResponseEntity<?> addSpecializations(@PathVariable Long doctorId, @RequestBody Set<Integer> specializationIds) {
        try {
            Doctor doctor = doctorService.addSpecializations(doctorId, specializationIds);
            return ResponseEntity.ok(doctor);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to add specializations", "details", e.getMessage()));
        }
    }
}