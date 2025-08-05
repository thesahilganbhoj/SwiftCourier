package com.courier.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.custom_exceptions.ResourceNotFoundException;
import com.courier.dto.ManageStaffAdminDTO;
import com.courier.dto.OrderAdminRespDTO;
import com.courier.entities.Admin;
import com.courier.entities.Order;
import com.courier.repository.AdminRepository;
import com.courier.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{

	@Autowired
    private AdminRepository adminRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Override
	public Admin getAdminById(Long adminId) {
		
		  Admin admin =adminRepository.findById(adminId)
				  .orElseThrow(() -> new ResourceNotFoundException("Invalid restuarant ID"));;
		
		  return admin;
	}
	
	
	public String addAdmin(Admin admin) {
		
		 adminRepository.save(admin);
		 return "Admin added successfully!!!!!!!!!!!";
	}


	 @Override
	    public List<OrderAdminRespDTO> getOrdersForDashboard() {
	        // Fetch all orders from DB
	        List<Order> orders = orderRepository.findByStatus("PENDING");
	        		

	        // Manually map each Order entity to OrderAdminRespDTO
	        return orders.stream()
	                .map(this::convertToAdminRespDTO)
	                .collect(Collectors.toList());
	    }

	    // Helper method for manual mapping
	    private OrderAdminRespDTO convertToAdminRespDTO(Order order) {
	        OrderAdminRespDTO dto = new OrderAdminRespDTO();
	        dto.setOrderId(order.getOrderId());
	        dto.setCustomerId(order.getCustomer().getCustomerId());
	        dto.setCity(order.getDestinationCity());
	        dto.setSenderAddress(order.getSenderAddress());
	        dto.setReceiverAddress(order.getReceiverAddress());
	       
	        return dto;
	    }
	
	    public List<ManageStaffAdminDTO> getStaffByAdminWarehouse(Long adminId) {
	        return adminRepository.findStaffByAdminWarehouse(adminId);
	    }
	
}
