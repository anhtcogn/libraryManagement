package com.example.librarymanagement.repository;

import com.example.librarymanagement.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    BookEntity findBookEntityById(Integer id);
}
