package com.labreportsystem.demo.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/reports")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {this.reportService = reportService;}

    @GetMapping
    public List<Report> getReports() {return reportService.getReports();}

    @PostMapping
    public void createNewReport(@RequestBody ReportCreateRequest reportCreateRequest) {reportService.createNewReport(reportCreateRequest);}

    @PutMapping(path = "{reportId}")
    public void updateReport(
            @PathVariable("reportId") Long reportId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) Long tcId,
            @RequestParam(required = false) String diagnosisTitle,
            @RequestParam(required = false) String diagnosisDetail,
            @RequestParam(required = false) LocalDate dob
    ) {
        reportService.updateReport(reportId,name,surname,tcId,diagnosisTitle,diagnosisDetail,dob);
    }

    @DeleteMapping(path = "{reportId}")
    public void deleteReport(@PathVariable Long reportId) {reportService.deleteReport(reportId);}
}
