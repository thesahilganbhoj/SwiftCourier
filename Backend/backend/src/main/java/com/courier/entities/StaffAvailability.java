package com.courier.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff_availability")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaffAvailability {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "staff_id")
	private Long staffId;
	
	@Column(name = "current_location", nullable = false)
	private String currentLocation;
	
	@Column(name = "is_available", nullable = false)
	private boolean isAvailable;
	
	@Column(name = "last_updated", nullable = false)
	private LocalDateTime lastUpdated;
	
	@OneToOne
    @MapsId
    @JoinColumn(name = "staff_id")
    private Staff staff;
	
}
