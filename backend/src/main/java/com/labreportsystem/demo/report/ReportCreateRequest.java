package com.labreportsystem.demo.report;

import com.labreportsystem.demo.laboratorian.Laboratorian;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Data
public class ReportCreateRequest {
    private Long id;
    private String name;
    private String surname;
    private Long tcId;
    private String diagnosisTitle;
    private String diagnosisDetail;
    private LocalDate dob;
    private Long laboratorianId;
}
