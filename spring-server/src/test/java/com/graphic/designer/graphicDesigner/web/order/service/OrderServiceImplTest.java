package com.graphic.designer.graphicDesigner.web.order.service;

import com.graphic.designer.graphicDesigner.exceptions.order.OrderException;
import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import com.graphic.designer.graphicDesigner.web.Category.Repository.CategoryRepository;
import com.graphic.designer.graphicDesigner.web.Category.Service.CategoryService;
import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.order.repository.OrderRepository;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;



@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderServiceImplTest {

    @Autowired
    private OrderService orderService;

    @MockBean
    private OrderRepository orderRepository;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private CategoryRepository categoryRepository;

    @Test
    public void addOrder() {
        User user = this.generateUser();
        Order order = this.generateOrder();
        order.setCategoryList(this.generateCategoryList());
        order.setUser(user);

        OrderDto orderDto = orderService.convertToOrderDto(order);

        when(userRepository.findById(orderDto.getUser_id())).thenReturn(Optional.of(user));
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(order.getCategoryList().get(0)));

        //Order returnedOrder = this.generateReturnedOrder(Order order);

        when(orderRepository.save(order)).thenReturn(order);

        OrderDto returnedOrderDto = orderService.addOrder(orderDto);
        assertEquals(returnedOrderDto.getSubject(),order.getSubject());
        assertTrue(returnedOrderDto.isActive());
    }
//
//    private Order generateReturnedOrder(order) {
//    }

    private List<Category> generateCategoryList() {
        List<Category> categories = new ArrayList<>();

        Category category = new Category();
        category.setId(1l);
        category.setName("test");
        category.setActive(true);

        categories.add(category);

        return categories;
    }



    @Test
    public void addOrderWhereUserIsNotExist() {
        User user = this.generateUser();
        Order order = this.generateOrder();

        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,()->orderService.addOrder(orderService.convertToOrderDto(order)));
    }



    @Test
    public void getOrderById(){
        Order order = this.generateOrder();
        order.setId(1L);

        when(orderRepository.findById(order.getId())).thenReturn(Optional.of(order));

        assertEquals(orderService.getOrderById(order.getId()).getSubject(),order.getSubject());
    }

    @Test
    public void deleteOrder(){
        Order order = this.generateOrder();
        order.setId(1l);
        order.setActive(true);

        when(orderRepository.findById(order.getId())).thenReturn(Optional.of(order));
        when(orderRepository.save(order)).thenReturn(order);

        OrderDto deletedOrder = orderService.deleteOrder(order.getId());

        assertEquals(deletedOrder.getSubject(),order.getSubject());
        assertFalse(deletedOrder.isActive());
    }

    @Test
    public void deleteOrderWhereOrderNotExist(){

        when(orderRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(OrderException.class, () -> orderService.deleteOrder(1L));
    }


    private User generateUser() {
        User user = new User();
        user.setId(1L);
        user.setUsername("test");
        user.setPassword("test");
        user.setEmail("test");
        return user;
    }

    private Order generateOrder() {
        Order order = new Order();

        order.setId(1L);
        order.setText("test");
        order.setSubject("test");
        order.setPrice(100L);
        order.setDate(LocalDateTime.now());

        return order;

    }
}