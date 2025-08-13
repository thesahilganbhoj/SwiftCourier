package com.app.service;

import java.util.List;

import com.app.dto.BranchDto;

public interface BranchService {

	BranchDto addBranch(BranchDto branchDto);

	BranchDto getBranchById(Long id);

	List<BranchDto> getAllBranches();

	BranchDto updateBranch(Long id, BranchDto branchDto);

	void deleteBranch(Long id);

}
