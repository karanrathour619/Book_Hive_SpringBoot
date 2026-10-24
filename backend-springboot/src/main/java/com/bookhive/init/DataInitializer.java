package com.bookhive.init;

import com.bookhive.model.Book;
import com.bookhive.model.User;
import com.bookhive.repository.BookRepository;
import com.bookhive.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .role("admin")
                    .build();
            userRepository.save(admin);
            log.info("Initialized default admin user: username=admin, password=admin123");
        }

        if (bookRepository.count() == 0) {
            List<Book> initialBooks = List.of(
                    Book.builder().title("Atomic Habits").description("An Easy & Proven Way to Build Good Habits & Break Bad Ones").category("business").trending(true).coverImage("book-1.png").oldPrice(25.99).newPrice(19.99).build(),
                    Book.builder().title("The Psychology of Money").description("Timeless lessons on wealth, greed, and happiness").category("business").trending(true).coverImage("book-2.png").oldPrice(22.0).newPrice(16.5).build(),
                    Book.builder().title("Deep Work").description("Rules for Focused Success in a Distracted World").category("technology").trending(true).coverImage("book-3.png").oldPrice(28.0).newPrice(21.0).build(),
                    Book.builder().title("Clean Code").description("A Handbook of Agile Software Craftsmanship").category("technology").trending(false).coverImage("book-4.png").oldPrice(45.0).newPrice(35.0).build(),
                    Book.builder().title("The Silent Patient").description("A shocking psychological thriller of a woman's act of violence against her husband").category("fiction").trending(true).coverImage("book-5.png").oldPrice(18.99).newPrice(14.99).build(),
                    Book.builder().title("It Ends with Us").description("A novel about love, heartbreak, and resilience").category("fiction").trending(true).coverImage("book-6.png").oldPrice(19.99).newPrice(12.99).build(),
                    Book.builder().title("The Shining").description("A masterpiece of modern horror by Stephen King").category("horror").trending(false).coverImage("book-7.png").oldPrice(24.5).newPrice(18.0).build(),
                    Book.builder().title("Into the Wild").description("The vivid, harrowing story of a young man's journey into the Alaskan wilderness").category("adventure").trending(true).coverImage("book-8.png").oldPrice(17.5).newPrice(13.0).build(),
                    Book.builder().title("Thinking, Fast and Slow").description("The major insights into human intuition and choices").category("business").trending(false).coverImage("book-9.png").oldPrice(30.0).newPrice(24.0).build(),
                    Book.builder().title("Designing Data-Intensive Applications").description("The Big Ideas Behind Reliable, Scalable, and Maintainable Systems").category("technology").trending(true).coverImage("book-10.png").oldPrice(55.0).newPrice(42.0).build()
            );
            bookRepository.saveAll(initialBooks);
            log.info("Initialized {} starter books into the database", initialBooks.size());
        }
    }
}
