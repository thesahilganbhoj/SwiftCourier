package com.courier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.entities.RouteTracking;

public interface RouteTrackingRepository extends JpaRepository<RouteTracking, Long>{
	Optional<RouteTracking> findByTrackingId(Long trackingId);
}
