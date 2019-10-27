package com.graphic.designer.graphicDesigner.web.Category.Repository;

import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
}
