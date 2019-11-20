package com.graphic.designer.graphicDesigner.web.job.repository;

import com.graphic.designer.graphicDesigner.web.job.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {

    @Query(value = "select * from job where is_finished !=  true AND client_id = :clientId", nativeQuery = true)
    Page<Job> findByClientNotFinished(Pageable returnedPage,Long clientId);

    @Query(value = "select * from job where is_finished !=  true AND designer_id = :designerId", nativeQuery = true)
    Page<Job> findByDesignerNotFinished(Pageable returnedPage,Long designerId);

    @Query(value = "select COUNT(id) from job where (client_id = :id OR designer_id = :id) AND is_finished != true", nativeQuery = true)
    Long getJobsByUserNumber(Long id);

    @Query(value = "select COUNT(id) from job where (client_id = :id OR designer_id = :id) AND is_finished = true", nativeQuery = true)
    Long getFinishedJobsByUserNumber(Long id);
}
