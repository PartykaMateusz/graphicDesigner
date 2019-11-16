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


    @Query(value = "select * from orders where is_active = true AND is_finished !=  true", nativeQuery = true)
    Page<Order> findActive(Pageable pageable);

    @Query(value = "select * from orders where is_active = true and user_id = :userId AND is_finished !=  true", nativeQuery = true)
    Page<Order> findActiveByUser(Pageable returnedPage, Integer userId);

    @Query(value = "select COUNT(id) from orders where user_id = :id and is_active = true AND is_finished != true", nativeQuery = true)
    Long findActiveNumberByUser(Long id);
}
