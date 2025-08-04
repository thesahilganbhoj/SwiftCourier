package com.courier.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingOrderDTO {
    private String orderId;
    private String receiverName;
    private String status;
    private String trackingId;
}
