package com.labreportsystem.demo.laboratorian;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="laboratorian")
@Data
public class Laboratorian {
    @Id
    private Long id;
    private String name;
    private String surname;
    private int userType;
}
