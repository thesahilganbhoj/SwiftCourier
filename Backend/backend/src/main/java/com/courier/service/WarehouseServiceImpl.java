package com.courier.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.custom_exceptions.InvalidRequestException;
import com.courier.custom_exceptions.ResourceNotFoundException;
import com.courier.dto.WarehouseDTO;
import com.courier.entities.Warehouse;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WarehouseServiceImpl implements WarehouseService {
	@Autowired
    private WarehouseRepository warehouseRepository;
	 @Autowired
	    private ModelMapper modelMapper;

    public String addWarehouse(WarehouseDTO warehouseDTO) {
	if (warehouseDTO == null) {
            throw new IllegalArgumentException("Warehouse details cannot be null");
        }
    	boolean exists = warehouseRepository.existsByName(
                warehouseDTO.getName());
    	 if (exists) {
    		 throw new InvalidRequestException("Warehouse already exists.");
         }
    	   Warehouse warehouse = modelMapper.map(warehouseDTO, Warehouse.class);

           // 5️⃣ Save to DB
           Warehouse savedWarehouse = warehouseRepository.save(warehouse);

           return "Warehouse added successfully!";
    }

    public WarehouseDTO getWarehouseById(Long warehouseId) {
    	 Warehouse warehouse = warehouseRepository.findById(warehouseId)
    	            .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with ID: " + warehouseId));

    	  
    	    return modelMapper.map(warehouse, WarehouseDTO.class);
    }

    public List<WarehouseDTO> getAllWarehouses() {

    	 return warehouseRepository.findAll().stream()
    	            .map(w -> new WarehouseDTO(
    	                w.getWarehouseId(), w.getName(), w.getCity(),
    	                w.getAddress(), w.getContactNumber()))
    	            .toList();

    }
    
    public String updateWarehouse(Long warehouseId, WarehouseDTO warehouseDTO) {
        // Validate input DTO
        if (warehouseDTO == null) {
            throw new IllegalArgumentException("Warehouse details cannot be null");
        }

        // Fetch existing warehouse or throw exception
        Warehouse existingWarehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with ID: " + warehouseId));

        existingWarehouse.setWarehouseId(warehouseId);
        modelMapper.map(warehouseDTO, existingWarehouse);
       
            warehouseRepository.save(existingWarehouse);
            return "Warehouse updated successfully!";
      }
    public String deleteWarehouse(Long warehouseId) {
        // Check if warehouse exists
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with ID: " + warehouseId));

       
            warehouseRepository.delete(warehouse);
            return "Warehouse deleted successfully!";
       
    }

}
