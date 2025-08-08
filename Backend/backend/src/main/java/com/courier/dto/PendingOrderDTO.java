package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingOrderDTO {
    private String orderId;
    private String receiverName;
    private String status;
    private String trackingId;
}
