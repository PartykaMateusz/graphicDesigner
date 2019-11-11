package com.graphic.designer.graphicDesigner.web.proposal.dto;

import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ProposalDto {

    private Long id;

    private LocalDateTime time;

    private UserDto user;

    private OrderDto order;
}
