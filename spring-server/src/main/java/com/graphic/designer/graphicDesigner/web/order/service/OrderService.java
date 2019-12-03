package com.graphic.designer.graphicDesigner.web.order.service;

import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    OrderDto addOrder(OrderDto orderDto);

    OrderDto convertToOrderDto(Order order);

    OrderDto deleteOrder(Long id);

    OrderDto getOrderById(Long id);

    Page<OrderDto> getPaginatedActiveOrders(Integer page, Integer size, String search,String sort);

    Page<OrderDto> getPaginatedActiveOrdersByUser(Integer page, Integer size, Integer userId);

    Long getActiveOrdersNumberByUser(Long id);

    OrderDto updateOrder(Long id, OrderDto orderDto);

    Order convertToOrderEntity(OrderDto orderDto);

    Long getAllOrderNumberByUser(Long id);
}
