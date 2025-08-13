package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.BranchDao;
import com.app.dto.BranchDto;
import com.app.pojos.Address;
import com.app.pojos.Branch;

@Service
@Transactional
public class BranchServiceImpl implements BranchService {
	@Autowired
	private BranchDao branchDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public BranchDto addBranch(BranchDto branchDto) {
		Branch branch = modelMapper.map(branchDto, Branch.class);
		branch.setAddressId(modelMapper.map(branchDto.getAddressId(),Address.class));
		Branch addedBranch = branchDao.save(branch);
		return modelMapper.map(addedBranch, BranchDto.class);
	}

	@Override
	public BranchDto getBranchById(Long id) {
		Branch branch = branchDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Branch not found"));
		return modelMapper.map(branch, BranchDto.class);
	}

	@Override
	public List<BranchDto> getAllBranches() {
		List<Branch> branches = branchDao.findAll();
		return branches.stream().map(branch -> modelMapper.map(branch, BranchDto.class)).collect(Collectors.toList());
	}

	@Override
	public BranchDto updateBranch(Long id, BranchDto branchDto) {
		Branch branch = branchDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Branch not found"));
//		branch = modelMapper.map(branchDto, Branch.class);
//		branch.setBranchId(id);
//		Branch addedBranch = branchDao.save(branch);
//		return modelMapper.map(addedBranch, BranchDto.class);
		
		branch.setBranchName(branchDto.getBranchName());
		branch.setEmail(branchDto.getEmail());
		branch.setPhone(branchDto.getPhone());
		
		branch.getAddressId().setCity(branchDto.getAddressId().getCity());
		branch.getAddressId().setCountry(branchDto.getAddressId().getCountry());
		branch.getAddressId().setState(branchDto.getAddressId().getState());
		branch.getAddressId().setPostalCode(branchDto.getAddressId().getPostalCode());
		branch.getAddressId().setAddress(branchDto.getAddressId().getAddress());
		branch.getAddressId().setAddress2(branchDto.getAddressId().getAddress2());
		Branch updatedBranch = branchDao.save(branch);
		return modelMapper.map(updatedBranch, BranchDto.class);
	}

	@Override
	public void deleteBranch(Long id) {
		Branch branch = branchDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Branch not found"));
		branchDao.delete(branch);
	}

}
