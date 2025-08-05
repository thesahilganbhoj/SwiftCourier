package com.courier.service;

import java.util.List;

import com.courier.dto.CustomerDTO;
import com.courier.dto.CustomerOrderListDTO;
import com.courier.dto.CustomerOrderRespDTO;
import com.courier.dto.PendingOrderDTO;
import com.courier.entities.Feedback;

public interface CustomerService {
	Feedback saveFeedback(Feedback feedback);
    CustomerDTO getCustomerById(Long id);
    CustomerDTO updateCustomerProfile(Long customerId, CustomerDTO updatedCustomer);
    CustomerOrderRespDTO getOrderDetailsById(Long id);
    List<CustomerOrderListDTO> getOrdersByCustomerId(Long customerId);    
    List<PendingOrderDTO> getAllPendingOrders();
    PendingOrderDTO trackOrderByTrackingId(String trackingId);

}
