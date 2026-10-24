# Build stage: use Maven with OpenJDK 17 to build the jar
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package the application
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage: minimal JRE 17 container
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create uploads directory for image storage
RUN mkdir -p uploads

# Copy compiled jar from build stage
COPY --from=build /app/target/bookhive-backend-1.0.0.jar app.jar

# Expose port (default 5000, customizable via PORT env var)
ENV PORT=5000
EXPOSE 5000

# Run the Spring Boot application
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
