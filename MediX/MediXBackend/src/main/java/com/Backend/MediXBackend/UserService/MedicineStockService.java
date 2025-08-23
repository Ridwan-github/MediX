package com.Backend.MediXBackend.UserService;

import com.Backend.MediXBackend.User.Medicine;
import com.Backend.MediXBackend.User.MedicineStock;
import com.Backend.MediXBackend.UserRepository.MedicineRepository;
import com.Backend.MediXBackend.UserRepository.MedicineStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedicineStockService {

    @Autowired
    private MedicineStockRepository stockRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public List<MedicineStock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<MedicineStock> getStockById(Long id) {
        return stockRepository.findById(id);
    }

    public List<MedicineStock> getStocksByMedicineId(Long medicineId) {
        return stockRepository.findByMedicine_MedicineId(medicineId);
    }

    public MedicineStock createStock(MedicineStock stock, Long medicineId) {
        Optional<Medicine> optionalMedicine = medicineRepository.findById(medicineId);
        if (optionalMedicine.isPresent()) {
            stock.setMedicine(optionalMedicine.get());
            return stockRepository.save(stock);
        }
        return null;
    }

    public MedicineStock updateStock(Long id, MedicineStock stockDetails) {
        Optional<MedicineStock> optionalStock = stockRepository.findById(id);
        if (optionalStock.isPresent()) {
            MedicineStock stock = optionalStock.get();
            stock.setBatchNumber(stockDetails.getBatchNumber());
            stock.setQuantity(stockDetails.getQuantity());
            stock.setExpiryDate(stockDetails.getExpiryDate());
            stock.setPurchasePrice(stockDetails.getPurchasePrice());
            stock.setSellingPrice(stockDetails.getSellingPrice());
            return stockRepository.save(stock);
        }
        return null;
    }

    public boolean updateStockQuantity(Long stockId, Integer quantityChange) {
        Optional<MedicineStock> optionalStock = stockRepository.findById(stockId);
        if (optionalStock.isPresent()) {
            MedicineStock stock = optionalStock.get();
            int newQuantity = stock.getQuantity() + quantityChange;
            if (newQuantity >= 0) {
                stock.setQuantity(newQuantity);
                stockRepository.save(stock);
                return true;
            }
        }
        return false;
    }

    public boolean deleteStock(Long id) {
        if (stockRepository.existsById(id)) {
            stockRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<MedicineStock> getExpiredStocks() {
        return stockRepository.findByExpiryDateBefore(LocalDate.now());
    }

    public List<MedicineStock> getStocksExpiringSoon(int days) {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(days);
        return stockRepository.findByExpiryDateBetween(startDate, endDate);
    }

    public Optional<Integer> getTotalStockByMedicineId(Long medicineId) {
        return stockRepository.getTotalStockByMedicineId(medicineId);
    }
}