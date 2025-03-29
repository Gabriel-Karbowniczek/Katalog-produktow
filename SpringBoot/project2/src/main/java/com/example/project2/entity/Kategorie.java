package com.example.project2.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Kategorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("nazwa")
    private String nazwa;

    @JsonProperty("adres_sklepu")
    private String adres_sklepu;

    @JsonProperty("czy_mozliwa_rezerwacja")
    private String czy_mozliwa_rezerwacja;

    @OneToMany(mappedBy = "kategoria", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Produkty> produkty = new ArrayList<>();
}
