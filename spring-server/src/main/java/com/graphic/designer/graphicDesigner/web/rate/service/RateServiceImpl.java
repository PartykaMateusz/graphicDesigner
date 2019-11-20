package com.graphic.designer.graphicDesigner.web.rate.service;

import com.graphic.designer.graphicDesigner.exceptions.job.JobException;
import com.graphic.designer.graphicDesigner.exceptions.rate.RateException;
import com.graphic.designer.graphicDesigner.web.job.model.Job;
import com.graphic.designer.graphicDesigner.web.job.repository.JobRepository;
import com.graphic.designer.graphicDesigner.web.rate.dto.CreateRateRequest;
import com.graphic.designer.graphicDesigner.web.rate.dto.RateDto;
import com.graphic.designer.graphicDesigner.web.rate.model.Rate;
import com.graphic.designer.graphicDesigner.web.rate.repository.RateRepository;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.*;

@Service
public class RateServiceImpl implements RateService {

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RateRepository rateRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JobRepository jobRepository;

    @Override
    public RateDto createRate(CreateRateRequest rateRequest) {

        Job job = jobRepository.findById(rateRequest.getJobId())
                .orElseThrow(() -> new JobException(JOB_NOT_EXIST));

        if(job.getRate() != null) {
            throw new RateException(RATE_ALREADY_EXIST);
        }

        User designer = job.getDesigner();

        Rate rate = new Rate();
        rate.setComment(rateRequest.getComment());
        rate.setRate(rateRequest.getRate());
        rate.setDesigner(designer);
        rate.setJob(job);
        job.setRate(rate);

        Rate savedRate = rateRepository.save(rate);
        jobRepository.save(job);

        log.info("rate with id "+savedRate.getId()+" has been created to designer "+designer.getUsername());

        return null;
    }
}
