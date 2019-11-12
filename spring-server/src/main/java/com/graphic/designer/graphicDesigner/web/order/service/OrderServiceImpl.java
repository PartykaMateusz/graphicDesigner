package com.graphic.designer.graphicDesigner.web.order.service;

import com.graphic.designer.graphicDesigner.exceptions.order.OrderException;
import com.graphic.designer.graphicDesigner.web.Category.Service.CategoryService;
import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.order.repository.OrderRepository;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
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
import java.util.ArrayList;
import java.util.List;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.ORDER_NOT_EXIST;
import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.USER_NOT_EXIST;

@Service
public class OrderServiceImpl implements OrderService {

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Override
    public OrderDto addOrder(OrderDto orderDto) {

        User user = userRepository.findById((orderDto.getUser_id()))
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_EXIST));

        Order order = convertToOrderEntity(orderDto);

        order.setDate(LocalDateTime.now());
        order.setUser(user);
        order.setActive(true);

        if(order.getPrice()==null){
            order.setPrice(0F);
        }

        Order savedOrder = orderRepository.save(order);

        log.info("Order with id "+savedOrder.getId()+", subject: "+savedOrder.getSubject()+" was created by user with id: "+user.getId());

        return convertToOrderDto(savedOrder);
    }

    @Override
    public OrderDto deleteOrder(Long id){
        Order order = orderRepository.findById(id).orElseThrow(() -> new OrderException(ORDER_NOT_EXIST));

        order.setActive(false);
        return convertToOrderDto(orderRepository.save(order));
    }


    @Override
    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new OrderException(ORDER_NOT_EXIST));

        return convertToOrderDto(order);
    }


    @Override
    public Page<OrderDto> getPaginatedActiveOrders(Integer page, Integer size) {

        Pageable returnedPage = PageRequest.of(page,size, Sort.by("id").descending());

        Page<Order> orders = orderRepository.findActive(returnedPage);

        return orders.map(this::convertToOrderDto);
    }

    @Override
    public Page<OrderDto> getPaginatedActiveOrdersByUser(Integer page, Integer size, Integer userId) {

        Pageable returnedPage = PageRequest.of(page,size, Sort.by("id").descending());

        Page<Order> orders = orderRepository.findActiveByUser(returnedPage, userId);

        return orders.map(this::convertToOrderDto);
    }

    @Override
    public Long getActiveOrdersNumberByUser(Long id) {
        return orderRepository.findActiveNumberByUser(id);
    }

    @Override
    public OrderDto updateOrder(Long id, OrderDto orderDto) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new OrderException(ORDER_NOT_EXIST));

        order.setSubject(orderDto.getSubject());
        order.setText(orderDto.getText());
        order.setPrice(orderDto.getPrice());

        log.info("order "+order.getId()+" updated");

        return convertToOrderDto(orderRepository.save(order));
    }

    private List<OrderDto> convertToOrderDtoList(List<Order> orders) {
        List<OrderDto> orderDtos = new ArrayList<>();

        for(Order order : orders){
            orderDtos.add(convertToOrderDto(order));
        }

        return orderDtos;
    }


    private Order convertToOrderEntity(OrderDto orderDto) {
        Order order = modelMapper.map(orderDto, Order.class);

        order.setCategoryList(null);

        if(orderDto.getCategoryList() != null && !orderDto.getCategoryList().isEmpty()) {
            for(CategoryDto categoryDto : orderDto.getCategoryList()) {
                order.addCategory(categoryService.findById(categoryDto.getId()));
            }
        }

        return order;
    }

    @Override
    public OrderDto convertToOrderDto(Order order) {
        OrderDto orderDto = modelMapper.map(order, OrderDto.class);
        if(order.getUser() != null) {
            orderDto.setUser(userService.convertToUserDto(order.getUser()));
        }

        return orderDto;
    }

}
