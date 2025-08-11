package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ComplaintDto;
import com.app.service.ComplaintService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/complaint")
public class ComplaintController {

	@Autowired
	private ComplaintService complaintService;

	@GetMapping("")
	public List<ComplaintDto> getAllComplaints() {
		return complaintService.getAllComplaints();
	}

	@GetMapping("/{id}")
	public ComplaintDto getComplaintById(@PathVariable Long id) {
		return complaintService.getComplaintById(id);
	}

	@PostMapping("")
	public ComplaintDto addComplaint(@RequestBody ComplaintDto complaintDTO) {
		return complaintService.addComplaint(complaintDTO);
	}

	@PutMapping("/{id}")
	public ComplaintDto updateComplaint(@PathVariable Long id, @RequestBody ComplaintDto complaintDTO) {
		return complaintService.updateComplaint(id, complaintDTO);
	}

	@DeleteMapping("/{id}")
	public void deleteComplaint(@PathVariable Long id) {
		complaintService.deleteComplaint(id);
	}
}
