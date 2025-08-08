package com.courier.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.ApiResponse;
import com.courier.dto.StaffAcceptOrderRequestDTO;
import com.courier.dto.StaffAvailabilityResponseDTO;
import com.courier.dto.StaffAvailabilityUpdateRequestDTO;
import com.courier.dto.StaffOrderResponseDTO;
import com.courier.dto.StaffProfileResponseDTO;
import com.courier.dto.StaffProfileUpdateRequestDTO;
import com.courier.dto.StaffRequestDTO;
import com.courier.dto.StaffUpdateStatusRequestDTO;
import com.courier.dto.StaffUpdateWarehouseRequestDTO;
import com.courier.entities.Staff;
import com.courier.service.StaffService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @PostMapping("/accept-order")
    public ResponseEntity<String> acceptOrder(@RequestBody StaffAcceptOrderRequestDTO dto) {
        try {
            staffService.acceptOrder(dto);
            return ResponseEntity.ok("Order accepted successfully");
        } catch (Exception e) {
            log.error("Error accepting order: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Failed to accept order: " + e.getMessage());
        }
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<StaffOrderResponseDTO> getOrderDetails(@PathVariable Long orderId) {
        try {
            return ResponseEntity.ok(staffService.getOrderDetails(orderId));
        } catch (Exception e) {
            log.error("Error fetching order details: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<StaffOrderResponseDTO>> getAcceptedTasks(@RequestParam Long staffId) {
        try {
            log.info("Received request for tasks for staff ID: {}", staffId);
            List<StaffOrderResponseDTO> tasks = staffService.getAcceptedTasks(staffId);
            log.info("Returning {} tasks for staff {}", tasks.size(), staffId);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            log.error("Error fetching accepted tasks: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PatchMapping("/update-status")
    public ResponseEntity<String> updateStatus(@RequestBody StaffUpdateStatusRequestDTO dto) {
        try {
            staffService.updateStatus(dto);
            return ResponseEntity.ok("Status updated successfully");
        } catch (Exception e) {
            log.error("Error updating status: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Failed to update status: " + e.getMessage());
        }
    }

    @PatchMapping("/update-warehouse")
    public ResponseEntity<String> updateWarehouse(@RequestBody StaffUpdateWarehouseRequestDTO dto) {
        try {
            staffService.updateWarehouse(dto);
            return ResponseEntity.ok("Warehouse updated successfully");
        } catch (Exception e) {
            log.error("Error updating warehouse: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Failed to update warehouse: " + e.getMessage());
        }
    }

    @GetMapping("/profile/{staffId}")
    public ResponseEntity<StaffProfileResponseDTO> getStaffProfile(@PathVariable Long staffId) {
        try {
            return ResponseEntity.ok(staffService.getStaffProfile(staffId));
        } catch (Exception e) {
            log.error("Error fetching staff profile: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/profile/{staffId}")
    public ResponseEntity<ApiResponse<String>> updateStaffProfile(@PathVariable Long staffId, @RequestBody StaffProfileUpdateRequestDTO dto) {
        try {
            staffService.updateStaffProfile(staffId, dto);
            return ResponseEntity.ok(new ApiResponse<>("Staff profile updated successfully", "Profile updated"));
        } catch (Exception e) {
            log.error("Error updating staff profile: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(new ApiResponse<>("Failed to update profile: " + e.getMessage(), null));
        }
    }

    // Get all pending orders for staff to accept
    @GetMapping("/pending-orders")
    public ResponseEntity<List<StaffOrderResponseDTO>> getPendingOrders() {
        try {
            return ResponseEntity.ok(staffService.getPendingOrders());
        } catch (Exception e) {
            log.error("Error fetching pending orders: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get staff availability status
    @GetMapping("/availability/{staffId}")
    public ResponseEntity<StaffAvailabilityResponseDTO> getStaffAvailability(@PathVariable Long staffId) {
        try {
            log.info("Received request for availability for staff ID: {}", staffId);
            StaffAvailabilityResponseDTO availability = staffService.getStaffAvailability(staffId);
            return ResponseEntity.ok(availability);
        } catch (Exception e) {
            log.error("Error fetching staff availability: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Update staff availability status
    @PutMapping("/availability/{staffId}")
    public ResponseEntity<ApiResponse<String>> updateStaffAvailability(@PathVariable Long staffId, @RequestBody StaffAvailabilityUpdateRequestDTO dto) {
        try {
            log.info("Received availability update request for staff {}: {}", staffId, dto);
            dto.setStaffId(staffId); // Ensure staffId matches path variable
            staffService.updateStaffAvailability(dto);
            return ResponseEntity.ok(new ApiResponse<>("Staff availability updated successfully", "Availability updated"));
        } catch (Exception e) {
            log.error("Error updating staff availability: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(new ApiResponse<>("Failed to update availability: " + e.getMessage(), null));
        }
    }
    
    
    @DeleteMapping("/{staffId}")
    public ResponseEntity<String> deleteStaff(@PathVariable Long staffId) {
        staffService.deleteStaffById(staffId);
        return ResponseEntity.ok("✅ Staff with ID " + staffId + " has been deleted successfully.");
    }
    @PostMapping("/createStaff")
    public ResponseEntity<?> createStaff(@Valid @RequestBody StaffRequestDTO staffRequest) {
        Staff createdStaff = staffService.createStaff(staffRequest);
        return ResponseEntity.ok("✅ Staff created successfully with ID: " + createdStaff.getStaffId());
    }
}
