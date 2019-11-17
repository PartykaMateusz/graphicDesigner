package com.graphic.designer.graphicDesigner.web.job.repository;

import com.graphic.designer.graphicDesigner.web.job.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
}
