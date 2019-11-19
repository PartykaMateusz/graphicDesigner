package com.graphic.designer.graphicDesigner.web.proposal.model;

import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Table(name= "proposals")
@Entity
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proposal_id;

    @Column
    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User designer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column
    private Boolean isActive;

    @Column
    private boolean isFinished;

    @Override
    public String toString() {
        return "Proposal{" +
                "proposal_id=" + proposal_id +
                ", time=" + time +
                ", designer=" + designer.getId() +
                ", order=" + order.getId() +
                '}';
    }
}
