package com.bookhive.service;

import com.bookhive.model.Book;
import com.bookhive.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    @Value("${app.uploads.dir}")
    private String uploadsDir;

    public Book createBook(String title, String description, String category,
                           Boolean trending, Double oldPrice, Double newPrice,
                           String coverImageUrl, MultipartFile coverImageFile) throws IOException {
        String coverImage = saveFile(coverImageFile);
        if (coverImage == null && coverImageUrl != null && !coverImageUrl.isBlank()) {
            coverImage = coverImageUrl;
        }
        Book book = Book.builder()
                .title(title)
                .description(description)
                .category(category)
                .trending(trending)
                .oldPrice(oldPrice)
                .newPrice(newPrice)
                .coverImage(coverImage)
                .build();
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAllByOrderByCreatedAtDesc();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not Found!"));
    }

    public Book updateBook(Long id, String title, String description, String category,
                           Boolean trending, Double oldPrice, Double newPrice,
                           String coverImageUrl, MultipartFile coverImageFile) throws IOException {
        Book book = getBookById(id);

        if (title != null) book.setTitle(title);
        if (description != null) book.setDescription(description);
        if (category != null) book.setCategory(category);
        if (trending != null) book.setTrending(trending);
        if (oldPrice != null) book.setOldPrice(oldPrice);
        if (newPrice != null) book.setNewPrice(newPrice);

        if (coverImageFile != null && !coverImageFile.isEmpty()) {
            book.setCoverImage(saveFile(coverImageFile));
        } else if (coverImageUrl != null && !coverImageUrl.isEmpty()) {
            book.setCoverImage(coverImageUrl);
        }

        return bookRepository.save(book);
    }

    public Book deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
        return book;
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        Path uploadPath = Paths.get(uploadsDir).toAbsolutePath();
        Files.createDirectories(uploadPath);

        String filename = System.currentTimeMillis() + getExtension(file.getOriginalFilename());
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath);

        return "/uploads/" + filename;
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf("."));
    }
}
