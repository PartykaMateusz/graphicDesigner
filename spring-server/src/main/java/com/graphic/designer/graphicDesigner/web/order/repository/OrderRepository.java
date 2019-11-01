package com.graphic.designer.graphicDesigner.web.order.repository;

import com.graphic.designer.graphicDesigner.web.order.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query(
            value = "select * FROM orders o WHERE o.is_active = true",
            nativeQuery = true
    )
    List<Order> getAllActive();

    Page<Order> findAll(Pageable pageable);

}
