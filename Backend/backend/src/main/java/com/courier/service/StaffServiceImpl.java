package com.courier.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.courier.custom_exceptions.InvalidRequestException;
import com.courier.custom_exceptions.ResourceNotFoundException;
import com.courier.dto.StaffAcceptOrderRequestDTO;
import com.courier.dto.StaffAvailabilityResponseDTO;
import com.courier.dto.StaffAvailabilityUpdateRequestDTO;
import com.courier.dto.StaffOrderResponseDTO;
import com.courier.dto.StaffProfileResponseDTO;
import com.courier.dto.StaffProfileUpdateRequestDTO;
import com.courier.dto.StaffRequestDTO;
import com.courier.dto.StaffUpdateStatusRequestDTO;
import com.courier.dto.StaffUpdateWarehouseRequestDTO;
import com.courier.entities.Order;
import com.courier.entities.Staff;
import com.courier.entities.StaffAvailability;
import com.courier.entities.Warehouse;
import com.courier.repository.OrderRepository;
import com.courier.repository.RouteTrackingRepository;
import com.courier.repository.StaffAvailabilityRepository;
import com.courier.repository.StaffRepository;
import com.courier.repository.WarehouseRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StaffServiceImpl implements StaffService{
    private final OrderRepository orderRepository;
    private final RouteTrackingRepository routeTrackingRepository;
    private final StaffRepository staffRepository;
    private final StaffAvailabilityRepository staffAvailabilityRepository;
    @Autowired
    private WarehouseRepository warehouseRepository;

    @Override
    public void acceptOrder(StaffAcceptOrderRequestDTO dto) {
        if (dto.getOrderId() == null || dto.getStaffId() == null) {
            throw new IllegalArgumentException("Order ID and Staff ID must not be null");
        }

        Order order = orderRepository.findById(dto.getOrderId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid Order ID: " + dto.getOrderId()));

        Staff staff = staffRepository.findById(dto.getStaffId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid Staff ID: " + dto.getStaffId()));

        order.setAssignedStaff(staff);
        order.setStatus("ACCEPTED");
        order.setUpdatedAt(LocalDateTime.now());
        if (dto.getSenderAddress() != null) order.setSenderAddress(dto.getSenderAddress());
        if (dto.getReceiverAddress() != null) order.setReceiverAddress(dto.getReceiverAddress());
        if (dto.getWeight() != null) order.setWeight(dto.getWeight());
        if (dto.getDescription() != null) order.setDescription(dto.getDescription());

        orderRepository.save(order);
        log.info("Order {} accepted by staff {}", dto.getOrderId(), dto.getStaffId());
    }

    @Override
    public StaffOrderResponseDTO getOrderDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderResponse(order);
    }
    
    @Override
    public List<StaffOrderResponseDTO> getAcceptedTasks(Long staffId) {
        log.info("Fetching accepted tasks for staff ID: {}", staffId);
        
        // Get orders assigned to this specific staff member
        List<Order> assignedOrders = orderRepository.findByAssignedStaff_StaffId(staffId);
        log.info("Found {} assigned orders for staff {}", assignedOrders.size(), staffId);
        
        // Filter to show only active tasks for this staff member
        // Tasks are removed only when they reach source warehouse or are delivered
        List<Order> activeTasks = assignedOrders.stream()
                .filter(order -> {
                    String status = order.getStatus();
                    // Keep tasks that are NOT at source warehouse or delivered
                    // Staff should see tasks until they hand them over to warehouse or deliver them
                    boolean isActive = !status.equals("Pending") && 
                           !status.equals("AT_SOURCE_WAREHOUSE") && 
                           !status.equals("DELIVERED");
                    log.debug("Order {} with status {} is active: {}", order.getOrderId(), status, isActive);
                    return isActive;
                })
                .collect(Collectors.toList());
        
        log.info("Returning {} active tasks for staff {}", activeTasks.size(), staffId);
        return activeTasks.stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void updateStatus(StaffUpdateStatusRequestDTO dto) {
        log.info("Updating status for order {} to {}", dto.getOrderId(), dto.getStatus());
        
        Order order = orderRepository.findById(dto.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Update status and timestamp
        order.setStatus(dto.getStatus());
        order.setUpdatedAt(LocalDateTime.now());
        
        orderRepository.save(order);
        log.info("Status updated successfully for order {}", dto.getOrderId());
    }

    @Override
    public void updateWarehouse(StaffUpdateWarehouseRequestDTO dto) {
        Order order = orderRepository.findById(dto.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setDestinationWarehouseId(dto.getNewWarehouseId());
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }


    public StaffProfileResponseDTO getStaffProfile(Long staffId) {
        Staff staff = staffRepository.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + staffId));

        Warehouse warehouse = staff.getCurrentWarehouse();

        // ✅ Populate DTO using its fields
        StaffProfileResponseDTO response = new StaffProfileResponseDTO();
        response.setStaffId(staff.getStaffId());
        response.setWarehouseId(warehouse != null ? warehouse.getWarehouseId() : null);
        response.setName(staff.getName());
        response.setEmail(staff.getEmail());
        response.setAddress(staff.getAddress());
        response.setWarehouseName(warehouse != null ? warehouse.getName() : null);
        response.setContactNumber(staff.getContactNumber());

        return response;
    }


    @Override
    public void updateStaffProfile(Long staffId, StaffProfileUpdateRequestDTO dto) {
        Staff staff = staffRepository.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + staffId));
        
        // Update only the fields that are provided and not null
        if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
            staff.setName(dto.getName().trim());
        }
        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            staff.setEmail(dto.getEmail().trim());
        }
        if (dto.getAddress() != null && !dto.getAddress().trim().isEmpty()) {
            staff.setAddress(dto.getAddress().trim());
        }
        
        staffRepository.save(staff);
    }

    @Override
    public List<StaffOrderResponseDTO> getPendingOrders() {
        // Get orders that are pending and not assigned to any staff (for admin assignment)
        List<Order> pendingOrders = orderRepository.findByStatus("Pending");
        return pendingOrders.stream()
                .filter(order -> order.getAssignedStaff() == null) // Only unassigned orders
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }
//    @Override
//    public List<StaffOrderResponseDTO> getPlacedOrders() {
//        // Get orders that are pending and not assigned to any staff (for admin assignment)
//        List<Order> pendingOrders = orderRepository.findByStatus("Placed");
//        return pendingOrders.stream()
//                .filter(order -> order.getAssignedStaff() == null) // Only unassigned orders
//                .map(this::mapToOrderResponse)
//                .collect(Collectors.toList());
//    }
//    


    @Override
    @Transactional(readOnly = true)
    public StaffAvailabilityResponseDTO getStaffAvailability(Long staffId) {
        log.info("Fetching availability for staff ID: {}", staffId);
        
        // First check if staff exists
        Staff staff = staffRepository.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + staffId));

        // Get or create staff availability record
        StaffAvailability availability = staffAvailabilityRepository.findByStaffId(staffId)
            .orElseGet(() -> {
                log.info("Creating new availability record for staff {}", staffId);
                // Create default availability record if not exists
                StaffAvailability newAvailability = new StaffAvailability();
                newAvailability.setStaffId(staffId);
                newAvailability.setStaff(staff);
                newAvailability.setCurrentLocation(staff.getCity() != null ? staff.getCity() : "Unknown");
                newAvailability.setAvailable(true); // Default to available
                newAvailability.setLastUpdated(LocalDateTime.now());
                return staffAvailabilityRepository.save(newAvailability);
            });

        log.info("Staff {} availability: {}", staffId, availability.isAvailable());
        return new StaffAvailabilityResponseDTO(
        	    availability.getStaffId(),
        	    availability.getCurrentLocation(),
        	    availability.isAvailable(),
        	    availability.getLastUpdated() // ✅ no formatting
        	);

    }

    @Override
    @Transactional
    public void updateStaffAvailability(StaffAvailabilityUpdateRequestDTO dto) {
        log.info("Received availability update request for staff {}. New status: {}", dto.getStaffId(), dto.isAvailable());
        
        try {
            // First check if staff exists
            Staff staff = staffRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + dto.getStaffId()));

            // Get or create staff availability record
            StaffAvailability availability = staffAvailabilityRepository.findByStaffId(dto.getStaffId())
                .orElseGet(() -> {
                    log.info("Creating new availability record for staff {}", dto.getStaffId());
                    StaffAvailability newAvailability = new StaffAvailability();
                    newAvailability.setStaffId(dto.getStaffId());
                    newAvailability.setStaff(staff);
                    newAvailability.setCurrentLocation(staff.getCity() != null ? staff.getCity() : "Unknown");
                    newAvailability.setAvailable(true);
                    newAvailability.setLastUpdated(LocalDateTime.now());
                    return newAvailability;
                });

            // Update availability status
            availability.setAvailable(dto.isAvailable());
            availability.setLastUpdated(LocalDateTime.now());
            
            // Update location if provided, otherwise keep existing or use staff city
            if (dto.getCurrentLocation() != null && !dto.getCurrentLocation().trim().isEmpty()) {
                availability.setCurrentLocation(dto.getCurrentLocation().trim());
            } else if (availability.getCurrentLocation() == null || availability.getCurrentLocation().equals("Unknown")) {
                availability.setCurrentLocation(staff.getCity() != null ? staff.getCity() : "Unknown");
            }

            StaffAvailability savedAvailability = staffAvailabilityRepository.save(availability);
            log.info("Successfully updated availability for staff {} to {}", dto.getStaffId(), savedAvailability.isAvailable());
            
        } catch (Exception e) {
            log.error("Failed to update staff availability for staff {}: {}", dto.getStaffId(), e.getMessage(), e);
            throw new RuntimeException("Failed to update staff availability: " + e.getMessage());
        }
    }

    private StaffOrderResponseDTO mapToOrderResponse(Order order) {
        return new StaffOrderResponseDTO(
                order.getOrderId(),
                order.getTrackingId(),
                order.getStatus(),
                order.getSenderName(),
                order.getReceiverName(),
                order.getReceiverAddress(),
                order.getReceiverContact(),
                order.getWeight(),
                order.getSourceWarehouseId(),
                order.getDestinationWarehouseId(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                order.getPrice()
        );
    }
    
    public void deleteStaffById(Long staffId) {
        if (staffId == null || staffId <= 0) {
            throw new InvalidRequestException("Invalid staff ID provided: " + staffId);
        }

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff with ID " + staffId + " not found"));

        if (staff.getAssignedOrders() != null && !staff.getAssignedOrders().isEmpty()) {
            throw new InvalidRequestException("Cannot delete staff ID " + staffId + " as they are assigned to active orders.");
        }

        StaffAvailability availability = staff.getStaffAvailability();
        if (availability != null) {
            availability.setStaff(null); // Break bidirectional link
            staff.setStaffAvailability(null); 
        }

        staffRepository.delete(staff);
    }
    public Staff createStaff(StaffRequestDTO dto) {
        if (staffRepository.existsByEmail(dto.getEmail())) {
            throw new InvalidRequestException("Email already exists: " + dto.getEmail());
        }

         Warehouse warehouse = warehouseRepository.findById(dto.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with ID: " + dto.getWarehouseId()));

        Staff staff = new Staff();
        staff.setName(dto.getName());
        staff.setEmail(dto.getEmail());
        staff.setPassword(dto.getPassword());
        staff.setAddress(dto.getAddress());
        staff.setContactNumber(dto.getContactNumber());
        staff.setCurrentWarehouse(warehouse);
        staff.setCity(dto.getCity());

        return staffRepository.save(staff);
    }
    
}
