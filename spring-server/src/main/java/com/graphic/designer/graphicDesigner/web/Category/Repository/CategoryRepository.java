package com.graphic.designer.graphicDesigner.web.Category.Repository;

import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
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

    @Query(value = " SELECT c.id,name, count(name),c.is_active " +
            " FROM category c " +
            " INNER JOIN orders_category_list oc " +
            " ON c.id = oc.category_list " +
            " INNER JOIN orders o " +
            " ON oc.order_id = o.id " +
            " INNER JOIN proposals p " +
            " ON p.order_id = o.id " +
            " WHERE o.user_id = :id " +
            " OR p.user_id = :id" +
            " GROUP BY c.name,c.id " +
            " ORDER BY count DESC " +
            " LIMIT :limit ",
            nativeQuery = true
    )
    List<Category> findFavouriteByUser(Long id, Long limit);
}
