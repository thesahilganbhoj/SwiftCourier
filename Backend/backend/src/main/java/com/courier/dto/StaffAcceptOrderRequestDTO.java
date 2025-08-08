package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Accept Order Request DTO
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffAcceptOrderRequestDTO {
	private Long orderId;
	private Long staffId; 
    private String senderAddress;
    private String receiverAddress;
    private Double weight;
    private String description;
    
}
