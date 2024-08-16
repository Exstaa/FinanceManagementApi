package az.hafizrzazade.financemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import az.hafizrzazade.financemanagement.model.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Long>{

}
