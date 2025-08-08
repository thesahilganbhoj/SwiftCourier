package com.courier.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.courier.entities.Customer;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
    boolean existsByEmail(String email);
}
