package com.example.librarymanagement.service.impl;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.specialized.BlockBlobClient;
import com.example.librarymanagement.entity.BookEntity;
import com.example.librarymanagement.payload.Message;
import com.example.librarymanagement.repository.BookRepository;
import com.example.librarymanagement.service.BookService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Log4j2
@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BlobServiceClient blobServiceClient;

    @Override
    public List<BookEntity> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public BookEntity getBookById(Integer id) {
        return bookRepository.findBookEntityById(id);
    }

    @Override
    public BookEntity addBook(String title,
                              String author,
                              String publishDate,
                              String category,
                              int pageNum,
                              String description,
                              MultipartFile image) {
        BookEntity book = new BookEntity();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublishDate(publishDate);
        book.setCategory(category);
        book.setPageNum(pageNum);
        book.setDescription(description);
        if (image != null && !image.isEmpty()) {
            String path = uploadImage(image, "anhtcogn");
            book.setImage(path);
        } else book.setImage(null);

        return bookRepository.save(book);
    }

    @Override
    public BookEntity updateBook(int id,
                                 String title,
                                 String author,
                                 String publishDate,
                                 String category,
                                 int pageNum,
                                 String description,
                                 MultipartFile image) {
        BookEntity book = bookRepository.findBookEntityById(id);
        book.setTitle(title);
        book.setAuthor(author);
        book.setCategory(category);
        book.setPublishDate(publishDate);
        book.setPageNum(pageNum);
        book.setDescription(description);
        if (image != null && !image.isEmpty()) {
            if (book.getImage() != null) {
                String deleteFile = book.getImage();
                deleteImage(deleteFile, "anhtcogn");
                System.out.println("success");
            } else {
                book.setImage(uploadImage(image, "anhtcogn"));
            }
        } else book.setImage(null);
        return bookRepository.save(book);
    }

    @Override
    public Message deleteBook(Integer id) {
        Message message = new Message();
        BookEntity book = bookRepository.findBookEntityById(id);
        if (book != null) {
            bookRepository.deleteById(id);
            message.setMessage("Deleted book with id = " + id);
            message.setSuccess(true);
        } else {
            message.setMessage("Book not exist");
            message.setSuccess(false);
        }
        return message;
    }

    @Override
    public String uploadImage(MultipartFile file, String containerName) {
        BlobContainerClient blobContainerClient = blobServiceClient.getBlobContainerClient(containerName);
        String filename = file.getOriginalFilename();
        String filePath = "";
        BlockBlobClient blockBlobClient = blobContainerClient.getBlobClient(filename).getBlockBlobClient();

        try {
            if (blockBlobClient.exists()) {
                blockBlobClient.delete();
            }

            blockBlobClient.upload(new BufferedInputStream(file.getInputStream()), file.getSize(), true);

            assert filename != null;
            if (filename.endsWith(".jpg")) {
                blockBlobClient.setHttpHeaders(new BlobHttpHeaders().setContentType("image/jpeg"));
            } else if (filename.endsWith(".png")) {
                blockBlobClient.setHttpHeaders(new BlobHttpHeaders().setContentType("image/png"));
            }

            filePath = containerName + "/" + filename;
            Files.deleteIfExists(Paths.get(filePath));
        } catch (IOException e) {
            log.error(e.getLocalizedMessage());
        }
        return "https://anhtcogn.blob.core.windows.net/" + filePath;
    }

    @Override
    public void deleteImage(String url, String containerName) {
        BlobContainerClient blobContainerClient = blobServiceClient.getBlobContainerClient(containerName);
        int index = 40 + containerName.length();
        String filename = url.substring(index);
        BlockBlobClient blockBlobClient = blobContainerClient.getBlobClient(filename).getBlockBlobClient();
        blockBlobClient.delete();
    }
}
