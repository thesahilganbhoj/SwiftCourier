package com.courier.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffAvailabilityResponseDTO {
private Long staffId;
private String currentLocation;
private boolean isAvailable;

@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS") // Changed pattern
private LocalDateTime lastUpdated;
}
