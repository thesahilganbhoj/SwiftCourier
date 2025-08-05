package com.courier.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffAvailabilityResponseDTO {
    private Long staffId;
    private String currentLocation;
    private boolean isAvailable;
    private String lastUpdated;
}
