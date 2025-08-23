package com.Backend.MediXBackend.User;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Medicines_Stock")
public class MedicineStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id")
    private Long stockId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @Column(name = "batch_number")
    private String batchNumber;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    @Column(name = "purchase_price", precision = 10, scale = 2)
    private BigDecimal purchasePrice;

    @Column(name = "selling_price", precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(name = "added_on")
    private LocalDateTime addedOn;

    @PrePersist
    protected void onCreate() {
        addedOn = LocalDateTime.now();
    }

    // Constructors
    public MedicineStock() {}

    public MedicineStock(Medicine medicine, String batchNumber, Integer quantity,
                         LocalDate expiryDate, BigDecimal purchasePrice, BigDecimal sellingPrice) {
        this.medicine = medicine;
        this.batchNumber = batchNumber;
        this.quantity = quantity;
        this.expiryDate = expiryDate;
        this.purchasePrice = purchasePrice;
        this.sellingPrice = sellingPrice;
    }

    // Getters and Setters
    public Long getStockId() { return stockId; }
    public void setStockId(Long stockId) { this.stockId = stockId; }

    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public BigDecimal getPurchasePrice() { return purchasePrice; }
    public void setPurchasePrice(BigDecimal purchasePrice) { this.purchasePrice = purchasePrice; }

    public BigDecimal getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(BigDecimal sellingPrice) { this.sellingPrice = sellingPrice; }

    public LocalDateTime getAddedOn() { return addedOn; }
    public void setAddedOn(LocalDateTime addedOn) { this.addedOn = addedOn; }
}