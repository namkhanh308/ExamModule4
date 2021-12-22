package com.codegym.controller;

import com.codegym.model.National;
import com.codegym.service.national.INationalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/nationals")
@CrossOrigin("*")
public class NationalController {
    @Autowired
    private INationalService nationalService;

    @GetMapping
    public ResponseEntity<Iterable<National>> findAllNationals() {
        return new ResponseEntity<>(nationalService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<National> findNationalById(@PathVariable Long id) {
        return new ResponseEntity<>(nationalService.findById(id).get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<National> save(@RequestBody National national) {
        nationalService.save(national);
        return new ResponseEntity<>(national, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<National> updateNational(@PathVariable Long id, @RequestBody National national) {
        Optional<National> nationalOptional = nationalService.findById(id);
        if (!nationalOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        national.setId(nationalOptional.get().getId());
        nationalService.save(national);
        return new ResponseEntity<>(national, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<National> deleteNational(@PathVariable Long id) {
        Optional<National> nationalOptional = nationalService.findById(id);
        if (!nationalOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        nationalService.remove(id);
        return new ResponseEntity<>(nationalOptional.get(), HttpStatus.NO_CONTENT);
    }
}
