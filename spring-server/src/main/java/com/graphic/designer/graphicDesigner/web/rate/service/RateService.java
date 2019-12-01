package com.graphic.designer.graphicDesigner.web.rate.service;

import com.graphic.designer.graphicDesigner.web.rate.dto.CreateRateRequest;
import org.springframework.stereotype.Service;
import com.graphic.designer.graphicDesigner.web.rate.dto.RateDto;
import org.springframework.data.domain.Page;

@Service
public interface RateService {
    RateDto createRate(CreateRateRequest rateRequest);

    Float getAverageRatingByUser(Long id);

    Page<RateDto> getRatingByUser(Long userId, Integer size, Integer page);
}
