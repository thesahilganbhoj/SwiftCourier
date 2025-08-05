package com.courier.service;

import com.courier.dto.*;
import java.util.List;

public interface StaffService {
    void acceptOrder(StaffAcceptOrderRequestDTO dto);
    StaffOrderResponseDTO getOrderDetails(Long orderId);
    List<StaffOrderResponseDTO> getAcceptedTasks(Long staffId);
    void updateStatus(StaffUpdateStatusRequestDTO dto);
    void updateWarehouse(StaffUpdateWarehouseRequestDTO dto);
    StaffProfileResponseDTO getStaffProfile(Long staffId);
    void updateStaffProfile(Long staffId, StaffProfileUpdateRequestDTO dto);
    List<StaffOrderResponseDTO> getPendingOrders();
    
    // New methods for availability management
    StaffAvailabilityResponseDTO getStaffAvailability(Long staffId);
    void updateStaffAvailability(StaffAvailabilityUpdateRequestDTO dto);
}
