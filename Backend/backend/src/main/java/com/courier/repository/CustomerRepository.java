package com.courier.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
