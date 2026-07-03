# Web Application

Spring Boot application used to administer the study to participants.

## Running the web app

Load the image from Zenodo (if not already done):

```bash
docker load < code-comprehension-web.tar.gz
```

Start the application:

```bash
docker run -p 8080:8080 code-comprehension-web:latest
```

Wait for `Started Main in X.XXX seconds`, then open `http://localhost:8080`.

To stop: `Ctrl+C`.

## Study entry points

| URL | Description |
|---|---|
| `http://localhost:8080` | Participant-facing study interface |
| `http://localhost:8080/admin` | Admin dashboard (view submissions) |

## Demo login credentials

| Role | Username | Password |
|---|---|---|
| Participant | `demo` | `demo` |
| Admin | `admin` | `admin` |

## Source code layout

```
App/
├── ServerApp/     ← Spring Boot backend (Maven project)
└── client_side/   ← Frontend assets served by the backend
```

## Building from source (optional)

**Prerequisites:** JDK 17+, Maven 3.8+

```bash
cd App/ServerApp && mvn spring-boot:run
```

Then open `http://localhost:8080`.
