package com.graphic.designer.graphicDesigner.web.rate.dto;

import com.graphic.designer.graphicDesigner.web.job.dto.JobDto;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonIgnore;

@Data
@NoArgsConstructor
public class RateDto {

    private Long id;

    private Float rate;

    private String comment;

    private UserDto designer;

    //TODO stackOverflowError
//    private JobDto job;
}
