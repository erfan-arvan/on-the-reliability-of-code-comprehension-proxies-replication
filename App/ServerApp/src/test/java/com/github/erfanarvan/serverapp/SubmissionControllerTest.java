package com.github.erfanarvan.serverapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Assumptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.io.File;
import java.nio.file.Path;
import java.util.Map;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SubmissionController.class)
public class SubmissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private static final ObjectMapper mapper = new ObjectMapper();

    // resolved path to the users file (null if not found)
    private static String usersFilePath = null;

    @BeforeAll
    static void findUsersFile() {
        // allow override via env var for flexibility in CI/dev
        String envPath = System.getenv("USERS_FILE_PATH");
        if (envPath != null && !envPath.isBlank()) {
            File f = new File(envPath);
            if (f.exists() && f.isFile()) {
                usersFilePath = f.getAbsolutePath();
                return;
            }
        }

        // common project-relative locations to try (project root /users folder)
        List<String> candidates = List.of(
                "./users/experts_panel.json",
                "users/experts_panel.json",
                "./src/main/resources/users/experts_panel.json",
                "/home/ubuntu/expertsApp/ServerApp/users/experts_panel.json" // your dev path
        );

        for (String c : candidates) {
            File f = new File(c);
            if (f.exists() && f.isFile()) {
                usersFilePath = f.getAbsolutePath();
                return;
            }
        }

        // leave usersFilePath null if none found -> tests that depend on it will be skipped
    }

    @Test
    void testFacilitatorLoginFromUsersFile() throws Exception {
        // Skip test when file not found — avoids hard failure on CI without the file.
        Assumptions.assumeTrue(usersFilePath != null, "users file not available; skipping facilitator login test");

        // read the JSON and extract facilitator password
        Map<?, ?> root = mapper.readValue(new File(usersFilePath), Map.class);
        @SuppressWarnings("unchecked")
        Map<String, Object> passwords = (Map<String, Object>) root.get("passwords");

        Assumptions.assumeTrue(passwords != null && passwords.containsKey("facilitator"),
                "facilitator entry not found in users file; skipping facilitator login test");

        // do NOT log or assert raw password — use it directly in the payload
        String facilitatorPassword = String.valueOf(passwords.get("facilitator"));

        Assumptions.assumeTrue(!facilitatorPassword.isBlank(),
                "facilitator password empty; skipping facilitator login test");

        Map<String, String> payload = Map.of("username", "facilitator", "password", facilitatorPassword);

        // perform the login test (we expect 200 + participantName + snippetOrder)
        mockMvc.perform(post("/get_snippet_order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.participantName").exists())
                .andExpect(jsonPath("$.snippetOrder").isArray());
    }

    @Test
    void testInvalidFacilitatorPasswordFromUsersFile() throws Exception {
        // skip if no file
        Assumptions.assumeTrue(usersFilePath != null, "users file not available; skipping invalid-password test");

        // ensure facilitator exists
        Map<?, ?> root = mapper.readValue(new File(usersFilePath), Map.class);
        @SuppressWarnings("unchecked")
        Map<String, Object> passwords = (Map<String, Object>) root.get("passwords");

        Assumptions.assumeTrue(passwords != null && passwords.containsKey("facilitator"),
                "facilitator entry not found in users file; skipping invalid-password test");

        // use a guaranteed-wrong password to verify unauthorized path
        Map<String, String> payload = Map.of("username", "facilitator", "password", "this-is-wrong-and-not-secret");

        mockMvc.perform(post("/get_snippet_order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(payload)))
                .andExpect(status().isUnauthorized());
    }
}
