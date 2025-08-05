package com.courier.repository;

import com.courier.entities.StaffAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StaffAvailabilityRepository extends JpaRepository<StaffAvailability, Long> {
    Optional<StaffAvailability> findByStaffId(Long staffId);
}
