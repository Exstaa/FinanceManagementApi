package az.hafizrzazade.financemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.hafizrzazade.financemanagement.model.Budget;
import az.hafizrzazade.financemanagement.repository.BudgetRepository;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins="http://127.0.0.1:5500")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @PostMapping
    public ResponseEntity<Budget> addBudget(@RequestBody Budget budget) {
        return new ResponseEntity<>(budgetRepository.save(budget), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
        return budgetRepository.findById(id)
                .map(budget -> new ResponseEntity<>(budget, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        if (budgetRepository.existsById(id)) {
            budgetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}