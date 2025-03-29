package com.example.project2.controller;

import com.example.project2.entity.Kategorie;
import com.example.project2.entity.Produkty;
import com.example.project2.repository.KategorieRepository;
import com.example.project2.repository.ProduktyRepository;
import com.example.project2.service.KategorieService;
import com.example.project2.service.ProduktyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produkty")
@CrossOrigin(origins = "*")
public class ProduktyController {

    private final ProduktyService produktyService;
    private final KategorieService kategorieService;
    private final KategorieRepository kategorieRepository;

    @Autowired
    public ProduktyController(ProduktyService produktyService, KategorieService kategorieService, KategorieRepository kategorieRepository) {
        this.produktyService = produktyService;
        this.kategorieService = kategorieService;
        this.kategorieRepository = kategorieRepository;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Produkty createProdukty(@RequestBody Produkty produkty) {
        return produktyService.createOrUpdateProdukty(produkty);
    }

    @GetMapping
    public ResponseEntity<List<Produkty>> getAllProdukty() {
        List<Produkty> produkty = produktyService.getAllProdukty();
        return new ResponseEntity<>(produkty, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Produkty getProduktyById(@PathVariable Long id) {
        return produktyService.getProduktById(id);
    }

    @PutMapping("/{id}")
    public Produkty updateProdukty(@PathVariable Long id, @RequestBody Produkty produkty) {
        Produkty existingProdukty = produktyService.getProduktById(id);

        existingProdukty.setNazwa(produkty.getNazwa());
        existingProdukty.setOpis(produkty.getOpis());
        existingProdukty.setCena(produkty.getCena());
        existingProdukty.setZdjecie(produkty.getZdjecie());

        if (produkty.getKategoriaId() != null) {
            Kategorie kategoria = kategorieService.getKategoriaById(produkty.getKategoriaId());
            existingProdukty.setKategoria(kategoria);
        }

        return produktyService.createOrUpdateProdukty(existingProdukty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProdukt(@PathVariable Long id) {
        boolean isDeleted = produktyService.deleteProdukt(id);
        return isDeleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

