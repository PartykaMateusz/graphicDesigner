package com.graphic.designer.graphicDesigner.web.user.repository;

import com.graphic.designer.graphicDesigner.web.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByLogin(String login);
}
