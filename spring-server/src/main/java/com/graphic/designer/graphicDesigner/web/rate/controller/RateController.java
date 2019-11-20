package com.graphic.designer.graphicDesigner.web.rate.controller;

import com.graphic.designer.graphicDesigner.web.rate.dto.CreateRateRequest;
import com.graphic.designer.graphicDesigner.web.rate.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/rate")
public class RateController {

    @Autowired
    private RateService rateService;

    @PostMapping("/")
    public ResponseEntity<?> createRate (@RequestBody  CreateRateRequest rateRequest){
        return new ResponseEntity<>(rateService.createRate(rateRequest), HttpStatus.CREATED);
    }

}
