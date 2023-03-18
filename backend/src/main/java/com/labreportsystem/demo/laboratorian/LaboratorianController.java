package com.labreportsystem.demo.laboratorian;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/laboratorians")
public class LaboratorianController {
    private LaboratorianService laboratorianService;

    public LaboratorianController(LaboratorianService laboratorianService) {
        this.laboratorianService = laboratorianService;
    }
    @GetMapping
    public List<Laboratorian> getLaboratorians() {
        return laboratorianService.getLaboratorians();
    }
    @PostMapping
    public void createNewLaboratorian(@RequestBody Laboratorian laboratorian) {
        laboratorianService.createNewLaboratorian(laboratorian);
    }
}
