package com.courier.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.entities.Admin;
import com.courier.repository.AdminRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{

	@Autowired
    private AdminRepository adminRepository;
	@Override
	public Admin getAdminById(Long adminId) {
		
		  Optional admin =adminRepository.findById(adminId);
		
		  return (Admin) admin.get();
	}
	
	
	public String addAdmin(Admin admin) {
		
		 adminRepository.save(admin);
		 return "Admin added successfully!!!!!!!!!!!";
	}
	
	
	
}
