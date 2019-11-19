package com.graphic.designer.graphicDesigner.web.proposal.Service;

import com.graphic.designer.graphicDesigner.exceptions.order.OrderException;
import com.graphic.designer.graphicDesigner.exceptions.proposal.ProposalException;
import com.graphic.designer.graphicDesigner.web.order.model.Order;
import com.graphic.designer.graphicDesigner.web.order.repository.OrderRepository;
import com.graphic.designer.graphicDesigner.web.proposal.dto.ProposalDto;
import com.graphic.designer.graphicDesigner.web.proposal.model.Proposal;
import com.graphic.designer.graphicDesigner.web.proposal.repository.ProposalRepository;
import com.graphic.designer.graphicDesigner.web.user.model.User;
import com.graphic.designer.graphicDesigner.web.user.repository.UserRepository;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import static com.graphic.designer.graphicDesigner.constants.ErrorConstants.*;

@Service
public class ProposalServiceImpl implements ProposalService {

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserService userService;

    @Override
    public ProposalDto addProposal(Long designerId, Long orderId) {

        if(isProposalExist(designerId,orderId)){
            throw new ProposalException(PROPOSAL_ALREADY_EXIST);
        }

        Proposal proposal = new Proposal();

        User designer = userRepository.findById(designerId)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_EXIST));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderException(ORDER_NOT_EXIST));

        proposal.setDesigner(designer);
        proposal.setOrder(order);
        proposal.setTime(LocalDateTime.now());
        proposal.setIsActive(true);
        proposal.setFinished(false);

        Proposal savedProposal = proposalRepository.save(proposal);

        log.info("proposal "+savedProposal.getProposal_id()
                +" is created to order: "
                +savedProposal.getOrder().getId()
                +" by User "
                +savedProposal.getDesigner().getId());

        return convertToProposalDto(savedProposal);

    }

    private boolean isProposalExist(Long designerId, Long orderId) {
        List<Proposal> proposal = proposalRepository.findByUserAndOrder(designerId,orderId);

        if(proposal.size() > 0) return true;
        else return false;
    }

    @Override
    public Page<ProposalDto> getProposalsByOrder(Long id, Integer page, Integer size) {

        Pageable returnedPage = PageRequest.of(page,size, Sort.by("proposal_id").descending());

        Page<Proposal> proposals = proposalRepository.findActiveByOrder(returnedPage, id);

        return proposals.map(this::convertToProposalDto);
    }

    @Override
    public Page<ProposalDto> getProposalsByUser(Long userId, Integer page, Integer size) {

        Pageable returnedPage = PageRequest.of(page,size, Sort.by("proposal_id").descending());

        Page<Proposal> proposals = proposalRepository.findActiveByUser(returnedPage, userId);

        return proposals.map(this::convertToProposalDto);
    }



    @Override
    public Long getActiveProposalsNumberByUser(Long id) {
        return proposalRepository.findActiveNumberByUser(id);
    }



    @Override
    public Long getAllProposalNumberByUser(Long id) {
        return proposalRepository.findAllNumberByUser(id);
    }

    @Override
    public void finishOrderProposals(Long id) {
        List<Proposal> proposals = proposalRepository.findActiveByOrder(id);

        for(Proposal proposal : proposals){
            proposal.setFinished(true);
        }

        proposalRepository.saveAll(proposals);
    }


    @Override
    public List<ProposalDto> deleteProposal(Long userId, Long orderId) {
        List<Proposal> proposals = proposalRepository.findByUserAndOrder(userId,orderId);

        List<Proposal> disabledProposals = proposals.stream().peek(p->p.setIsActive(false)).collect(Collectors.toList());

        List<Proposal> savedProposal =  proposalRepository.saveAll(disabledProposals);

        savedProposal.forEach(x -> log.info("proposal with id: "+x.getProposal_id()+" disabled "));

        return convertToProposalDtoList(savedProposal);
    }


    private List<ProposalDto> convertToProposalDtoList(List<Proposal> proposals) {
        List<ProposalDto> proposalDtos = new ArrayList<>();

        for(Proposal proposal : proposals){
            proposalDtos.add(convertToProposalDto(proposal));
        }

        return proposalDtos;
    }

    private ProposalDto convertToProposalDto(Proposal proposal) {
        ProposalDto proposalDto = modelMapper.map(proposal, ProposalDto.class);
        proposalDto.setUser(userService.convertToUserDto(proposal.getDesigner()));
        return proposalDto;
    }

    private Proposal convertToProposalEntity(ProposalDto proposalDto) {
        Proposal proposal = modelMapper.map(proposalDto, Proposal.class);

        if(proposalDto.getProposal_id() != null){
            proposalDto.setProposal_id(proposalDto.getProposal_id());
        }

        return proposal;
    }
}
