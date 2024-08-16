package az.hafizrzazade.financemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import az.hafizrzazade.financemanagement.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}