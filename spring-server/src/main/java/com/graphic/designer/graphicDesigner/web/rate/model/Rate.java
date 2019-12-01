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

    public static class Builder{

        private Float rate;
        private String comment;
        private User designer;
        private Job job;

        public Builder rate(Float rate){
            this.rate = rate;
            return this;
        }
        public Builder comment(String comment){
            this.comment = comment;
            return this;
        }
        public Builder designer(User designer){
            this.designer = designer;
            return this;
        }
        public Builder job(Job job){
            this.job = job;
            return this;
        }

        public Rate build(){
            Rate rate = new Rate();
            rate.setComment(this.comment);
            rate.setRate(this.rate);
            rate.setDesigner(this.designer);
            rate.setJob(this.job);

            return rate;
        }
    }

    @Override
    public String toString() {
        return "Rate{" +
                "id=" + id +
                ", rate=" + rate +
                ", comment='" + comment + '\'' +
                ", designer=" + designer.getId() +
                ", job=" + job.getId() +
                '}';
    }
}
