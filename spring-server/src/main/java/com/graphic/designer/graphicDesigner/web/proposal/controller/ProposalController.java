package com.graphic.designer.graphicDesigner.web.proposal.controller;

import com.graphic.designer.graphicDesigner.web.proposal.Service.ProposalService;
import com.graphic.designer.graphicDesigner.web.proposal.dto.AddProposalRequest;
import com.graphic.designer.graphicDesigner.web.proposal.dto.ProposalDto;
import com.graphic.designer.graphicDesigner.web.user.dto.ProfileRequest;
import com.graphic.designer.graphicDesigner.web.user.dto.UserDto;
import com.graphic.designer.graphicDesigner.web.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proposal")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> addProposal(@RequestBody @Valid AddProposalRequest addProposalRequest,
                                         Principal principal){

        ProfileRequest profileRequest = userService.findUserById(addProposalRequest.getDesignerId());
        if(profileRequest.getUsername().equals(principal.getName())){
            return new ResponseEntity<>(proposalService
                    .addProposal(addProposalRequest.getDesignerId(),addProposalRequest.getOrderId()), HttpStatus.CREATED);
        }
        else return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);

    }

    @GetMapping("/order/{id}")
    public ResponseEntity<?> getOrderProposals(@PathVariable Long id,
                                               @RequestParam(name = "page",defaultValue = "0") Integer page,
                                               @RequestParam(name = "size",defaultValue = "10") Integer size){

        Page<ProposalDto> proposals = proposalService.getProposalsByOrder(id,page,size);

        return new ResponseEntity<>(proposals, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserProposals(@PathVariable Long userId,
                                              @RequestParam(name = "page",defaultValue = "0") Integer page,
                                              @RequestParam(name = "size",defaultValue = "10") Integer size,
                                              Principal principal){

        ProfileRequest profileRequest = userService.findUserById(userId);
        if(profileRequest.getUsername().equals(principal.getName())) {
            Page<ProposalDto> proposals = proposalService.getProposalsByUser(userId,page,size);

            return new ResponseEntity<>(proposals, HttpStatus.OK);
        }
        else return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/order/{orderId}/user/{userId}")
    public ResponseEntity<?> deleteProposal(@PathVariable Long userId,
                                            @PathVariable Long orderId){
        return new ResponseEntity<>(proposalService.deleteProposal(userId,orderId),HttpStatus.OK);
    }

}
