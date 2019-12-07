package com.graphic.designer.graphicDesigner.web.order.service;

import com.graphic.designer.graphicDesigner.exceptions.order.OrderException;
import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import com.graphic.designer.graphicDesigner.web.Category.Service.CategoryService;
import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.order.repository.OrderRepository;
import com.graphic.designer.graphicDesigner.web.proposal.Service.ProposalService;
import com.graphic.designer.graphicDesigner.web.proposal.repository.ProposalRepository;
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

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private ProposalService proposalService;

    @Override
    public OrderDto addOrder(OrderDto orderDto) {

        User user = userRepository.findById((orderDto.getUser_id()))
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_EXIST));

        Order order = convertToOrderEntity(orderDto);

        order.setDate(LocalDateTime.now());
        order.setUser(user);
        order.setActive(true);
        order.setFinished(false);

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

        log.info("order by id "+order.getId()+" has been removed");

        return convertToOrderDto(orderRepository.save(order));
    }


    @Override
    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new OrderException(ORDER_NOT_EXIST));

        return convertToOrderDto(order);
    }


    @Override
    public Page<OrderDto> getPaginatedActiveOrders(Integer page, Integer size, String search, String sort) {

        Pageable returnedPage = PageRequest.of(page,size, Sort.by("id").descending());

        if(sort!=null){
            returnedPage = PageRequest.of(page,size, this.getSort(sort));
        }

        Page<Order> orders;

        if(search == null) {
            orders = orderRepository.findActive(returnedPage);
        }
        else{
            orders = orderRepository.searchActive(returnedPage,search.toUpperCase());
        }

        return orders.map(this::convertToOrderDto);
    }

    private Sort getSort(String sort) {

        switch(sort){
            case("id") :
                return Sort.by("id");
            case("price-desc") :
                return Sort.by("price").descending();
            case("price") :
                return Sort.by("price");
            default:
                return Sort.by("id").descending();
        }
    }

    @Override
    public Page<OrderDto> getPaginatedActiveOrdersByUser(Integer page, Integer size, Integer userId) {

        Pageable returnedPage = PageRequest.of(page,size, Sort.by("id").descending());

        Page<Order> orders = orderRepository.findActiveByUser(returnedPage, userId);

        return orders.map(this::convertToOrderDto);
    }



    @Override
    public OrderDto updateOrder(Long id, OrderDto orderDto) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new OrderException(ORDER_NOT_EXIST));

        if(orderDto.getSubject() != null) order.setSubject(orderDto.getSubject());
        if(orderDto.getText() != null) order.setText(orderDto.getText());
        if(orderDto.getPrice() != null) order.setPrice(orderDto.getPrice());

        if(orderDto.getIsFinished() != null && orderDto.getIsFinished()){
            order.setFinished(orderDto.getIsFinished());
            proposalService.finishOrderProposals(order.getId());
        }

        log.info("order "+order.getId()+" has been updated");

        return convertToOrderDto(orderRepository.save(order));
    }

    private List<OrderDto> convertToOrderDtoList(List<Order> orders) {
        List<OrderDto> orderDtos = new ArrayList<>();

        for(Order order : orders){
            orderDtos.add(convertToOrderDto(order));
        }

        return orderDtos;
    }

    @Override
    public Order convertToOrderEntity(OrderDto orderDto) {
        Order order = modelMapper.map(orderDto, Order.class);

        order.setCategoryList(null);

        if(orderDto.getCategoryList() != null && !orderDto.getCategoryList().isEmpty()) {
            for(CategoryDto categoryDto : orderDto.getCategoryList()) {
                if(categoryDto.isNew()){
                    Category newCategory = categoryService.addCategory(categoryDto);
                    order.addCategory(newCategory);
                }
                else{
                    order.addCategory(categoryService.findById(categoryDto.getId()));
                }

            }
        }

        return order;
    }

    @Override
    public Long getActiveOrdersNumberByUser(Long id) {
        return orderRepository.findActiveNumberByUser(id);
    }

    @Override
    public Long getAllOrderNumberByUser(Long id) {
        return orderRepository.findAllNumberByUser(id);
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
