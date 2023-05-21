package com.example.librarymanagement.controller;

import com.example.librarymanagement.entity.UserEntity;
import com.example.librarymanagement.payload.LoginRequest;
import com.example.librarymanagement.payload.LoginResponse;
import com.example.librarymanagement.payload.Message;
import com.example.librarymanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Message register(
            @RequestBody UserEntity user
            ) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest loginRequest
            ) {
        return userService.login(loginRequest);
    }

    @PutMapping("/updateInfo")
    public Message changePw(
            @RequestParam Long id,
            @RequestParam String oldPw,
            @RequestParam String newPw
    ) {
        return userService.changePw(id, oldPw, newPw);
    }
}
