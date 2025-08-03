package com.courier.dto;

import java.time.LocalDateTime;

import com.courier.entities.Order;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffOrderResponseDTO {
    private Long orderId;
    private String trackingId;
    private String status;
    private String senderName;
    private String receiverName;
    private String receiverAddress;
    private String receiverContact;
    private Double weight;
    private Integer sourceWarehouseId;
    private Integer destinationWarehouseId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private double price;
    
    public static StaffOrderResponseDTO from(Order order) {
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
