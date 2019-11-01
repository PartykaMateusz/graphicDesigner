package com.graphic.designer.graphicDesigner.web.order.dto;

import com.graphic.designer.graphicDesigner.web.order.model.Order;
import org.junit.Test;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

import static org.junit.Assert.*;

public class OrderDtoTest {

    private ModelMapper modelMapper = new ModelMapper();

    @Test
    public void whenConvertOrderEntityToOrderDto_thenCorrect() {
        Order order = new Order();
        order.setId(1L);
        order.setPrice(20F);
        order.setActive(true);
        order.setSubject("test5");
        order.setText("test6");
        order.setDate(LocalDateTime.of(2020,1,1,1,1));

        OrderDto orderDto= modelMapper.map(order, OrderDto.class);
        assertEquals(order.getId(), orderDto.getId());
        assertEquals(order.getPrice(), orderDto.getPrice());
        assertEquals(order.isActive(), orderDto.isActive());
        assertEquals(order.getSubject(), orderDto.getSubject());
        assertEquals(order.getText(), orderDto.getText());
        assertEquals(order.getDate(), orderDto.getDate());
    }

    @Test
    public void whenConvertOrderDtoToOrderEntity_thenCorrect() {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(19L);
        orderDto.setPrice(300F);
        orderDto.setActive(false);
        orderDto.setSubject("test10");
        orderDto.setText("test12");
        orderDto.setDate(LocalDateTime.of(2020,1,1,1,1));

        Order order = modelMapper.map(orderDto, Order.class);

        assertEquals(order.getId(), orderDto.getId());
        assertEquals(order.getPrice(), orderDto.getPrice());
        assertEquals(order.isActive(), orderDto.isActive());
        assertEquals(order.getSubject(), orderDto.getSubject());
        assertEquals(order.getText(), orderDto.getText());
        assertEquals(order.getDate(), orderDto.getDate());
    }

}