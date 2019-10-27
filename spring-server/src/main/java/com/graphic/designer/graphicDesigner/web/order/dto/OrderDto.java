package com.graphic.designer.graphicDesigner.web.order.dto;

import com.graphic.designer.graphicDesigner.web.Category.dto.CategoryDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class OrderDto {

    private Long id;

    private LocalDateTime date;

    private Long user_id;

    private String subject;

    private String text;

    private Float price;

    private boolean isActive;

    private List<CategoryDto> categoryList;
}
