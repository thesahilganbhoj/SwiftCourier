package com.courier.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.custom_exceptions.ResourceNotFoundException;
import com.courier.dto.CustomerDTO;
import com.courier.entities.Customer;
import com.courier.entities.Feedback;
import com.courier.repository.CustomerRepository;
import com.courier.repository.FeedbackRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private FeedbackRepository feedbackRepo;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void saveFeedback(Feedback feedback) {
        feedbackRepo.save(feedback);
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
}
