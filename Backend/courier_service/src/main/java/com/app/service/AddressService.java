package com.app.service;

import java.util.List;

import com.app.dto.AddressDto;

public interface AddressService {

	AddressDto addAddress(AddressDto addressDto);

	AddressDto getAddressById(Long id);

	List<AddressDto> getAllAddresses();

	AddressDto updateAddress(Long id, AddressDto addressDto);

	void deleteAddress(Long id);

}
