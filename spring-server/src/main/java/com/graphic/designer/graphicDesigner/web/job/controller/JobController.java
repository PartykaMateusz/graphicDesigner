package com.graphic.designer.graphicDesigner.web.job.controller;

import com.graphic.designer.graphicDesigner.web.job.dto.CreateJobRequest;
import com.graphic.designer.graphicDesigner.web.job.dto.JobDto;
import com.graphic.designer.graphicDesigner.web.job.dto.JobUpdateRequest;
import com.graphic.designer.graphicDesigner.web.job.service.JobService;
import com.graphic.designer.graphicDesigner.web.order.service.OrderService;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.security.Principal;

@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/")
    public ResponseEntity<?> createJob(@RequestBody @Valid CreateJobRequest jobRequest,
                                       Principal principal){

        Long userId = userService.findUserByUsername(principal.getName()).getId();
        Long orderOwner = orderService.getOrderById(jobRequest.getClientId()).getUser().getId();

        if(userId.equals(orderOwner)) {
            return new ResponseEntity<>(jobService.createJob(jobRequest), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id){
        return new ResponseEntity<>(jobService.findById(id),HttpStatus.OK);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<?> getJobsByClient(@PathVariable Long id,
                                             @RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "10") Integer size){

        return new ResponseEntity<>(jobService.findJobsByClient(id,page,size),HttpStatus.OK);
    }

    @GetMapping("/designer/{id}")
    public ResponseEntity<?> getJobsByDesigner(@PathVariable Long id,
                                             @RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "10") Integer size){

        return new ResponseEntity<>(jobService.findJobsByDesigner(id,page,size),HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id,
                                       @RequestBody JobUpdateRequest jobRequest,
                                       Principal principal){

        Long userId = userService.findUserByUsername(principal.getName()).getId();
        Long jobOwner = jobService.findById(id).getClient().getId();

        if(userId.equals(jobOwner)) {
            return new ResponseEntity<>(jobService.updateJob(id, jobRequest), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
