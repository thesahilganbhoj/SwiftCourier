package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffProfileUpdateRequestDTO {
	private String name;
    private String email;
    private String address;
    private String warehouseName;
}
