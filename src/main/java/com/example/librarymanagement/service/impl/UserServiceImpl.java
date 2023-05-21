package com.example.librarymanagement.service.impl;

import com.example.librarymanagement.entity.UserEntity;
import com.example.librarymanagement.jwt.JwtTokenProvider;
import com.example.librarymanagement.payload.LoginRequest;
import com.example.librarymanagement.payload.LoginResponse;
import com.example.librarymanagement.payload.Message;
import com.example.librarymanagement.repository.UserRepository;
import com.example.librarymanagement.security.CustomUserDetails;
import com.example.librarymanagement.service.UserService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    protected JwtTokenProvider tokenProvider;

    BCryptPasswordEncoder p = new BCryptPasswordEncoder();

    @Override
    public Message register(UserEntity user) {
        Message message = new Message();
        UserEntity existUsername = userRepository.findByUsername(user.getUsername());
        UserEntity existEmail = userRepository.findByEmail(user.getEmail());

        if (existUsername != null) {
            message.setMessage("Existed username");
        } else if (existEmail != null) {
            message.setMessage("Existed email");
        } else {
//            UserEntity userEntity = new UserEntity();
//            userEntity.setUsername(user.getUsername());
            user.setPassword(p.encode(user.getPassword()));
//            user.setAddress(user.getAddress());
//            user.setPhoneNum(user.getPhoneNum());
            user.setProvider(UserEntity.Provider.LOCAL);
            userRepository.save(user);
            message.setSuccess(true);
            message.setMessage("Register success");
        }
        return message;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        String message = "";
        boolean success;
        LoginResponse loginResponse = new LoginResponse();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(
                    (CustomUserDetails) authentication.getPrincipal()
            );
            loginResponse = LoginResponse.builder().accessToken(jwt)
                    .username(loginRequest.getUsername())
                    .tokenType("Bearer")
                    .message("Login success.")
                    .statusCode(HttpStatus.OK).build();
            success = true;
        } catch (Exception e) {
            message = checkLoginAccount(loginRequest.getUsername());
            success = false;
        }
        if (success) {
            return loginResponse;
        } else {
            return LoginResponse.builder().message(message).statusCode(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Override
    public UserEntity updateInfo(Long id, String phoneNum, String address) {
        UserEntity userEntity = userRepository.findUserEntityById(id);
        userEntity.setPhoneNum(phoneNum);
        userEntity.setAddress(address);
        return userRepository.save(userEntity);
    }

    @Override
    public Message changePw(Long id, String oldPw, String newPw) {
        Message message = new Message();
        UserEntity userEntity = userRepository.findUserEntityById(id);
        if (!p.matches(oldPw, userEntity.getPassword())) {
            message.setMessage("Mat khau cu khong dung.");
            message.setSuccess(false);
            return message;
        }
        userEntity.setPassword(p.encode(newPw));
        userRepository.save(userEntity);
        message.setSuccess(true);
        message.setMessage("Doi mat khau thanh cong.");
        return message;
    }

    public String checkLoginAccount(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            return "Tài khoản đăng nhập không hợp lệ, vui lòng kiểm tra lại";
        } else {
            return "Mật khẩu chưa chính xác, vui lòng kiểm tra lại";
        }
    }
}

