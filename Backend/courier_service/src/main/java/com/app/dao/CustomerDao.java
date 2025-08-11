package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Customer;

public interface CustomerDao extends JpaRepository<Customer, Long> {

}
