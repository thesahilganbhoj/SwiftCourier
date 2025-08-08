package com.courier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.entities.StaffAvailability;

public interface StaffAvailabilityRepository extends JpaRepository<StaffAvailability, Long> {
    Optional<StaffAvailability> findByStaffId(Long staffId);
}
