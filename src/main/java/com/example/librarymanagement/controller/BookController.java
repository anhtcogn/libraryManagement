package com.example.librarymanagement.controller;

import com.example.librarymanagement.entity.BookEntity;
import com.example.librarymanagement.payload.Message;
import com.example.librarymanagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public ResponseEntity<?> getAllBook() {
        List<BookEntity> list = bookService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getById")
    public ResponseEntity<?> getById(
            @RequestParam int id) {
        BookEntity book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public BookEntity createBook(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam(required = false) String category,
            @RequestParam String publishDate,
            @RequestParam(required = false) int pageNum,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image
            ) throws FileNotFoundException
            {
        return bookService.addBook(title, author, publishDate, category, pageNum, description, image);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public BookEntity updateBook(
            @RequestParam int id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String publishDate,
            @RequestParam(required = false) int pageNum,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        return bookService.updateBook(id, title, author, publishDate, category, pageNum, description, image);
    }

    @DeleteMapping("/delete")
    public Message delete(
            @RequestParam int id
    ){
        return bookService.deleteBook(id);
    }

}
