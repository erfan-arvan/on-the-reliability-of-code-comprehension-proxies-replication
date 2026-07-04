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

`App/client_side/` contains one HTML page per study role and round
(e.g. `begin.html` — background questionnaire, `students.html` /
`phase1.html`...`phase4.html` — student study flow, `round2.html`...`round4.html`
— expert ranking rounds, `discussion.html` — expert chat) rather than a
single unified landing page. The one entry point that is easy to verify
end-to-end with the demo credentials below is the expert login page:

| URL | Description |
|---|---|
| `http://localhost:8080/admin-login.html` | Login page for the expert-panel accounts below |

There is no built-in admin dashboard for viewing submissions. Submitted
data is written as JSON under `submissions/` inside the running container
(e.g. `submissions/all_submissions.json`, `submissions/students.json`);
inspect it with `docker exec` or by mounting a volume, e.g.:

```bash
docker run -p 8080:8080 -v "$(pwd)/submissions:/app/submissions" code-comprehension-web:latest
```

## Demo login credentials

Login (`/admin-login.html` and the expert-facing pages) authenticates
against `App/ServerApp/users/experts_panel.json` via `POST /get_snippet_order`.
There is no separate "admin" account — these are the same demo accounts
used to exercise the expert-panel flow:

| Username | Password |
|---|---|
| `demo1` | `pass1` |
| `demo2` | `pass2` |
| `demo3` | `pass3` |

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
