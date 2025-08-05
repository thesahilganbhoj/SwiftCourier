package com.courier.controller;

import com.courier.dto.*;
import com.courier.service.StaffService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
