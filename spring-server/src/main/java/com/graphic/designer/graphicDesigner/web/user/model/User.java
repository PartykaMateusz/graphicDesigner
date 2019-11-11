package com.graphic.designer.graphicDesigner.web.user.model;


import com.graphic.designer.graphicDesigner.web.role.model.Role;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode
@Table(name= "users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private String telNumber;

    @Column
    private LocalDateTime registerDate;

    @ManyToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private List<Role> roles;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "avatar_id", referencedColumnName = "avatar_id")
    private Avatar avatar;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", telNumber='" + telNumber + '\'' +
                ", registerDate=" + registerDate +
                '}';
    }
}
