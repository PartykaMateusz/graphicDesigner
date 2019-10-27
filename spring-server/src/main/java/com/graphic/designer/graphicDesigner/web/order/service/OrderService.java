package com.graphic.designer.graphicDesigner.web.order.service;

import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.model.Order;
import org.springframework.stereotype.Service;

import java.security.cert.X509CertSelector;

@Service
public interface OrderService {
    OrderDto addOrder(OrderDto orderDto);

    OrderDto convertToOrderDto(Order order);

    OrderDto deleteOrder(Long id);

    OrderDto getOrderById(Long id);
}
