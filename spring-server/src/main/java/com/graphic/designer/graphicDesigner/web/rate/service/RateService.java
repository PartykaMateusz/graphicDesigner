package com.graphic.designer.graphicDesigner.web.rate.service;

import com.graphic.designer.graphicDesigner.web.rate.dto.CreateRateRequest;
import org.springframework.stereotype.Service;
import com.graphic.designer.graphicDesigner.web.rate.dto.RateDto;

@Service
public interface RateService {
    RateDto createRate(CreateRateRequest rateRequest);
}
