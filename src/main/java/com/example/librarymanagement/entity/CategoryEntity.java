package com.example.librarymanagement.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "category")
public class CategoryEntity {
    @Id
    private String title;
}
