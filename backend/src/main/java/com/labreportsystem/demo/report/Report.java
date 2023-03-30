package com.labreportsystem.demo.report;

import com.labreportsystem.demo.laboratorian.Laboratorian;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;


//Dosya numarası, Hasta Ad ve Soyad, Hasta Kimlik Numarası(TC),
//Koyulan Tanı Başlığı, Tanı Detayları, Raporun Verildiği Tarih, Fiziksel Rapora Ait .png/.jpg formatında Bir Adet Fotoğraf
@Entity
@Table(name="report")
@Data
public class Report {
    @Id
    private Long id;
    private String name;
    private String surname;
    private Long tcId;
    private String diagnosisTitle;
    private String diagnosisDetail;
    private LocalDate dob;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="laboratorian_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Laboratorian laboratorian;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;
}
