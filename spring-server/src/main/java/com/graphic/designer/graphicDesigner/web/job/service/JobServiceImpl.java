package com.graphic.designer.graphicDesigner.web.job.service;

import com.graphic.designer.graphicDesigner.exceptions.job.JobException;
import com.graphic.designer.graphicDesigner.exceptions.order.OrderException;
import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
import com.graphic.designer.graphicDesigner.web.job.dto.CreateJobRequest;
import com.graphic.designer.graphicDesigner.web.job.dto.JobDto;
import com.graphic.designer.graphicDesigner.web.job.model.Job;
import com.graphic.designer.graphicDesigner.web.job.repository.JobRepository;
import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.order.repository.OrderRepository;
import com.graphic.designer.graphicDesigner.web.order.service.OrderService;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import jdk.nashorn.internal.objects.NativeArray;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.*;

@Service
public class JobServiceImpl implements JobService {

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Override
    public JobDto createJob(CreateJobRequest jobRequest) {
        Job job = new Job();

        User client = userRepository.findById(jobRequest.getClientId())
                .orElseThrow(()-> new UsernameNotFoundException(USER_NOT_EXIST));

        User designer = userRepository.findById(jobRequest.getDesignerId())
                .orElseThrow(()-> new UsernameNotFoundException(USER_NOT_EXIST));

        Order order = orderRepository.findById(jobRequest.getOrderId())
                .orElseThrow(() -> new OrderException(ORDER_NOT_EXIST));

        job.setClient(client);
        job.setDesigner(designer);
        job.setFromOrder(order);
        job.setDateTime(LocalDateTime.now());
        job.setFinished(false);

        log.info("job with id "+job.getId()+" was created by user "+client.getId());

        return convertToDto(jobRepository.save(job));

    }

    @Override
    public JobDto findById(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new JobException(JOB_NOT_EXIST));

        JobDto jobDto = convertToDto(job);

        return jobDto;
    }

    @Override
    public Page<JobDto> findJobsByClient(Long id, Integer page, Integer size) {
        Pageable returnedPage = PageRequest.of(page,size, Sort.by("id").descending());

        Page<Job> jobs = jobRepository.findNotFinished(returnedPage);

        return jobs.map(this::convertToDto);
    }

    private JobDto convertToDto(Job job) {
        JobDto jobDto = modelMapper.map(job, JobDto.class);
        if(job.getClient() != null) {
            jobDto.setClient(userService.convertToUserDto(job.getClient()));
        }
        if(job.getDesigner() != null) {
            jobDto.setDesigner(userService.convertToUserDto(job.getDesigner()));
        }
        if(job.getFromOrder() != null) {
            jobDto.setFromOrder(orderService.convertToOrderDto(job.getFromOrder()));
            jobDto.getFromOrder().setUser(null);
        }

        return jobDto;
    }

    private Job convertToEntity(JobDto jobDto) {
        Job job = modelMapper.map(jobDto, Job.class);

        if(jobDto.getClient() != null){
            job.setClient(userService.convertToUserEntity(jobDto.getClient()));
        }
        if(jobDto.getDesigner() != null){
            job.setDesigner(userService.convertToUserEntity(jobDto.getDesigner()));
        }
        if(jobDto.getFromOrder() != null){
            job.setFromOrder(orderService.convertToOrderEntity(jobDto.getFromOrder()));
        }

        return job;
    }
}
