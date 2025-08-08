package com.courier.service;

import java.util.List;

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

import jakarta.validation.Valid;

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
    public void deleteStaffById(Long staffId);
	
    Staff createStaff(@Valid StaffRequestDTO staffRequest);
	//List<StaffOrderResponseDTO> getPlacedOrders();
}
