package com.courier.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffUpdateStatusRequestDTO {
    private String trackingId;
    private Long orderId;
    private String senderName;
    private String receiverName;
    private String receiverContact;
    private String senderAddress;
    private String receiverAddress;
    private Double weight;
    private String description;
    private String status;
}
