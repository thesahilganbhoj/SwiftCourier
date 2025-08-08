package com.courier.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.courier.dto.ManageStaffAdminDTO;
import com.courier.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long>{
	@Query("SELECT new com.courier.dto.ManageStaffAdminDTO(s.staffId, s.name, sa.isAvailable) " +
		       "FROM Staff s " +
		       "JOIN s.staffAvailability sa " +
		       "WHERE s.currentWarehouse = (SELECT a.warehouse FROM Admin a WHERE a.adminId = :adminId)")
		List<ManageStaffAdminDTO> findStaffByAdminWarehouse(@Param("adminId") Long adminId);

    Optional<Admin> findByEmail(String email);
}
