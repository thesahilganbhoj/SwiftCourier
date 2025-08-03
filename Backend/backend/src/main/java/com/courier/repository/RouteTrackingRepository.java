package com.courier.repository;

import com.courier.entities.RouteTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RouteTrackingRepository extends JpaRepository<RouteTracking, Long>{
	Optional<RouteTracking> findByTrackingId(Long trackingId);
}
