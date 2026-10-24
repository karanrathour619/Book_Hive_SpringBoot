package com.bookhive.controller;

import com.bookhive.model.Book;
import com.bookhive.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // 📌 Post a book (with image upload)
    @PostMapping(value = "/create-book", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postABook(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("trending") String trending,
            @RequestParam("oldPrice") Double oldPrice,
            @RequestParam("newPrice") Double newPrice,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage
    ) throws IOException {
        Boolean isTrending = Boolean.parseBoolean(trending);
        Book newBook = bookService.createBook(title, description, category, isTrending, oldPrice, newPrice, coverImage);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Book posted successfully",
                "book", newBook
        ));
    }

    // 📌 Get all books (matches both /api/books and /api/books/)
    @GetMapping({"", "/"})
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // 📌 Single book endpoint
    @GetMapping("/{id}")
    public ResponseEntity<Book> getSingleBook(@PathVariable("id") Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    // 📌 Update a book endpoint (supports JSON or multipart)
    @PutMapping(value = "/edit/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateBookMultipart(
            @PathVariable("id") Long id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "trending", required = false) Boolean trending,
            @RequestParam(value = "oldPrice", required = false) Double oldPrice,
            @RequestParam(value = "newPrice", required = false) Double newPrice,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage
    ) throws IOException {
        Book updatedBook = bookService.updateBook(id, title, description, category, trending, oldPrice, newPrice, null, coverImage);
        return ResponseEntity.ok(Map.of(
                "message", "Book updated successfully",
                "book", updatedBook
        ));
    }

    @PutMapping(value = "/edit/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateBookJson(
            @PathVariable("id") Long id,
            @RequestBody Map<String, Object> body
    ) throws IOException {
        String title = (String) body.get("title");
        String description = (String) body.get("description");
        String category = (String) body.get("category");
        Boolean trending = body.get("trending") != null ? Boolean.valueOf(body.get("trending").toString()) : null;
        Double oldPrice = body.get("oldPrice") != null ? Double.valueOf(body.get("oldPrice").toString()) : null;
        Double newPrice = body.get("newPrice") != null ? Double.valueOf(body.get("newPrice").toString()) : null;
        String coverImage = (String) body.get("coverImage");

        Book updatedBook = bookService.updateBook(id, title, description, category, trending, oldPrice, newPrice, coverImage, null);
        return ResponseEntity.ok(Map.of(
                "message", "Book updated successfully",
                "book", updatedBook
        ));
    }

    // 📌 Delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteABook(@PathVariable("id") Long id) {
        Book deletedBook = bookService.deleteBook(id);
        return ResponseEntity.ok(Map.of(
                "message", "Book deleted successfully",
                "book", deletedBook
        ));
    }
}
