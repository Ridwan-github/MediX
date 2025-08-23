package com.Backend.MediXBackend.User;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Medicines")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    private Long medicineId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "generic_name")
    private String genericName;

    @Column(name = "supplier_Name")
    private String supplierName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MedicineStock> stocks = new ArrayList<>(); // Removed .reversed()

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Medicine() {}

    public Medicine(String name, String genericName, String supplierName) {
        this.name = name;
        this.genericName = genericName;
        this.supplierName = supplierName;
    }

    // Getters and Setters
    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGenericName() { return genericName; }
    public void setGenericName(String genericName) { this.genericName = genericName; }

    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<MedicineStock> getStocks() { return stocks; }
    public void setStocks(List<MedicineStock> stocks) { this.stocks = stocks; }

    // If you need to get stocks in reverse order, add this method
    public List<MedicineStock> getStocksReversed() {
        List<MedicineStock> reversed = new ArrayList<>(stocks);
        java.util.Collections.reverse(reversed);
        return reversed;
    }
}