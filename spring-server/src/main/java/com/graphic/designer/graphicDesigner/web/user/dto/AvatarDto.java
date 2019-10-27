package com.graphic.designer.graphicDesigner.web.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AvatarDto {

    private Long id;

    private String base64;
    private String type;
    private String name;
    private String size;
}
