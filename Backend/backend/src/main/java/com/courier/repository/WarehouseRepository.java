package com.courier.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.courier.entities.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
	boolean existsByName(String name);
	
}
