package com.graphic.designer.graphicDesigner.web.job.repository;

import com.graphic.designer.graphicDesigner.web.job.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {

    @Query(value = "select * from job where is_finished !=  true", nativeQuery = true)
    Page<Job> findNotFinished(Pageable returnedPage);
}
