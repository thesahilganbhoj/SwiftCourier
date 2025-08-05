package com.courier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
	  boolean existsById(Long staffId); 
	  Optional<Staff> findByEmail(String email);
	    boolean existsByEmail(String email);
}
