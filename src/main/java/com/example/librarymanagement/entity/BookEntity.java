package com.example.librarymanagement.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table (name = "book")
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotEmpty
    private String title;
    @NotEmpty
    private String author;
    private String category;
    @NotEmpty
    @Column(name = "publish_date")
    private String publishDate;
    private int pageNum;
    private String description;
    private String image;
}
