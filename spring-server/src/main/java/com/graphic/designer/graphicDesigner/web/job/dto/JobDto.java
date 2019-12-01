package com.graphic.designer.graphicDesigner.web.job.dto;

import com.graphic.designer.graphicDesigner.web.order.dto.OrderDto;
import com.graphic.designer.graphicDesigner.web.rate.dto.RateDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class JobDto {

    private Long id;

    private UserDto client;

    private UserDto designer;

    private OrderDto fromOrder;

    private LocalDateTime dateTime;

    private Boolean isFinished;

    //private RateDto rate;

    @Override
    public String toString() {
        return "JobDto{" +
                "id=" + id +
                ", client=" + client +
                ", designer=" + designer +
                ", fromOrder=" + fromOrder +
                ", dateTime=" + dateTime +
                ", isFinished=" + isFinished +
                //", rateId=" + rate.getId() +
                '}';
    }
}
