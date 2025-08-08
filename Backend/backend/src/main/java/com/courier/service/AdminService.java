package com.courier.service;

import java.util.List;

import com.courier.dto.ManageStaffAdminDTO;
import com.courier.dto.OrderAdminRespDTO;
import com.courier.entities.Admin;

public interface AdminService {

	Admin getAdminById(Long id);

	String addAdmin(Admin admin);

	List<OrderAdminRespDTO> getOrdersForDashboard();

	List<ManageStaffAdminDTO> getStaffByAdminWarehouse(Long adminId);
}
