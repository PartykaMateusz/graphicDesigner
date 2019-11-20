package com.graphic.designer.graphicDesigner.web.rate.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class CreateRateRequest {

    @NotNull
    @NotEmpty
    private Long jobId;

    @NotNull
    @NotEmpty
    @Min(0)
    @Max(10)
    private Float rate;

    private String comment;
}
