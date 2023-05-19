package com.example.librarymanagement.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
@Table (name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
    private String phoneNum;
    private String email;
    private String address;

    @Enumerated(EnumType.STRING)
    private Provider Provider;

    public enum Provider {
        LOCAL,
        GOOGLE
    }
}
