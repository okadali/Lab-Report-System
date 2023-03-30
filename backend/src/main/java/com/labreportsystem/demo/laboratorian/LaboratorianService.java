package com.labreportsystem.demo.laboratorian;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaboratorianService {
    private final LaboratorianRepository laboratorianRepository;

    @Autowired
    public LaboratorianService(LaboratorianRepository laboratorianRepository) {
        this.laboratorianRepository = laboratorianRepository;
    }
    public List<Laboratorian> getLaboratorians() {
        return laboratorianRepository.findAll();
    }
    public void createNewLaboratorian(Laboratorian laboratorian) {
        boolean exists = laboratorianRepository.existsById(laboratorian.getId());
        if(exists) {
            throw new IllegalStateException("laboratorian id "+laboratorian.getId()+" is already exists");
        }

        if(laboratorian.getId() != null) {
            if(laboratorian.getId().toString().length() != 7) {
                throw new IllegalStateException("invalid laboratorian id");
            }
        }
        laboratorianRepository.save(laboratorian);
    }
}
