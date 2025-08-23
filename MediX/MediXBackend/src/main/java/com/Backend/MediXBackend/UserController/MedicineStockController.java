package com.Backend.MediXBackend.UserController;

import com.Backend.MediXBackend.User.MedicineStock;
import com.Backend.MediXBackend.UserService.MedicineStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class MedicineStockController {

    @Autowired
    private MedicineStockService stockService;

    @GetMapping
    public List<MedicineStock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineStock> getStockById(@PathVariable Long id) {
        Optional<MedicineStock> stock = stockService.getStockById(id);
        return stock.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/medicine/{medicineId}")
    public List<MedicineStock> getStocksByMedicineId(@PathVariable Long medicineId) {
        return stockService.getStocksByMedicineId(medicineId);
    }

    @PostMapping("/medicine/{medicineId}")
    public ResponseEntity<MedicineStock> createStock(@PathVariable Long medicineId, @RequestBody MedicineStock stock) {
        MedicineStock createdStock = stockService.createStock(stock, medicineId);
        if (createdStock != null) {
            return ResponseEntity.ok(createdStock);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineStock> updateStock(@PathVariable Long id, @RequestBody MedicineStock stockDetails) {
        MedicineStock updatedStock = stockService.updateStock(id, stockDetails);
        if (updatedStock != null) {
            return ResponseEntity.ok(updatedStock);
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/quantity")
    public ResponseEntity<?> updateStockQuantity(@PathVariable Long id, @RequestParam Integer quantityChange) {
        boolean updated = stockService.updateStockQuantity(id, quantityChange);
        if (updated) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStock(@PathVariable Long id) {
        boolean deleted = stockService.deleteStock(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/expired")
    public List<MedicineStock> getExpiredStocks() {
        return stockService.getExpiredStocks();
    }

    @GetMapping("/expiring-soon")
    public List<MedicineStock> getStocksExpiringSoon(@RequestParam(defaultValue = "30") int days) {
        return stockService.getStocksExpiringSoon(days);
    }

    @GetMapping("/medicine/{medicineId}/total")
    public ResponseEntity<Integer> getTotalStockByMedicineId(@PathVariable Long medicineId) {
        Optional<Integer> totalStock = stockService.getTotalStockByMedicineId(medicineId);
        return totalStock.map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(0));
    }
}