package com.Backend.MediXBackend.UserService;

import com.Backend.MediXBackend.User.Medicine;
import com.Backend.MediXBackend.UserRepository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    public Medicine createMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine medicineDetails) {
        Optional<Medicine> optionalMedicine = medicineRepository.findById(id);
        if (optionalMedicine.isPresent()) {
            Medicine medicine = optionalMedicine.get();
            medicine.setName(medicineDetails.getName());
            medicine.setGenericName(medicineDetails.getGenericName());
            medicine.setSupplierName(medicineDetails.getSupplierName());
            return medicineRepository.save(medicine);
        }
        return null;
    }

    public boolean deleteMedicine(Long id) {
        if (medicineRepository.existsById(id)) {
            medicineRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Medicine> searchMedicines(String searchTerm) {
        return medicineRepository.searchMedicines(searchTerm);
    }

    public List<Medicine> getMedicinesBySupplier(String supplierName) {
        return medicineRepository.findBySupplierNameContainingIgnoreCase(supplierName);
    }
}