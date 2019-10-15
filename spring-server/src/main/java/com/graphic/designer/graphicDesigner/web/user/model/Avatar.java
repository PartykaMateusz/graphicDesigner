package com.graphic.designer.graphicDesigner.web.user.model;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Data
@Entity
@Table
public class Avatar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long avatar_id;

    @Column(length = 1024)
    @Type(type="text")
    private String base64;

    @Column
    private String name;

    @Column
    private String size;

    @Column
    private String type;

    @OneToOne
    private User user_id;
}
