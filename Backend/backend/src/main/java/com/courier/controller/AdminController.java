package com.courier.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.ManageStaffAdminDTO;
import com.courier.dto.OrderAdminRespDTO;
import com.courier.dto.WarehouseDTO;
import com.courier.entities.Admin;
import com.courier.service.AdminService;
import com.courier.service.WarehouseService;

import jakarta.validation.Valid;



@RequestMapping("/admin")
@RestController
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private WarehouseService warehouseService;
	 
	@GetMapping("/{id}")
	public ResponseEntity<?> getAdminById(@PathVariable Long id){
		
		return ResponseEntity.ok(adminService.getAdminById(id));
	}
	
	
	@PostMapping("/add")
	public ResponseEntity<?> addAdmin(@RequestBody Admin admin){
		
		return ResponseEntity.ok(adminService.addAdmin(admin));
	}
	
	@GetMapping("/orders")
	public ResponseEntity<?> getOrders(){
		List<OrderAdminRespDTO> list = adminService.getOrdersForDashboard();
		
		if(list.isEmpty()) {
			ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/staff")
	public ResponseEntity<?> getStaff(){
		List<OrderAdminRespDTO> list = adminService.getOrdersForDashboard();
		
		if(list.isEmpty()) {
			ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		
		return ResponseEntity.ok(list);
	}
	
	
	 @GetMapping("/staff/{adminId}")
	    public ResponseEntity<List<ManageStaffAdminDTO>> getStaffForAdminWarehouse(@PathVariable Long adminId) {
	        List<ManageStaffAdminDTO> staffList = adminService.getStaffByAdminWarehouse(adminId);
	        if (staffList.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        return ResponseEntity.ok(staffList);
	    }
	 
	 
	 
	 //Warehouse Services ---------------------------
	 
	   @PostMapping("/addWarehouse")
	   public ResponseEntity<String> addWarehouse(@RequestBody WarehouseDTO warehouseDTO) {
	        String response = warehouseService.addWarehouse(warehouseDTO);
	        return ResponseEntity.ok(response); // Returns: "Warehouse added successfully!"
	    }

	    @GetMapping("/getWareHouseById/{warehouseId}")
	    public ResponseEntity<?> getWarehouseById(@PathVariable Long warehouseId) {
	        return ResponseEntity.ok(warehouseService.getWarehouseById(warehouseId));
	    }

	    @GetMapping("/getAllWarehouses")
	    public ResponseEntity<List<WarehouseDTO>> getAllWarehouses() {
	        return ResponseEntity.ok(warehouseService.getAllWarehouses());
	    }
	    
	    @PutMapping("/updateWarehouse/{id}")
	    public ResponseEntity<String> updateWarehouse(
	            @PathVariable("id") Long warehouseId,
	            @Valid @RequestBody WarehouseDTO warehouseDTO) {
	        
	        String response = warehouseService.updateWarehouse(warehouseId, warehouseDTO);
	        return ResponseEntity.ok(response);
	    }
	    
	    
	    @DeleteMapping("/deleteWarehouse/{id}")
	    public ResponseEntity<String> deleteWarehouse(@PathVariable("id") Long warehouseId) {
	        String response = warehouseService.deleteWarehouse(warehouseId);
	        return ResponseEntity.ok(response);
	    }
	 
}
