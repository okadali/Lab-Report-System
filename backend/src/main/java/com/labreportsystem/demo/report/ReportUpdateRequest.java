package com.labreportsystem.demo.report;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReportUpdateRequest {
    private String name;
    private String surname;
    private Long tcId;
    private String diagnosisTitle;
    private String diagnosisDetail;
    private LocalDate dob;
    private String image;
}
