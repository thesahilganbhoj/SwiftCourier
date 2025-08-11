package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Complaint;

public interface ComplaintDao extends JpaRepository<Complaint, Long> {

}
