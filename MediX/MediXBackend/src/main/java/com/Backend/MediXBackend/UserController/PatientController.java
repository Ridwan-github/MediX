package com.Backend.MediXBackend.UserController;

import com.Backend.MediXBackend.User.Patient;
import com.Backend.MediXBackend.UserService.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/basic")
    public ResponseEntity<?> createBasicPatient(@RequestBody Map<String, String> request) {
        try {
            String name = request.get("name");
            String phoneNumber = request.get("phoneNumber");

            if (name == null || phoneNumber == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Name and phone number are required"));
            }

            Patient patient = patientService.createBasicPatient(name, phoneNumber);
            return ResponseEntity.ok(patient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create patient", "details", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        try {
            Patient patient = patientService.updatePatientDetails(id, updatedPatient);
            return ResponseEntity.ok(patient);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update patient", "details", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        return patient.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Patient) Map.of("error", "Patient not found", "patientId", id)));
    }

    @GetMapping("/by-phone")
    public ResponseEntity<?> getPatientByPhoneNumber(@RequestParam String phoneNumber) {
        Optional<Patient> patient = patientService.getPatientByPhoneNumber(phoneNumber);
        return patient.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body((Patient) Map.of("error", "Patient not found", "phoneNumber", phoneNumber)));
    }
}