package com.graphic.designer.graphicDesigner.web.proposal.dto;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddProposalRequest {

    @NotNull
    private Long designerId;

    @NotNull
    private Long orderId;
}
