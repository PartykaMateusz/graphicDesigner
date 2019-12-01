package com.graphic.designer.graphicDesigner.web.rate.controller;

import com.graphic.designer.graphicDesigner.web.rate.dto.CreateRateRequest;
import com.graphic.designer.graphicDesigner.web.rate.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/rate")
public class RateController {

    @Autowired
    private RateService rateService;

    @PostMapping("/")
    public ResponseEntity<?> createRate (@RequestBody CreateRateRequest rateRequest){
        return new ResponseEntity<>(rateService.createRate(rateRequest), HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getRateByUserId(@PathVariable Long userId,
                                             @RequestParam(defaultValue = "10") Integer size,
                                             @RequestParam(defaultValue = "0") Integer page){
        return new ResponseEntity<>(rateService.getRatingByUser(userId,size,page),HttpStatus.OK);
    }

}
