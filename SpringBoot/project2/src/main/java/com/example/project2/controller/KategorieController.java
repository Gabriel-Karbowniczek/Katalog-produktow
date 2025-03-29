package com.example.project2.controller;

import com.example.project2.entity.Kategorie;
import com.example.project2.entity.Produkty;
import com.example.project2.repository.KategorieRepository;
import com.example.project2.service.KategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/kategorie")
@CrossOrigin(origins = "http://localhost:4200")
public class KategorieController {

    private final KategorieService kategorieService;
    private  final KategorieRepository kategorieRepository;

    @Autowired
    public KategorieController(KategorieService kategorieService,KategorieRepository kategorieRepository) {
        this.kategorieService = kategorieService;
        this.kategorieRepository = kategorieRepository;
    }

    @PostMapping
    public ResponseEntity<Kategorie> createKategorie(@RequestBody Kategorie kategorie) {
        Kategorie saveKategoria = kategorieService.saveKategoria(kategorie);
        return new ResponseEntity<>(saveKategoria, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Kategorie>> getAllKategorie() {
        List<Kategorie> kategorie = kategorieService.getAllKategorie();
        return new ResponseEntity<>(kategorie, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Kategorie getKategoriaById(@PathVariable Long id) {
        return kategorieService.getKategoriaById(id);
    }

    @PostMapping("/id")
    public ResponseEntity<List<Kategorie>> getKategoriaById(@RequestBody List<Long> kategoriaId) {
        List<Kategorie> kategorie = kategorieService.getKategoriaById(kategoriaId);
        return ResponseEntity.ok(kategorie != null ? kategorie : new ArrayList<>());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kategorie> updateKategorie(@PathVariable Long id, @RequestBody Kategorie kategoriaDetails) {
        Kategorie updatedKategoria = kategorieService.updateKategorie(id, kategoriaDetails);
        return kategoriaDetails != null ? new ResponseEntity<>(updatedKategoria, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKategorie(@PathVariable Long id) {
        boolean isDeleted = kategorieService.deleteKategorie(id);
        return isDeleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
