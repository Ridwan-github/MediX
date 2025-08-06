package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.PrescriptionMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionMedicineRepository extends JpaRepository<PrescriptionMedicine, Long> {
    
    // Find medicines by prescription ID
    List<PrescriptionMedicine> findByPrescriptionId(Long prescriptionId);
    
    // Delete medicines by prescription ID
    void deleteByPrescriptionId(Long prescriptionId);
}
