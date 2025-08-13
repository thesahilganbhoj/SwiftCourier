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

import com.app.dto.AddressDto;
import com.app.service.AddressService;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/address")
public class AddressController {

	@Autowired
	private AddressService addressService;

	@GetMapping("")
	public List<AddressDto> getAllAddresses() {
		return addressService.getAllAddresses();
	}

	@GetMapping("/{id}")
	public AddressDto getAddressById(@PathVariable Long id) {
		return addressService.getAddressById(id);
	}

	@PostMapping("")
	public AddressDto addAddress(@RequestBody AddressDto addressDTO) {
		return addressService.addAddress(addressDTO);
	}

	@PutMapping("/{id}")
	public AddressDto updateAddress(@PathVariable Long id, @RequestBody AddressDto addressDTO) {
		return addressService.updateAddress(id, addressDTO);
	}

	@DeleteMapping("/{id}")
	public void deleteAddress(@PathVariable Long id) {
		addressService.deleteAddress(id);
	}
}
