package com.graphic.designer.graphicDesigner.web.order.controller;

import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.service.OrderService;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.Response;
import java.security.Principal;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;


    @PostMapping("/")
    public ResponseEntity<?> addOrder(@RequestBody OrderDto orderDto){
        return new ResponseEntity<>(orderService.addOrder(orderDto), HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<?> getActiveOrders(@RequestParam(name = "page",defaultValue = "0") Integer page,
                                             @RequestParam(name = "size",defaultValue = "10") Integer size,
                                             @RequestParam(required = false) String search,
                                             @RequestParam(required = false) String sort,
                                             @RequestParam(name = "userId", required = false) Integer userId){
        Page<OrderDto> resultPage;

        if(userId != null){
            resultPage = orderService.getPaginatedActiveOrdersByUser(page, size, userId);
        }
        else{
           resultPage = orderService.getPaginatedActiveOrders(page, size, search, sort);
        }


        return new ResponseEntity<>(resultPage,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id){
        return new ResponseEntity<>(orderService.getOrderById(id),HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id,
                                         @RequestBody OrderDto orderDto,
                                         Principal principal){

        Long userId = userService.findUserByUsername(principal.getName()).getId();
        Long orderOwner = orderService.getOrderById(id).getUser().getId();

        if(userId.equals(orderOwner)) {
            return new ResponseEntity<>(orderService.updateOrder(id, orderDto),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id,
                                         Principal principal){

        Long userId = userService.findUserByUsername(principal.getName()).getId();
        Long orderOwner = orderService.getOrderById(id).getUser().getId();

        if(userId.equals(orderOwner)) {
            return new ResponseEntity<>(orderService.deleteOrder(id),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
