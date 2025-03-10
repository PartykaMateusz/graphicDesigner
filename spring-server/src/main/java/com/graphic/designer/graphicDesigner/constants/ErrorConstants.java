package com.graphic.designer.graphicDesigner.constants;

import static com.graphic.designer.graphicDesigner.constants.ImageConstants.MAX_AVATAR_SIZE;

public class ErrorConstants {

    private ErrorConstants(){}

    public static final String LOGIN_IS_ALREADY_USED = "Użytkownik z takim loginem już isnieje";
    public static final String EMAIL_IS_ALREADY_USED = "Użytkownik z takim mailem już isnieje";
    public static final String ROLE_NOT_EXIST = "Rola o takiej nazwie nie isnieje";
    public static final String USER_NOT_EXIST = "Użytkownik nie isnieje";
    public static final String AVATAR_NOT_EXIST = "Avatar nie isnieje";

    public static final String ORDER_NOT_EXIST = "Zlecenie nie isnieje";

    public static final String CATEGORY_NOT_EXIST = "Kategoria nie isnieje";
    public static final String CATEGORY_ALREADY_EXIST = "Kategoria już isnieje";

    public static final String AVATAR_TOO_BIG = "Obraz jest zbyt duży. Maksymalny rozmiar to "+MAX_AVATAR_SIZE+" kb";

    public static final String PROPOSAL_ALREADY_EXIST = "Użytkownik jest już zgłoszony do tego zlecenia";

    public static final String JOB_NOT_EXIST = "Praca o takim id nie isnieje";

    public static final String RATE_ALREADY_EXIST = "Praca już oceniona";
}
