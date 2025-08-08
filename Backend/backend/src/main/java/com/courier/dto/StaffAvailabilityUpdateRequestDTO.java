package com.courier.dto;

//import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

//import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffAvailabilityUpdateRequestDTO {
  private Long staffId;
  private boolean isAvailable;
  private String currentLocation;
}
