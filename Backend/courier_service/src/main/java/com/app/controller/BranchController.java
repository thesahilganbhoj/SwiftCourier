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

import com.app.dto.BranchDto;
import com.app.service.BranchService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/branch")
public class BranchController {

	@Autowired
	private BranchService branchService;

	@GetMapping("")
	public List<BranchDto> getAllBranches() {
		return branchService.getAllBranches();
	}

	@GetMapping("/{id}")
	public BranchDto getBranchById(@PathVariable Long id) {
		return branchService.getBranchById(id);
	}

	@PostMapping("")
	public BranchDto addBranch(@RequestBody BranchDto branchDTO) {
		return branchService.addBranch(branchDTO);
	}

	@PutMapping("/{id}")
	public BranchDto updateBranch(@PathVariable Long id, @RequestBody BranchDto branchDTO) {
		return branchService.updateBranch(id, branchDTO);
	}

	@DeleteMapping("/{id}")
	public void deleteBranch(@PathVariable Long id) {
		branchService.deleteBranch(id);
	}
}
