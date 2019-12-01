package com.graphic.designer.graphicDesigner.web.rate.repository;

import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.rate.model.Rate;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface RateRepository extends JpaRepository<Rate,Long> {

    @Query(value = "select AVG(rate) FROM rate WHERE designer_id = :id", nativeQuery = true)
    Float getAverageRateByDesigner(Long id);

    @Query(value = "select * FROM rate WHERE designer_id = :userId", nativeQuery = true)
    Page<Rate> findByUserId(Long userId, Pageable returnedPage);
}
