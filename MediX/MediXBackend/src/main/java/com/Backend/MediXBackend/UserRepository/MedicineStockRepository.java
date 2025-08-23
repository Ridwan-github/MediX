package com.Backend.MediXBackend.UserRepository;


import com.Backend.MediXBackend.User.MedicineStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineStockRepository extends JpaRepository<MedicineStock, Long> {
    List<MedicineStock> findByMedicine_MedicineId(Long medicineId);
    List<MedicineStock> findByBatchNumber(String batchNumber);
    List<MedicineStock> findByExpiryDateBefore(LocalDate date);
    List<MedicineStock> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT SUM(s.quantity) FROM MedicineStock s WHERE s.medicine.medicineId = :medicineId")
    Optional<Integer> getTotalStockByMedicineId(@Param("medicineId") Long medicineId);

    @Modifying
    @Query("UPDATE MedicineStock s SET s.quantity = s.quantity + :quantity WHERE s.stockId = :stockId")
    void updateStockQuantity(@Param("stockId") Long stockId, @Param("quantity") Integer quantity);
}