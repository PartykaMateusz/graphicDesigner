package com.graphic.designer.graphicDesigner.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;

import static com.graphic.designer.graphicDesigner.constants.RoleConstants.DESIGNER;
import static com.graphic.designer.graphicDesigner.constants.RoleConstants.USER;
import static com.graphic.designer.graphicDesigner.constants.SecurityConstants.*;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Autowired
    private ResourceServerTokenServices tokenServices;

    @Value("${security.jwt.resource-ids}")
    private String resourceIds;

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.resourceId(resourceIds).tokenServices(tokenServices);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .requestMatchers()
                .and()
                .authorizeRequests()
                .antMatchers(AUTHENTICATED_ENDPOINTS).authenticated()
                .antMatchers(USER_ENDPOINTS).hasAnyRole(USER)
                .antMatchers(DESIGNER_ENDPOINTS).hasAnyRole(DESIGNER)
                .antMatchers(AUTH_WHITELIST).permitAll()
                .antMatchers("/").authenticated();

    }
}

