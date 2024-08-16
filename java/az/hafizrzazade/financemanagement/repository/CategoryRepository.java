package az.hafizrzazade.financemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import az.hafizrzazade.financemanagement.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
