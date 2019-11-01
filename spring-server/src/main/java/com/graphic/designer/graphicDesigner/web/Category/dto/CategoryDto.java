package com.graphic.designer.graphicDesigner.web.Category.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryDto {

    private Long id;

    private String name;

    private boolean isActive;
}
