package com.courier.controller;

import com.courier.dto.*;
import com.courier.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @PostMapping("/accept-order")
    public ResponseEntity<String> acceptOrder(@RequestBody StaffAcceptOrderRequestDTO dto) {
        staffService.acceptOrder(dto);
        return ResponseEntity.ok("Order accepted successfully");
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<StaffOrderResponseDTO> getOrderDetails(@PathVariable Long orderId) {
        return ResponseEntity.ok(staffService.getOrderDetails(orderId));
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<StaffOrderResponseDTO>> getAcceptedTasks(@RequestParam Long staffId) {
        return ResponseEntity.ok(staffService.getAcceptedTasks(staffId));
    }

    @PatchMapping("/update-status")
    public ResponseEntity<String> updateStatus(@RequestBody StaffUpdateStatusRequestDTO dto) {
        staffService.updateStatus(dto);
        return ResponseEntity.ok("Status updated successfully");
    }

    @PatchMapping("/update-warehouse")
    public ResponseEntity<String> updateWarehouse(@RequestBody StaffUpdateWarehouseRequestDTO dto) {
        staffService.updateWarehouse(dto);
        return ResponseEntity.ok("Warehouse updated successfully");
    }

    @GetMapping("/profile/{staffId}")
    public ResponseEntity<StaffProfileResponseDTO> getStaffProfile(@PathVariable Long staffId) {
        return ResponseEntity.ok(staffService.getStaffProfile(staffId));
    }
}
