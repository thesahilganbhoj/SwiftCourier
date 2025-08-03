package com.courier.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.custom_exceptions.ResourceNotFoundException;
import com.courier.dto.CustomerDTO;
import com.courier.entities.Customer;
import com.courier.entities.Feedback;
import com.courier.repository.CustomerRepository;
import com.courier.repository.FeedbackRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private FeedbackRepository feedbackRepo;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    
    @Override
    public CustomerDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));

        return new CustomerDTO(
            customer.getCustomerId(),
            customer.getName(),
            customer.getEmail(),
            customer.getContactNumber(),
            customer.getAddress()
        );
    }
    
    @Override
    public CustomerDTO updateCustomerProfile(Long customerId, CustomerDTO updatedCustomer) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with ID: " + customerId));

        customer.setName(updatedCustomer.getName());
        customer.setEmail(updatedCustomer.getEmail());
        customer.setAddress(updatedCustomer.getAddress());

        Customer saved = customerRepository.save(customer);
        return mapToDTO(saved);
    }

    private CustomerDTO mapToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setCustomerId(customer.getCustomerId());
        dto.setName(customer.getName());
        dto.setEmail(customer.getEmail());
        dto.setAddress(customer.getAddress());
        return dto;
    }
}
