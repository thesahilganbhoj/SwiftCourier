package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AddressDao;
import com.app.dto.AddressDto;
import com.app.pojos.Address;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {
	@Autowired
	private AddressDao addressDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public AddressDto addAddress(AddressDto addressDto) {
		Address address = modelMapper.map(addressDto, Address.class);
		Address addedAddress = addressDao.save(address);
		return modelMapper.map(addedAddress, AddressDto.class);
	}

	@Override
	public AddressDto getAddressById(Long id) {
		Address address = addressDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Address not found"));
		return modelMapper.map(address, AddressDto.class);
	}

	@Override
	public List<AddressDto> getAllAddresses() {
		List<Address> addresses = addressDao.findAll();
		return addresses.stream().map(address -> modelMapper.map(address, AddressDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public AddressDto updateAddress(Long id, AddressDto addressDto) {
		Address address = addressDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Address not found"));
		address = modelMapper.map(addressDto, Address.class);
		address.setAddressId(id);
		Address addedAddress = addressDao.save(address);
		return modelMapper.map(addedAddress, AddressDto.class);
	}

	@Override
	public void deleteAddress(Long id) {
		Address address = addressDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Address not found"));
		addressDao.delete(address);
	}

}
