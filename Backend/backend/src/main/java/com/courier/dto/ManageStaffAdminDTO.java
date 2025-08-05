package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ManageStaffAdminDTO {

    private Long staffId;
    private String staffName;
    private Boolean isAvailable;
}




