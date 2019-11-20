package com.graphic.designer.graphicDesigner.web.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ProfileRequest {

    private Long id;

    private String username;

    private String role;

    private LocalDate registerDate;

    private AvatarDto avatar;

    private String firstName;

    private String lastName;

    private String telNumber;

    private String email;

    private Long actualProposalsNumber;

    private Long actualOrderNumber;

    private Long allProposalsNumber;

    private Long allOrderNumber;

    private Long actualJobsNumber;

    private Long finishedJobsNumber;
}
