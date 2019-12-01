package com.graphic.designer.graphicDesigner.web.order.model;

import com.graphic.designer.graphicDesigner.web.Category.Model.Category;
import com.graphic.designer.graphicDesigner.web.proposal.model.Proposal;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode
@Table(name= "orders")
@Entity
public class Order {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @DateTimeFormat(pattern = "dd-mm-yyyy")
    private LocalDateTime date;

    @Column
    private String subject;

    @Column
    private String text;

    @Column
    private Float price;

    @Column
    private boolean isActive;

    @Column
    private boolean isFinished;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false, updatable=false)
    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Category> categoryList;

    public void addCategory(Category category) {
        if(this.categoryList == null){
            this.categoryList = new ArrayList<>();
        }

        categoryList.add(category);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", date=" + date +
                ", subject='" + subject + '\'' +
                ", text='" + text + '\'' +
                ", price=" + price +
                ", isActive=" + isActive +

                '}';
    }
}
