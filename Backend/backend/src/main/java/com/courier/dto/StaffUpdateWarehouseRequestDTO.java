package com.courier.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffUpdateWarehouseRequestDTO {
    private Long orderId;
    private String trackingId;
    private Integer newWarehouseId;
}
