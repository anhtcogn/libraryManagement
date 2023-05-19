package com.example.librarymanagement.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
}
