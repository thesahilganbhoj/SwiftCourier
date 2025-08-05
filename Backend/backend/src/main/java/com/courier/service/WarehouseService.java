package com.courier.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.courier.dto.WarehouseDTO;
import com.courier.entities.Warehouse;

import jakarta.validation.Valid;

public interface WarehouseService {

	String addWarehouse(@Valid WarehouseDTO warehouseRequest);

	WarehouseDTO getWarehouseById(Long warehouseId);

	List<WarehouseDTO> getAllWarehouses();
	
	public String updateWarehouse(Long warehouseId, WarehouseDTO warehouseDTO);
	
	public String deleteWarehouse(Long warehouseId);

}
