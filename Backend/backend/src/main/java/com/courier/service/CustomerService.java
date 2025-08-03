package com.courier.service;

import com.courier.dto.CustomerDTO;
import com.courier.entities.Feedback;

public interface CustomerService {
    void saveFeedback(Feedback feedback);
    CustomerDTO getCustomerById(Long id);
}
