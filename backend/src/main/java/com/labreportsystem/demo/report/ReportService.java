package com.labreportsystem.demo.report;

import com.labreportsystem.demo.laboratorian.Laboratorian;
import com.labreportsystem.demo.laboratorian.LaboratorianRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final LaboratorianRepository laboratorianRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository,LaboratorianRepository laboratorianRepository) {
        this.reportRepository = reportRepository;
        this.laboratorianRepository = laboratorianRepository;
    }

    public List<Report> getReports() {
        return reportRepository.findAll();
    }

    public Report createNewReport(ReportCreateRequest reportCreateRequest) {
        Optional<Laboratorian> laboratorian = laboratorianRepository.findById(reportCreateRequest.getLaboratorianId());
        if(!laboratorian.isPresent()) {
            throw new IllegalStateException("laboratorian id "+reportCreateRequest.getLaboratorianId()+" does not exists");
        }

        boolean exists = reportRepository.existsById(reportCreateRequest.getId());
        if(exists) {
            throw new IllegalStateException("report id "+reportCreateRequest.getId()+" already exists");
        }



        Report toSave = new Report();


        toSave.setImage(reportCreateRequest.getImage());
        toSave.setId(reportCreateRequest.getId());
        toSave.setName(reportCreateRequest.getName());
        toSave.setSurname(reportCreateRequest.getSurname());
        toSave.setTcId(reportCreateRequest.getTcId());
        toSave.setDiagnosisTitle(reportCreateRequest.getDiagnosisTitle());
        toSave.setDiagnosisDetail(reportCreateRequest.getDiagnosisDetail());
        toSave.setDob(reportCreateRequest.getDob());
        toSave.setLaboratorian(laboratorian.get());
        return reportRepository.save(toSave);
    }

    public void deleteReport(Long reportId) {
        boolean exists = reportRepository.existsById(reportId);
        if(!exists) {
            throw new IllegalStateException("report id "+reportId+" does not exists");
        }
        reportRepository.deleteById(reportId);
    }

    @Transactional
    public void updateReport(Long reportId, ReportUpdateRequest reportUpdateRequest) {
        Report report = reportRepository.findById(reportId).orElseThrow(() -> new IllegalStateException("report id "+reportId+" does not exists"));

        if(!report.getName().equals(reportUpdateRequest.getName())) report.setName(reportUpdateRequest.getName());
        if(!report.getSurname().equals(reportUpdateRequest.getSurname())) report.setSurname(reportUpdateRequest.getSurname());
        if(report.getTcId() != reportUpdateRequest.getTcId()) report.setTcId(reportUpdateRequest.getTcId());
        if(!report.getDiagnosisTitle().equals(reportUpdateRequest.getDiagnosisTitle())) report.setDiagnosisTitle(reportUpdateRequest.getDiagnosisTitle());
        if(!report.getDiagnosisDetail().equals(reportUpdateRequest.getDiagnosisDetail())) report.setDiagnosisDetail(reportUpdateRequest.getDiagnosisDetail());
        if(!report.toString().equals(reportUpdateRequest.getDob().toString())) report.setDob(reportUpdateRequest.getDob());
        if(!report.getImage().equals(reportUpdateRequest.getImage())) report.setImage(reportUpdateRequest.getImage());
    }
}
