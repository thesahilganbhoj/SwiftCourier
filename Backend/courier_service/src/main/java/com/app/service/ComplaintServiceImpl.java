package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ComplaintDao;
import com.app.dto.ComplaintDto;
import com.app.pojos.Complaint;
import com.app.pojos.ComplaintStatus;

@Service
@Transactional
public class ComplaintServiceImpl implements ComplaintService {
	@Autowired
	private ComplaintDao complaintDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ComplaintDto addComplaint(ComplaintDto complaintDto) {
		Complaint complaint = modelMapper.map(complaintDto, Complaint.class);
		complaint.setComplaintStatus(ComplaintStatus.OPEN);
		Complaint addedComplaint = complaintDao.save(complaint);
		return modelMapper.map(addedComplaint, ComplaintDto.class);
	}

	@Override
	public ComplaintDto getComplaintById(Long id) {
		Complaint complaint = complaintDao.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Complaint not found"));
		return modelMapper.map(complaint, ComplaintDto.class);
	}

	@Override
	public List<ComplaintDto> getAllComplaints() {
		List<Complaint> complaints = complaintDao.findAll();
		return complaints.stream().map(complaint -> modelMapper.map(complaint, ComplaintDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public ComplaintDto updateComplaint(Long id, ComplaintDto complaintDto) {
		Complaint complaint = complaintDao.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Complaint not found"));
		complaint = modelMapper.map(complaintDto, Complaint.class);
		complaint.setComplaintId(id);
		Complaint addedComplaint = complaintDao.save(complaint);
		return modelMapper.map(addedComplaint, ComplaintDto.class);
	}

	@Override
	public void deleteComplaint(Long id) {
		Complaint complaint = complaintDao.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Complaint not found"));
		complaintDao.delete(complaint);
	}

}
