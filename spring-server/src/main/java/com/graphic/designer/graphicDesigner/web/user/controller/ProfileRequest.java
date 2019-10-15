package com.graphic.designer.graphicDesigner.web.user.controller;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import javax.validation.constraints.Email;
import java.awt.image.BufferedImage;
import java.util.LinkedHashMap;

@Data
public class ProfileRequest {

    private String username;
    private String password;

    @Email
    private String email;
    private String firstName;
    private String lastName;
    private String telNumber;

}
