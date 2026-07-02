# Code Comprehension Study — Paper Artifact

This repository contains the web application used to run the study described in our paper. It supports two participant groups — students and experts — each going through their own study flow.

| Directory      | Role                                            |
|----------------|-------------------------------------------------|
| `ServerApp/`   | Spring Boot back-end (REST API + serves the UI) |
| `client_side/` | Static HTML/JS front-end (study interface)      |

---

## Option 1: Run with Docker (recommended)

No Java or Maven installation required.

**Prerequisite:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
git clone https://github.com/erfan-arvan/on-the-reliability-of-code-comprehension-proxies-replication.git
cd on-the-reliability-of-code-comprehension-proxies-replication
docker compose up --build
```

Wait for `Started Main in X.XXX seconds`, then open `http://localhost:8080`.

To stop: `Ctrl+C`, then `docker compose down`.

---

## Option 2: Run without Docker

**Prerequisites:**

| Tool  | Version      | Check with      |
|-------|--------------|-----------------|
| JDK   | 17 or later  | `java -version` |
| Maven | 3.8 or later | `mvn -version`  |

```bash
git clone https://github.com/erfan-arvan/on-the-reliability-of-code-comprehension-proxies-replication.git
cd on-the-reliability-of-code-comprehension-proxies-replication/App/ServerApp
mvn spring-boot:run
```

Wait for `Started Main in X.XXX seconds`, then open `http://localhost:8080`.

---

## Demo Credentials

Accounts are defined in `App/ServerApp/users/experts_panel.json`:

| Username | Password |
|----------|----------|
| `demo1`  | `pass1`  |
| `demo2`  | `pass2`  |
| `demo3`  | `pass3`  |

These are used for the expert study flows. The student study does not require login.

---

## Key Entry Points

### Student Study

| URL | Description |
|-----|-------------|
| `http://localhost:8080/start.html` | Starting point of the student study |

### Expert Study

| URL | Description |
|-----|-------------|
| `http://localhost:8080/experts_app/index.html` | Round 1 — rate and summarise code snippets |
| `http://localhost:8080/round2.html` | Round 2 — re-rate after seeing group results |
| `http://localhost:8080/discussion-round.html` | Round 3 — expert discussion of disagreements |

---

## Notes

- Submission data is saved to `submissions/` inside the container (or `App/ServerApp/submissions/` when running locally), created automatically on first run.
- Email notifications are disabled locally; any related log warnings can be ignored.
- To add or modify user accounts, edit `App/ServerApp/users/experts_panel.json` — no rebuild needed when using Docker.
