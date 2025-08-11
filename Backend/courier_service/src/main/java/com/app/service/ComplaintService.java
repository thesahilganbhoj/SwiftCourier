package com.app.service;

import java.util.List;

import com.app.dto.ComplaintDto;

public interface ComplaintService {

	ComplaintDto addComplaint(ComplaintDto complaintDto);

	ComplaintDto getComplaintById(Long id);

	List<ComplaintDto> getAllComplaints();

	ComplaintDto updateComplaint(Long id, ComplaintDto complaintDto);

	void deleteComplaint(Long id);

}
