package com.graphic.designer.graphicDesigner.web.Category.Repository;

import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Query(
            value = "SELECT * FROM category c WHERE c.is_active = true",
            nativeQuery = true)
    List<Category> findAllActive();
}
