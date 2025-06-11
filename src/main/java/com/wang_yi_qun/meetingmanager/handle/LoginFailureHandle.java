package com.wang_yi_qun.meetingmanager.handle;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.json.JSONObject;
import java.io.IOException;

public class LoginFailureHandle implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        jsonObject.put("error", "login failure: " + exception.getMessage());

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(jsonObject.toString());
    }
}