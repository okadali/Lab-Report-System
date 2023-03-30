package com.labreportsystem.demo.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/reports")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {this.reportService = reportService;}

    @GetMapping
    public List<Report> getReports() {return reportService.getReports();}

    @PostMapping
    public Report createNewReport(@RequestBody ReportCreateRequest reportCreateRequest) {
        return reportService.createNewReport(reportCreateRequest);
    }

    @PutMapping(path = "{reportId}")
    public void updateReportImage(@PathVariable("reportId") Long reportId,@RequestBody ReportUpdateRequest reportUpdateRequest) {
        reportService.updateReport(reportId,reportUpdateRequest);
    }

    @DeleteMapping(path = "{reportId}")
    public void deleteReport(@PathVariable Long reportId) {reportService.deleteReport(reportId);}
}
