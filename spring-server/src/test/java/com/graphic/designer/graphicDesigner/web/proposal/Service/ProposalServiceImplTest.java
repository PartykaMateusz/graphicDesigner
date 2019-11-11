package com.graphic.designer.graphicDesigner.web.proposal.Service;

import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.order.repository.OrderRepository;
import com.graphic.designer.graphicDesigner.web.proposal.dto.ProposalDto;
import com.graphic.designer.graphicDesigner.web.proposal.model.Proposal;
import com.graphic.designer.graphicDesigner.web.proposal.repository.ProposalRepository;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProposalServiceImplTest {

    @Autowired
    ProposalService proposalService;

    @MockBean
    ProposalRepository proposalRepository;

    @MockBean
    OrderRepository orderRepository;

    @MockBean
    UserRepository userRepository;

    @Test
    public void addProposal() {
        User designer = this.generateUser();
        Order order = this.generateOrder();
        Proposal proposal = this.generateProposal();

        proposal.setOrder(order);
        proposal.setDesigner(designer);

        proposal.setProposal_id(10L);

        when(userRepository.findById(designer.getId())).thenReturn(Optional.of(designer));
        when(orderRepository.findById(order.getId())).thenReturn(Optional.of(order));
        when(proposalRepository.save(any(Proposal.class))).thenReturn(proposal);

        ProposalDto returnedProposal = proposalService.addProposal(designer.getId(),order.getId());

        assertEquals(proposal.getDesigner().getId(),returnedProposal.getUser().getId());


    }

    private Proposal generateProposal() {
        Proposal proposal = new Proposal();

        proposal.setIsActive(true);
        proposal.setTime(LocalDateTime.now());

        return proposal;
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
        order.setPrice(100F);
        order.setDate(LocalDateTime.now());

        return order;

    }
}