# Stage 1: build
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /build

# Copy the App directory so Maven can reach both ServerApp/ and client_side/
COPY App/ .

WORKDIR /build/ServerApp
RUN mvn clean package -DskipTests

# Stage 2: minimal runtime
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /build/ServerApp/target/*.jar app.jar

# Users file must be available at runtime for login to work
COPY App/ServerApp/users /app/users

# Submissions are written here — mount a volume to persist data across restarts
VOLUME ["/app/submissions"]

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
