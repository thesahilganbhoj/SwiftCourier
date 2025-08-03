package com.courier.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long>{
 
}
