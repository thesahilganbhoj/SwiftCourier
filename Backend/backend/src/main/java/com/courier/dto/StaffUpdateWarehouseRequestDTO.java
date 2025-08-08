package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffUpdateWarehouseRequestDTO {
    private Long orderId;
    private String trackingId;
    private Integer newWarehouseId;
}
