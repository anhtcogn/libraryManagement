package com.example.librarymanagement.service;

import com.example.librarymanagement.entity.UserEntity;
import com.example.librarymanagement.payload.LoginRequest;
import com.example.librarymanagement.payload.LoginResponse;
import com.example.librarymanagement.payload.Message;

public interface UserService {
    Message register(UserEntity user);
    LoginResponse login(LoginRequest loginRequest);
    UserEntity updateInfo(Long id,
                          String phoneNum,
                          String address);

    Message changePw(Long id,
                    String oldPw,
                    String newPw);
}
