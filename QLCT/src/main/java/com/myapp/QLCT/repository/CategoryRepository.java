package com.myapp.QLCT.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.myapp.QLCT.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Category findByName(String name);
    
}
