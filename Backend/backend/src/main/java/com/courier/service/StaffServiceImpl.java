package com.courier.service;

import com.courier.dto.*;
import com.courier.entities.*;
import com.courier.repository.*;
//import com.courier.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService{
	private final OrderRepository orderRepository;
    private final RouteTrackingRepository routeTrackingRepository;
    private final StaffRepository staffRepository;
//    private final WarehouseRepository warehouseRepository;

//    @Override
//    public void acceptOrder(StaffAcceptOrderRequestDTO dto) {
//        Order order = orderRepository.findById(dto.getOrderId()).orElseThrow();
//        order.setSenderAddress(dto.getSenderAddress());
//        order.setReceiverAddress(dto.getReceiverAddress());
//        order.setWeight(dto.getWeight());
//        order.setDescription(dto.getDescription());
//        order.setStatus("ACCEPTED");
//        orderRepository.save(order);
//    }
    @Override
    public void acceptOrder(StaffAcceptOrderRequestDTO dto) {
        Order order = orderRepository.findById(dto.getOrderId()).orElseThrow();
        Staff staff = staffRepository.findById(dto.getStaffId()).orElseThrow();

        order.setAssignedStaff(staff);
        order.setStatus("ACCEPTED");
        order.setSenderAddress(dto.getSenderAddress());
        order.setReceiverAddress(dto.getReceiverAddress());
        order.setWeight(dto.getWeight());
        order.setDescription(dto.getDescription());

        orderRepository.save(order); // ✅ important
    }


    @Override
    public StaffOrderResponseDTO getOrderDetails(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        return mapToOrderResponse(order);
    }

//    @Override
//    public List<StaffOrderResponseDTO> getAcceptedTasks(Long staffId) {
//        return orderRepository.findByAssignedStaff_StaffIdAndStatus(staffId, "ACCEPTED")
//                .stream().map(this::mapToOrderResponse).collect(Collectors.toList());
//    }
    
    @Override
    public List<StaffOrderResponseDTO> getAcceptedTasks(Long staffId) {
        List<Order> acceptedOrders = orderRepository.findByAssignedStaff_StaffIdAndStatus(staffId, "ACCEPTED");

        return acceptedOrders.stream()
                .map(order -> StaffOrderResponseDTO.from(order)) // or manual conversion
                .collect(Collectors.toList());
    }



    @Override
    public void updateStatus(StaffUpdateStatusRequestDTO dto) {
        Order order = orderRepository.findById(dto.getOrderId()).orElseThrow();
        order.setStatus(dto.getStatus());
        orderRepository.save(order);
    }

    
    @Override
    public void updateWarehouse(StaffUpdateWarehouseRequestDTO dto) {
        Long trackingId = Long.parseLong(dto.getTrackingId());
        RouteTracking rt = routeTrackingRepository.findByTrackingId(trackingId)
            .orElseThrow(() -> new RuntimeException("Tracking ID not found"));
        rt.setToWarehouseId(dto.getNewWarehouseId().longValue());
        routeTrackingRepository.save(rt);
    }


    @Override
    public StaffProfileResponseDTO getStaffProfile(Long staffId) {
        Staff staff = staffRepository.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Staff not found"));

        Warehouse warehouse = staff.getCurrentWarehouse();

        return new StaffProfileResponseDTO(
            staff.getStaffId(),
            warehouse != null ? warehouse.getWarehouseId() : null,
            staff.getName(),
            staff.getEmail(),
            staff.getAddress(),
            warehouse != null ? warehouse.getName() : null
        );
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

}
