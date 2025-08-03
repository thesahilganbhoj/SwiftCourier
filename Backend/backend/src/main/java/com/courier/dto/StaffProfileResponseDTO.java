package com.courier.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffProfileResponseDTO {
    private Long staffId;
    private Long warehouseId;
    private String name;
    private String email;
    private String address;
    private String warehouseName;
}
