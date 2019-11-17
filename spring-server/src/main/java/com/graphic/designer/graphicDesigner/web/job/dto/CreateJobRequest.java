package com.graphic.designer.graphicDesigner.web.job.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateJobRequest {

    private Long clientId;
    private Long designerId;

    private Long orderId;
}
