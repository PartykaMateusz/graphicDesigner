package com.graphic.designer.graphicDesigner.web.order.controller;

import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.Response;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;


    @PostMapping("/")
    public ResponseEntity<?> addOrder(@RequestBody OrderDto orderDto){
        return new ResponseEntity<>(orderService.addOrder(orderDto), HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<?> getActiveOrders(@RequestParam(name = "page",defaultValue = "0") Integer page,
                                             @RequestParam(name = "size",defaultValue = "10") Integer size,
                                             @RequestParam(name = "userId", required = false) Integer userId){
        Page<OrderDto> resultPage;

        if(userId != null){
            resultPage = orderService.getPaginatedActiveOrdersByUser(page, size, userId);
        }
        else{
           resultPage = orderService.getPaginatedActiveOrders(page, size);
        }


        return new ResponseEntity<>(resultPage,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id){
        return new ResponseEntity<>(orderService.getOrderById(id),HttpStatus.OK);
    }
}
