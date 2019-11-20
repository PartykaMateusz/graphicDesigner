package com.graphic.designer.graphicDesigner.web.rate.model;

import com.graphic.designer.graphicDesigner.web.job.model.Job;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@EqualsAndHashCode
@Table(name= "rate")
@Entity
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Float rate;

    @Column
    private String comment;

    @ManyToOne
    @JoinColumn(name="designer_id", nullable=false)
    private User designer;

    @OneToOne
    @JoinColumn(name = "job_id")
    private Job job;
}
