package com.example.project2.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Produkty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("nazwa")
    private String nazwa;

    @JsonProperty("opis")
    private String opis;

    @JsonProperty("cena")
    private Integer cena;

    @JsonProperty("zdjecie")
    private String zdjecie;

    @ManyToOne
    @JoinColumn(name = "kategoria_id", nullable = false)
    @JsonBackReference
    private Kategorie kategoria;

    @Transient
    @JsonProperty("kategoria_id")
    private Long kategoriaId;

    public Long getKategoriaId() {
        return kategoria != null ? kategoria.getId() : kategoriaId;
    }

    public void setKategoriaId(Long kategoriaId) {
        this.kategoriaId = kategoriaId;
        if (kategoria == null) {
            kategoria = new Kategorie();
        }
        kategoria.setId(kategoriaId);
    }


}
