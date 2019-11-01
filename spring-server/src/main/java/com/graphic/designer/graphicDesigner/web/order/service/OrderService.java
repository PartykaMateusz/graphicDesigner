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

    List<OrderDto> getAllActiveOrders();

    Page<OrderDto> getPaginatedActiveOrders(Integer page, Integer size);
}
