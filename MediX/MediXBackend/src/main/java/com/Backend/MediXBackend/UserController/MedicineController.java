package com.Backend.MediXBackend.UserController;


import com.Backend.MediXBackend.User.Medicine;
import com.Backend.MediXBackend.UserService.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Optional<Medicine> medicine = medicineService.getMedicineById(id);
        return medicine.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Medicine createMedicine(@RequestBody Medicine medicine) {
        return medicineService.createMedicine(medicine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicineDetails) {
        Medicine updatedMedicine = medicineService.updateMedicine(id, medicineDetails);
        if (updatedMedicine != null) {
            return ResponseEntity.ok(updatedMedicine);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id) {
        boolean deleted = medicineService.deleteMedicine(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<Medicine> searchMedicines(@RequestParam String term) {
        return medicineService.searchMedicines(term);
    }

    @GetMapping("/supplier/{supplierName}")
    public List<Medicine> getMedicinesBySupplier(@PathVariable String supplierName) {
        return medicineService.getMedicinesBySupplier(supplierName);
    }
}