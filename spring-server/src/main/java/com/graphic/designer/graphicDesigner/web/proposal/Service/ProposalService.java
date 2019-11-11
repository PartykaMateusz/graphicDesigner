package com.graphic.designer.graphicDesigner.web.proposal.Service;

import com.graphic.designer.graphicDesigner.web.proposal.dto.ProposalDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProposalService {
    ProposalDto addProposal(Long designerId, Long orderId);

    List<ProposalDto> getProposalsByOrder(Long id);

    List<ProposalDto> deleteProposal(Long userId, Long orderId);

    Page<ProposalDto> getProposalsByUser(Long userId, Integer page, Integer size);

    Long getActiveProposalsNumberByUser(Long id);
}
