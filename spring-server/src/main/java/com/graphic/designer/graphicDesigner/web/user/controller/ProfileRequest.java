package com.graphic.designer.graphicDesigner.web.user.controller;

import lombok.Data;

import javax.validation.constraints.Email;
import java.awt.image.BufferedImage;

@Data
public class ProfileRequest {

    private String username;
    private String password;

    @Email
    private String email;
    private String firstName;
    private String lastName;
    private String telNumber;
    private byte[] avatar;
}
