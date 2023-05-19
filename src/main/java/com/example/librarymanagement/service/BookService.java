package com.example.librarymanagement.service;

import com.example.librarymanagement.entity.BookEntity;
import com.example.librarymanagement.payload.Message;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {
    List<BookEntity> getAll();
    BookEntity getBookById(Integer id);
    BookEntity addBook(String title,
                       String author,
                       String publishDate,
                       String category,
                       int pageNum,
                       String description,
                       MultipartFile image);
    BookEntity updateBook(int id,
                          String title,
                          String author,
                          String publishDate,
                          String category,
                          int pageNum,
                          String description,
                          MultipartFile image);
    Message deleteBook(Integer id);

    String uploadImage(MultipartFile file, String containerName);
    void deleteImage(String url, String containerName);

}
