package com.graphic.designer.graphicDesigner.web.role.repository;

import com.graphic.designer.graphicDesigner.web.role.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByName(String role_user);
}
