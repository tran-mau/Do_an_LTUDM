package com.myapp.QLCT.repository;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.myapp.QLCT.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Category findByName(String name);
    Optional<Category> findByNameIgnoreCase(String name);

    @Query("SELECT c FROM Category c WHERE c.name = :name")
    Optional<Category> findByName(@Param("name") String name);
    
}
