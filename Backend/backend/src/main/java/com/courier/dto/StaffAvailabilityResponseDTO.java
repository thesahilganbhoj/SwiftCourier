package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffAvailabilityResponseDTO {
    private Long staffId;
    private String currentLocation;
    private boolean isAvailable;
    private String lastUpdated;
}
