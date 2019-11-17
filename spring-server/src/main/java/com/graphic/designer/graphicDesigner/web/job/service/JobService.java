package com.graphic.designer.graphicDesigner.web.job.service;

import com.graphic.designer.graphicDesigner.web.job.dto.CreateJobRequest;
import com.graphic.designer.graphicDesigner.web.job.dto.JobDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface JobService {

    JobDto createJob(CreateJobRequest jobRequest);

    JobDto findById(Long id);

    Page<JobDto> findJobsByClient(Long id, Integer page, Integer size);
}
