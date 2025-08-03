package com.courier.service;

import com.courier.dto.CustomerDTO;
import com.courier.entities.Feedback;

public interface CustomerService {
	Feedback saveFeedback(Feedback feedback);
    CustomerDTO getCustomerById(Long id);
    CustomerDTO updateCustomerProfile(Long customerId, CustomerDTO updatedCustomer);
    
}
