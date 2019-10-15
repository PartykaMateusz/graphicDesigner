package com.graphic.designer.graphicDesigner.web.user.repository;

import com.graphic.designer.graphicDesigner.web.user.model.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar,Long> {
}
