package com.github.erfanarvan.serverapp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

@WebMvcTest(SubmissionController.class)
public class SubmissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void testValidCredentials() throws Exception {
        Map<String, String> payload = Map.of("username", "martin", "password", "kudXKSspt6QT");

        mockMvc.perform(post("/get_snippet_order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.participantName").value("Martin Kellogg"))
                .andExpect(jsonPath("$.snippetOrder").isArray());
    }

    @Test
    void testInvalidCredentials() throws Exception {
        Map<String, String> payload = Map.of("username", "martin", "password", "wrong");

        mockMvc.perform(post("/get_snippet_order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(payload)))
                .andExpect(status().isUnauthorized());
    }
}
