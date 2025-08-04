package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrderRespDTO {
    private Long orderId;
    private String trackingId;
    private String orderPlacedOn;
    private String description;
    private String senderName;
    private String senderAddress;
    private String receiverName;
    private String receiverContact;
    private String receiverAddress;
    private double weight;
}
