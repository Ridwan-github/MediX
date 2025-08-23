package com.Backend.MediXBackend.UserRepository;

import com.Backend.MediXBackend.User.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Optional<Medicine> findByName(String name);
    List<Medicine> findByGenericNameContainingIgnoreCase(String genericName);
    List<Medicine> findBySupplierNameContainingIgnoreCase(String supplierName);

    @Query("SELECT m FROM Medicine m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(m.genericName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Medicine> searchMedicines(@Param("searchTerm") String searchTerm);
}