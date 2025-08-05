package com.courier.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffAvailabilityUpdateRequestDTO {
	private Long staffId;
    private boolean isAvailable;
    private String currentLocation;	
}
