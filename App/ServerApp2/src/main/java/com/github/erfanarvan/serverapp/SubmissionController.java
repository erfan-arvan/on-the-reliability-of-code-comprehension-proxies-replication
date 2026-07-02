package com.github.erfanarvan.serverapp;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.Instant;
import java.time.format.DateTimeFormatter;

import java.nio.charset.StandardCharsets;

import java.util.UUID;
import java.util.stream.Collectors;



@RestController
public class SubmissionController {

    private static final File CHAT_DIR  = new File("submissions/chat");
    private static final File CHAT_FILE = new File(CHAT_DIR, "chats_all.json");
    private static final File CHAT_SEEN_FILE = new File("submissions/chat/seen_state.json");

    
    // TODO: Move Hard coding Passwords to a separate DB
    private static final Map<String, String> userPasswords = Map.of(
        "martin", "kudXKSspt6QT",
        "oscar", "NMgxVXWCn6D7",
        "erfan", "fmtHu98Tz7rd",
        "nadeeshan", "xGAXPnnLD3yH"
    );

    private static final Map<String, String> userEmails = Map.of(
    "erfan",     "ea442@njit.edu",
    "nadeeshan", "kgdesilva@wm.edu",
    "oscar", "ojcch1@gmail.com",
    "martin", "martin.kellogg@njit.edu"
);


    private static final Map<String, String> userNames = Map.of(
        "martin", "Martin Kellogg",
        "oscar", "Oscar Chaparro",
        "erfan", "Erfan Arvan",
        "nadeeshan", "De Silva, Nadeeshan"
    );

    private static final Map<String, List<Integer>> userSnippetOrders = Map.of(
        "martin", List.of(3, 1, 4, 7, 8, 2, 6, 5),
        "oscar", List.of(1, 2, 3, 4, 5, 6, 7, 8),
        "erfan", List.of(6, 7, 8, 1, 2, 3, 4, 5),
        "nadeeshan", List.of(7, 6, 8, 1, 2, 3, 4, 5)
    );

    // Helper: case-insensitive lookup
    private String emailForUser(String handle) {
        if (handle == null) return null;
        String h = handle.trim().toLowerCase(Locale.ROOT);
        return userEmails.getOrDefault(h, null);
    }

    @PostMapping("/get_snippet_order")
    public Map<String, Object> getSnippetOrder(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (!userPasswords.containsKey(username) || !userPasswords.get(username).equals(password)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("participantName", userNames.get(username));
        response.put("snippetOrder", userSnippetOrders.get(username));
        return response;
    }

    @CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
    @PostMapping("/submit_final")
    public synchronized String handleFinalSubmission(@RequestBody Map<String, Object> body) {
        String username = (String) body.getOrDefault("username", "anonymous");
        String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                        .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        Object submittedObj = body.get("submitted");
        boolean isFinal = "1".equals(submittedObj) || Boolean.TRUE.equals(submittedObj);

        System.out.println(">>> [submit_final] Received submission:");
        // System.out.println(">>> Username: " + username);
        // System.out.println(">>> Timestamp: " + timestamp);
        // System.out.println(">>> raw 'submitted' value: " + submittedObj);
        // System.out.println(">>> Parsed isFinal: " + isFinal);
        // System.out.println(">>> Body Keys: " + body.keySet());
        // System.out.println(">>> Raw Body Preview: " + truncateJson(body, 1000));

        File directory = new File("submissions");
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println(">>> Created 'submissions' directory.");
        }

        File allFile = new File("submissions/all_submissions.json");
        File finalFile = new File("submissions/final_submissions.json");
        System.out.println(">>> allFile path: " + allFile.getAbsolutePath());
        System.out.println(">>> finalFile path: " + finalFile.getAbsolutePath());

        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

        try {
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("timestamp", timestamp);
            wrapped.put("isFinal", isFinal);
            wrapped.put("data", body);

            Map<String, List<Map<String, Object>>> allData = allFile.exists()
                ? mapper.readValue(allFile, new TypeReference<>() {})
                : new HashMap<>();
            allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(allFile, allData);
            System.out.println(">>> Saved to all_submissions.json");

            if (isFinal) {
                Map<String, List<Map<String, Object>>> finalData = finalFile.exists()
                    ? mapper.readValue(finalFile, new TypeReference<>() {})
                    : new HashMap<>();
                finalData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
                mapper.writeValue(finalFile, finalData);
                System.out.println(">>> Saved to final_submissions.json");
            }

            return "Submission saved.";
        } catch (IOException e) {
            System.err.println(">>> ERROR while saving submission for: " + username);
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save submission.");
        }
    }


    @CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
    @PostMapping("/get_latest_submission")
    public Map<String, Object> getLatestSubmission(@RequestBody Map<String, String> request) {
        String username = request.getOrDefault("username", "anonymous");
        File file = new File("submissions/all_submissions.json");
        ObjectMapper mapper = new ObjectMapper();

        try {
            if (!file.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No submissions found.");
            }

            Map<String, List<Map<String, Object>>> allData = mapper.readValue(file, new TypeReference<>() {});
            List<Map<String, Object>> userSubs = allData.get(username);
            if (userSubs == null || userSubs.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No submission for user.");
            }

            return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");

        } catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read submission.");
        }
    }

    @CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
    @PostMapping("/submit_students_part")
    public synchronized String handleStudentSubmission(@RequestBody Map<String, Object> body) {
        String username = (String) body.getOrDefault("username", "anonymous");
        String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                        .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        Object submittedObj = body.get("submitted");
        boolean isFinal = "1".equals(submittedObj) || Boolean.TRUE.equals(submittedObj);

        System.out.println(">>> [submit_students_part] Submission received from: " + username);
        System.out.println(">>> Timestamp: " + timestamp);
        // System.out.println(">>> Final flag: " + isFinal);
        // System.out.println(">>> Body Preview: " + truncateJson(body, 1000));

        File directory = new File("submissions");
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println(">>> Created 'submissions' directory.");
        }

        File allFile = new File("submissions/students.json");
        File finalFile = new File("submissions/studentsFinal.json");

        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

        try {
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("timestamp", timestamp);
            wrapped.put("isFinal", isFinal);
            wrapped.put("data", body);

            // Save to students.json
            List<Map<String, Object>> allData = allFile.exists()
                ? mapper.readValue(allFile, new TypeReference<>() {})
                : new ArrayList<>();
            allData.add(wrapped);
            mapper.writeValue(allFile, allData);
            System.out.println(">>> Saved to students.json");

            // If final, also save to studentsFinal.json
            if (isFinal) {
                List<Map<String, Object>> finalData = finalFile.exists()
                    ? mapper.readValue(finalFile, new TypeReference<>() {})
                    : new ArrayList<>();
                finalData.add(wrapped);
                mapper.writeValue(finalFile, finalData);
                System.out.println(">>> Saved to studentsFinal.json");
            }

            return "Student submission saved.";
        } catch (IOException e) {
            System.err.println(">>> ERROR saving student submission for: " + username);
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save student submission.");
        }
    }

    private String escapeJson(String s) {
        return s
            .replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r");
    }

    private void sendEmailViaPython(String to, String subject, String message) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c",
                "echo " + escapeForShell(String.format(
                    "{\"to\":\"%s\", \"subject\":\"%s\", \"message\":\"%s\"}",
                    escapeJson(to), escapeJson(subject), escapeJson(message)
                )) + " | python3 /home/ubuntu/emailService/send_email.py"
            );

            processBuilder.redirectErrorStream(true); // Merge stderr with stdout
            Process process = processBuilder.start();

            try (Scanner scanner = new Scanner(process.getInputStream())) {
                while (scanner.hasNextLine()) {
                    System.out.println(">>> Python Output: " + scanner.nextLine());
                }
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println(">>> Email successfully sent to: " + to);
            } else {
                System.err.println(">>> Failed to send email to: " + to + " (exit code: " + exitCode + ")");
            }
        } catch (Exception e) {
            System.err.println(">>> Exception while sending email to: " + to);
            e.printStackTrace();
        }
    }

    private String escapeForShell(String input) {
        return "'" + input.replace("'", "'\"'\"'") + "'";
    }

    @CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
    @PostMapping("/register_student")
    public synchronized String handleStudentRegistration(@RequestBody Map<String, Object> body) {
        String email = (String) body.getOrDefault("email", "unknown");
        String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                        .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        System.out.println(">>> [register_student] Registration received from: " + email);
        System.out.println(">>> Timestamp: " + timestamp);

        File directory = new File("submissions");
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println(">>> Created 'submissions' directory.");
        }

        File registrationFile = new File("submissions/registration.json");
        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

        try {
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("timestamp", timestamp);
            wrapped.put("data", body);

            List<Map<String, Object>> allData = registrationFile.exists()
                ? mapper.readValue(registrationFile, new TypeReference<>() {})
                : new ArrayList<>();
            allData.add(wrapped);
            mapper.writeValue(registrationFile, allData);
            System.out.println(">>> Saved to registration.json");

            // ==== Determine Event Type and Send Appropriate Email ====
            String sessionTime = body.getOrDefault("selectedSlot", "unspecified").toString();
            String event = body.getOrDefault("event", "register").toString().toLowerCase().trim();
            String subject;
            String message;
            String customAvailability = body.getOrDefault("customAvailability", "Not specified").toString();


            switch (event) {
                case "cancel":
                    subject = "Code Comprehension Study Registration Canceled";
                    message = "Your registration for the Code Comprehension Study has been successfully canceled.\n\n" +
                            "If this was a mistake or you’d like to pick a new time slot, please re-register at:\n" +
                            "https://panelb.codecomprehensibility.site/eligibility.html\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;

                case "modify":
                    subject = "Code Comprehension Study Registration Updated";
                    String modifyLink = "https://panelb.codecomprehensibility.site/cancelModifyRegistration.html" +
                                        "?email=" + java.net.URLEncoder.encode(email, StandardCharsets.UTF_8) +
                                        "&slot=" + java.net.URLEncoder.encode(sessionTime, StandardCharsets.UTF_8);

                    message = "You've successfully modified your session for the Code Comprehension Study.\n\n" +
                            "📅 Your updated session time: " + sessionTime + "\n\n" +
                            "If you need to cancel or modify again, please use this link:\n" + modifyLink + "\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;
                case "pending":
                    subject = "Code Comprehension Study – Availability Received";

                    message = "Thank you for suggesting your available time slots for the Code Comprehension Study.\n\n" +
                            "📅 Your availability:\n" +
                            customAvailability + "\n\n" +
                            "We'll review your responses and reach out shortly to confirm your session time.\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;
            case "availability":
                subject = "Code Comprehension Study – Availability Received";

                message = "Thank you for sharing your available time slots for the Code Comprehension Study.\n\n" +
                        "📅 Your availability:\n" +
                        sessionTime + "\n\n" +
                        "We'll review your availability and follow up soon to confirm your session time and location.\n" +
                        "The session will take place at NJIT, in one of the rooms in the GITC building.\n\n" +
                        "If you have any questions or concerns, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                        "— Code Comprehension Study Team";
                break;
                case "register":
                default:
                    subject = "Code Comprehension Study Registration Confirmation";
                    String cancelLink = "https://panelb.codecomprehensibility.site/cancelModifyRegistration.html" +
                                        "?email=" + java.net.URLEncoder.encode(email, StandardCharsets.UTF_8) +
                                        "&slot=" + java.net.URLEncoder.encode(sessionTime, StandardCharsets.UTF_8);

                    message = "Thank you for registering!\n\n" +
                            "📅 Your session is scheduled for: " + sessionTime + "\n\n" +
                            "We'll follow up with the exact room location, but it will be in one of the rooms at GITC, NJIT.\n\n" +
                            "If you want to cancel or change your time slot, please use this link:\n" + cancelLink + "\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;
            }

            System.out.println(">>> Sending " + event + " email to: " + email);
            sendEmailViaPython(email, subject, message);

            return "Registration saved.";
        } catch (IOException e) {
            System.err.println(">>> ERROR saving registration for: " + email);
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save registration.");
        }
    }

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/register_expert")
public synchronized String handleExpertRegistration(@RequestBody Map<String, Object> body) {
    String email = (String) body.getOrDefault("email", "unknown");
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    System.out.println(">>> [register_expert] Registration received from: " + email);
    System.out.println(">>> Timestamp: " + timestamp);

    File directory = new File("submissions");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions' directory.");
    }

    File registrationFile = new File("submissions/expert_registration.json");
    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("data", body);

        List<Map<String, Object>> allData = registrationFile.exists()
            ? mapper.readValue(registrationFile, new TypeReference<>() {})
            : new ArrayList<>();
        allData.add(wrapped);
        mapper.writeValue(registrationFile, allData);
        System.out.println(">>> Saved to expert_registration.json");

        // Email Content Logic
        String event = body.getOrDefault("event", "register").toString().toLowerCase().trim();
        String subject, message;
        String sessionTime = body.getOrDefault("selectedSlot", "unspecified").toString();

        switch (event) {
            case "appointment":
                subject = "Availability Received – Expert Participation in Code Comprehension Study";
                message = "Thank you for providing your available time slots for the Code Comprehension Study.\n\n" +
                          "📅 Your availability: " + sessionTime + "\n\n" +
                          "We'll follow up shortly to finalize an appointment.\n\n" +
                          "If you have any questions, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                          "— Code Comprehension Study Team";
                break;

            case "consent":
                subject = "Consent Form Received – Code Comprehension Study";
                message = "Thank you for signing the consent form for the Code Comprehension Study.\n\n" +
                          "We’ve received your submission and will contact you soon with further instructions.\n\n" +
                          "If you have any questions, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                          "— Code Comprehension Study Team";
                break;

            default:
                subject = "Expert Registration – Code Comprehension Study";
                message = "Your registration for the Code Comprehension Study has been received.\n\n" +
                          "We'll be in touch shortly to coordinate the next steps.\n\n" +
                          "If you have any questions, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                          "— Code Comprehension Study Team";
                break;
        }

        System.out.println(">>> Sending " + event + " email to: " + email);
        sendEmailViaPython(email, subject, message);

        return "Expert registration saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving expert registration for: " + email);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save expert registration.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/submit_round2")
public synchronized String handleRound2Submission(@RequestBody Map<String, Object> body) {
    String username = (String) body.getOrDefault("username", "anonymous");
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    boolean isFinal = "1".equals(String.valueOf(body.get("submitted")));

    System.out.println(">>> [submit_round2] Submission received from: " + username);

    File directory = new File("submissions/round2");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions/round2' directory.");
    }

    File allFile = new File(directory, "round2_all.json");
    File finalFile = new File(directory, "round2_final.json");

    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("isFinal", isFinal);
        wrapped.put("data", body);

        Map<String, List<Map<String, Object>>> allData = allFile.exists()
            ? mapper.readValue(allFile, new TypeReference<>() {})
            : new HashMap<>();
        allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
        mapper.writeValue(allFile, allData);
        System.out.println(">>> Saved to round2_all.json");

        if (isFinal) {
            Map<String, List<Map<String, Object>>> finalData = finalFile.exists()
                ? mapper.readValue(finalFile, new TypeReference<>() {})
                : new HashMap<>();
            finalData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(finalFile, finalData);
            System.out.println(">>> Saved to round2_final.json");
        }

        return "Round 2 submission saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving round2 submission for: " + username);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save round2 submission.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/get_latest_round2")
public Map<String, Object> getLatestRound2Submission(@RequestBody Map<String, String> request) {
    String username = request.getOrDefault("username", "anonymous");
    File file = new File("submissions/round2/round2_all.json");
    ObjectMapper mapper = new ObjectMapper();

    try {
        if (!file.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 2 submissions found.");
        }

        Map<String, List<Map<String, Object>>> allData = mapper.readValue(file, new TypeReference<>() {});
        List<Map<String, Object>> userSubs = allData.get(username);
        if (userSubs == null || userSubs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 2 submission for user.");
        }

        return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read Round 2 submission.");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/submit_round3")
public synchronized String handleRound3Submission(@RequestBody Map<String, Object> body) {
    String username = (String) body.getOrDefault("username", "anonymous");
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    boolean isFinal = "1".equals(String.valueOf(body.get("submitted")));

    System.out.println(">>> [submit_round3] Submission received from: " + username);

    File directory = new File("submissions/round3");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions/round3' directory.");
    }

    File allFile = new File(directory, "round3_all.json");
    File finalFile = new File(directory, "round3_final.json");

    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("isFinal", isFinal);
        wrapped.put("data", body);

        Map<String, List<Map<String, Object>>> allData = allFile.exists()
            ? mapper.readValue(allFile, new TypeReference<>() {})
            : new HashMap<>();
        allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
        mapper.writeValue(allFile, allData);
        System.out.println(">>> Saved to round3_all.json");

        if (isFinal) {
            Map<String, List<Map<String, Object>>> finalData = finalFile.exists()
                ? mapper.readValue(finalFile, new TypeReference<>() {})
                : new HashMap<>();
            finalData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(finalFile, finalData);
            System.out.println(">>> Saved to round3_final.json");
        }

        return "Round 3 submission saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving round3 submission for: " + username);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save round3 submission.");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/get_latest_round3")
public Map<String, Object> getLatestRound3Submission(@RequestBody Map<String, String> request) {
    String username = request.getOrDefault("username", "anonymous");
    File file = new File("submissions/round3/round3_all.json");
    ObjectMapper mapper = new ObjectMapper();

    try {
        if (!file.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 3 submissions found.");
        }

        Map<String, List<Map<String, Object>>> allData = mapper.readValue(file, new TypeReference<>() {});
        List<Map<String, Object>> userSubs = allData.get(username);
        if (userSubs == null || userSubs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 3 submission for user.");
        }

        return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read Round 3 submission.");
    }
}


    private String truncateJson(Map<String, Object> body, int maxLen) {
    try {
        ObjectMapper previewMapper = new ObjectMapper();
        String full = previewMapper.writeValueAsString(body);
        return full.length() > maxLen ? full.substring(0, maxLen) + "... [truncated]" : full;
    } catch (Exception e) {
        return "[error printing JSON]";
    }
}

private String nowIso() {
    return ZonedDateTime.now(ZoneId.of("America/New_York"))
            .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
}

private String nowIsoUtc() {
    // e.g., "2025-08-14T16:03:25Z"
    return DateTimeFormatter.ISO_INSTANT.format(Instant.now());
}

@SuppressWarnings("unchecked")
private Map<String, Object> readJsonFile(File f) throws IOException {
    if (!f.exists()) return new HashMap<>();
    ObjectMapper m = new ObjectMapper();
    return m.readValue(f, new TypeReference<Map<String, Object>>() {});
}

private void writeJsonFile(File f, Map<String, Object> data) throws IOException {
    f.getParentFile().mkdirs();
    ObjectMapper m = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    m.writeValue(f, data);
}

private java.time.Instant parseInstant(Object iso) {
    if (iso == null) return java.time.Instant.EPOCH;
    try { return java.time.Instant.parse(String.valueOf(iso)); } catch (Exception e) { return java.time.Instant.EPOCH; }
}

@SuppressWarnings("unchecked")
private java.util.List<Map<String, Object>> allMessages(Map<String, Object> store) {
    Map<String, List<Map<String, Object>>> chats = (Map<String, List<Map<String, Object>>>) store.get("chats");
    if (chats == null) return java.util.Collections.emptyList();
    List<Map<String, Object>> out = new ArrayList<>();
    for (List<Map<String, Object>> thread : chats.values()) {
        if (thread != null) out.addAll(thread);
    }
    return out;
}

private void ensureChatStoreExists() {
    if (!CHAT_DIR.exists()) {
        CHAT_DIR.mkdirs();
        System.out.println(">>> Created 'submissions/chat' directory.");
    }
    if (!CHAT_FILE.exists()) {
        try {
            ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
            Map<String, Object> root = new HashMap<>();
            root.put("chats", new HashMap<String, List<Map<String, Object>>>());
            root.put("updatedAt", nowIsoUtc());
            mapper.writeValue(CHAT_FILE, root);
            System.out.println(">>> Initialized chats_all.json");
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to initialize chat store");
        }
    }
}

/** Loads the full shared chat object: { chats: {...}, updatedAt: ... } */
@SuppressWarnings("unchecked")
private Map<String, Object> readChatStore(ObjectMapper mapper) throws IOException {
    ensureChatStoreExists();
    return mapper.readValue(CHAT_FILE, new TypeReference<Map<String, Object>>() {});
}

/** Writes the full shared chat object. */
private void writeChatStore(ObjectMapper mapper, Map<String, Object> store) throws IOException {
    store.put("updatedAt", nowIsoUtc());
    mapper.enable(SerializationFeature.INDENT_OUTPUT).writeValue(CHAT_FILE, store);
}

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/get_latest_chat")
public synchronized Map<String, Object> getLatestChat(@RequestBody Map<String, String> req) {
    String username = Objects.toString(req.get("username"), "").trim().toLowerCase();
    if (username.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username is required");
    }

    ObjectMapper mapper = new ObjectMapper();
    try {
        Map<String, Object> store = readChatStore(mapper);

        List<Map<String, Object>> msgs = allMessages(store);
        Instant oldest = Instant.MAX, latest = Instant.EPOCH;
        for (Map<String, Object> m : msgs) {
            Instant t = parseInstant(m.get("createdAt"));
            if (t.isBefore(oldest)) oldest = t;
            if (t.isAfter(latest)) latest = t;
        }
        if (msgs.isEmpty()) { oldest = Instant.EPOCH; latest = Instant.EPOCH; }

        Map<String, Object> seen = readJsonFile(CHAT_SEEN_FILE);
        @SuppressWarnings("unchecked")
        Map<String, Object> userState = (Map<String, Object>) seen.get(username);
        if (userState == null) userState = new HashMap<>();

        String previousLatestAt = Objects.toString(userState.getOrDefault("previousLatestAt", ""), "");
        @SuppressWarnings("unchecked")
        Map<String, Object> perDis = (Map<String, Object>) userState.getOrDefault("perDisagreement", Collections.emptyMap());

        Map<String, Object> response = new HashMap<>(store);
        response.put("previousLatestAt", previousLatestAt);
        response.put("oldestReturnedAt", oldest.equals(Instant.EPOCH) ? "" : oldest.toString());
        response.put("nowLatestAt", latest.equals(Instant.EPOCH) ? "" : latest.toString());
        response.put("usernames", userPasswords.keySet().stream().map(String::toLowerCase).sorted().toList());
        response.put("lastSeenByDis", perDis); // ⬅️ include per-disagreement seen map

        // Keep your existing behavior of advancing previousLatestAt
        userState.put("previousLatestAt", latest.equals(Instant.EPOCH) ? "" : latest.toString());
        seen.put(username, userState);
        writeJsonFile(CHAT_SEEN_FILE, seen);

        return response;
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read chat.");
    }
}



private static final java.util.regex.Pattern MENTION_RE =
    java.util.regex.Pattern.compile("(?<=^|\\s)@([a-z0-9_]+)", java.util.regex.Pattern.CASE_INSENSITIVE);

private List<String> extractMentions(String text, Set<String> allowed) {
    if (text == null) return List.of();
    java.util.regex.Matcher m = MENTION_RE.matcher(text);
    Set<String> out = new HashSet<>();
    while (m.find()) {
        String h = m.group(1).toLowerCase();
        if (allowed.contains(h)) out.add(h);
    }
    return new ArrayList<>(out);
}


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/submit_chat")
public synchronized Map<String, Object> submitChat(@RequestBody Map<String, Object> body) {
    String username = Objects.toString(body.get("username"), "").trim().toLowerCase();
    String disagreementId = Objects.toString(body.get("disagreementId"), "").trim();
    String parentId = Objects.toString(body.get("parentId"), "").trim();
    String content = Objects.toString(body.get("content"), "");

    if (username.isEmpty() || disagreementId.isEmpty() || content.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "missing fields");
    }

    // Allowed handles
    Set<String> allowed = new HashSet<>(userPasswords.keySet()
        .stream().map(String::toLowerCase).collect(Collectors.toSet()));

    // Mentions from body (optional), else extract from content
    @SuppressWarnings("unchecked")
    List<String> mentionsReq = (List<String>) body.get("mentions");
    List<String> mentions = (mentionsReq != null && !mentionsReq.isEmpty())
        ? mentionsReq.stream().map(s -> s.toLowerCase(Locale.ROOT))
            .filter(allowed::contains).distinct().toList()
        : extractMentions(content, allowed);

    // Build message object
    Map<String, Object> msg = new LinkedHashMap<>();
    msg.put("id", UUID.randomUUID().toString());
    msg.put("username", username);
    msg.put("parentId", parentId.isEmpty() ? null : parentId);
    msg.put("content", content);
    msg.put("createdAt", java.time.Instant.now().toString()); // UTC
    msg.put("is_deleted", false);
    msg.put("up", 0);
    msg.put("down", 0);
    msg.put("mentions", mentions); // ⬅️ store mentions

    // Persist to your chat store under the disagreementId (your existing logic)
    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    try {
        Map<String,Object> store = readChatStore(mapper);
        // store structure assumed { "chats": { "<id>": [ messages... ] } }
        Map<String, List<Map<String,Object>>> chats =
            (Map<String, List<Map<String,Object>>>) store.get("chats");
        if (chats == null) {
            chats = new HashMap<>();
            store.put("chats", chats);
        }
        List<Map<String,Object>> list = chats.computeIfAbsent(String.valueOf(disagreementId), k -> new ArrayList<>());
        list.add(msg);
        writeChatStore(mapper, store);

        // === Email notifications for mentions ===
try {
    // Who to notify? everyone mentioned, except the author
    Set<String> recipients = new HashSet<>();
    for (String m : mentions) {
        String mh = m == null ? "" : m.trim().toLowerCase(Locale.ROOT);
        if (!mh.isEmpty() && !mh.equals(username)) {
            recipients.add(mh);
        }
    }

    if (!recipients.isEmpty()) {
        // Optional: fetch disagreement title (if you keep it server-side; otherwise show ID)
        String disagreeTitle = "Disagreement " + disagreementId;

        String link = "https://panelb.codecomprehensibility.site/discussion.html?disagreement=" 
                      + java.net.URLEncoder.encode(disagreementId, java.nio.charset.StandardCharsets.UTF_8);

        String subject = "[Code Comprehensibility] You were mentioned in chat";
        String preview = content.length() > 140 ? content.substring(0, 140) + "…" : content;

        String emailbody = ""
            + "Hi,\n\n"
            + "@" + username + " mentioned you in the discussion.\n\n"
            + "Topic: " + disagreeTitle + "\n"
            + "Message preview:\n"
            + preview + "\n\n"
            + "Open the discussion: " + link + "\n\n"
            + "— Code Comprehensibility Study";

        for (String u : recipients) {
            String to = emailForUser(u);
            if (to != null && !to.isBlank()) {
                sendEmailViaPython(to, subject, emailbody);
            }
        }
    }
} catch (Exception notifyEx) {
    // Don't fail the request if email fails—just log it.
    System.err.println(">>> Mention notification failed: " + notifyEx.getMessage());
    notifyEx.printStackTrace();
}

        // return latest snapshot (or just the new message)
        return store;
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to write chat.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/delete_chat")
public synchronized Map<String, Object> deleteChat(@RequestBody Map<String, Object> req) {
    String username = Objects.toString(req.get("username"), "").trim();
    String messageId = Objects.toString(req.get("messageId"), "").trim();

    if (username.isEmpty() || messageId.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username and messageId are required");
    }

    ObjectMapper mapper = new ObjectMapper();
    try {
        Map<String, Object> store = readChatStore(mapper);

        @SuppressWarnings("unchecked")
        Map<String, List<Map<String, Object>>> chats =
                (Map<String, List<Map<String, Object>>>) store.get("chats");

        boolean found = false;
        outer:
        for (Map.Entry<String, List<Map<String, Object>>> e : chats.entrySet()) {
            List<Map<String, Object>> thread = e.getValue();
            for (Map<String, Object> m : thread) {
                if (messageId.equals(m.get("id"))) {
                    // Only author can delete (soft delete)
                    String author = Objects.toString(m.get("username"), "");
                    if (!author.equals(username)) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the author can delete this message");
                    }
                    m.put("is_deleted", true);
                    m.put("content", ""); // hide content but keep username/time/replies
                    found = true;
                    break outer;
                }
            }
        }

        if (!found) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "messageId not found");
        }

        writeChatStore(mapper, store);
        return store;
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update chat.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/vote_chat")
public synchronized Map<String, Object> voteChat(@RequestBody Map<String, Object> req) {
    String username = Objects.toString(req.get("username"), "").trim();
    String messageId = Objects.toString(req.get("messageId"), "").trim();
    int delta;
    try {
        delta = Integer.parseInt(Objects.toString(req.get("delta"), "0"));
    } catch (NumberFormatException nfe) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "delta must be +1 or -1");
    }
    if (username.isEmpty() || messageId.isEmpty() || !(delta == 1 || delta == -1)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username, messageId and delta (+1/-1) are required");
    }

    ObjectMapper mapper = new ObjectMapper();
    try {
        Map<String, Object> store = readChatStore(mapper);
        @SuppressWarnings("unchecked")
        Map<String, List<Map<String, Object>>> chats =
            (Map<String, List<Map<String, Object>>>) store.get("chats");

        boolean found = false;
        for (List<Map<String, Object>> thread : chats.values()) {
            for (Map<String, Object> m : thread) {
                if (messageId.equals(m.get("id"))) {
                    // votes: username -> +1 / -1
                    @SuppressWarnings("unchecked")
                    Map<String, Object> votes = (Map<String, Object>) m.get("votes");
                    if (votes == null) {
                        votes = new HashMap<>();
                        m.put("votes", votes);
                    }

                    // Toggle / change vote
                    int prev = Integer.parseInt(Objects.toString(votes.getOrDefault(username, 0)));
                    if (prev == delta) {
                        // same vote again -> unvote
                        votes.remove(username);
                    } else {
                        votes.put(username, delta);
                    }

                    // Recompute up/down from votes map
                    int up = 0, down = 0;
                    for (Object vObj : votes.values()) {
                        int v = Integer.parseInt(Objects.toString(vObj));
                        if (v == 1) up++;
                        else if (v == -1) down++;
                    }
                    m.put("up", up);
                    m.put("down", down);

                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        if (!found) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "messageId not found");
        }

        writeChatStore(mapper, store);
        return store; // return full shared chat so clients can refresh easily
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update vote.");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/set_last_seen_disagreement")
public synchronized Map<String, Object> setLastSeenDisagreement(@RequestBody Map<String, Object> body) {
    String username = Objects.toString(body.get("username"), "").trim().toLowerCase(Locale.ROOT);
    if (username.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username is required");
    }

    @SuppressWarnings("unchecked")
    Map<String, Object> seenMapIn = (Map<String, Object>) body.get("seen"); // {"12":"2024-08-20T21:46:59.860Z", ...}
    if (seenMapIn == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "seen map is required");
    }

    // Normalize keys to strings and values to ISO strings
    Map<String, String> normalized = new HashMap<>();
    for (Map.Entry<String, Object> e : seenMapIn.entrySet()) {
        String key = String.valueOf(e.getKey());
        String iso = Objects.toString(e.getValue(), "").trim();
        if (!iso.isEmpty()) normalized.put(key, iso);
    }

    try {
        // Load existing seen state file
        Map<String, Object> seenRoot = readJsonFile(CHAT_SEEN_FILE);
        @SuppressWarnings("unchecked")
        Map<String, Object> userState = (Map<String, Object>) seenRoot.get(username);
        if (userState == null) userState = new HashMap<>();

        // Merge strategy: keep the newer timestamp per disagreement
        @SuppressWarnings("unchecked")
        Map<String, Object> existing = (Map<String, Object>) userState.get("perDisagreement");
        Map<String, String> merged = new HashMap<>();
        if (existing != null) {
            for (Map.Entry<String, Object> e : existing.entrySet()) {
                String k = String.valueOf(e.getKey());
                String v = Objects.toString(e.getValue(), "");
                if (!v.isEmpty()) merged.put(k, v);
            }
        }
        for (Map.Entry<String, String> e : normalized.entrySet()) {
            String k = e.getKey();
            String newIso = e.getValue();
            String oldIso = merged.get(k);
            if (oldIso == null) {
                merged.put(k, newIso);
            } else {
                Instant ni = parseInstant(newIso);
                Instant oi = parseInstant(oldIso);
                if (ni.isAfter(oi)) merged.put(k, newIso);
            }
        }

        userState.put("perDisagreement", merged);
        seenRoot.put(username, userState);
        writeJsonFile(CHAT_SEEN_FILE, seenRoot);

        Map<String, Object> resp = new HashMap<>();
        resp.put("ok", true);
        resp.put("username", username);
        resp.put("perDisagreement", merged);
        return resp;
    } catch (IOException ioe) {
        ioe.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to persist seen state");
    }
}

private static final String R4_TRANSFER   = "/home/ubuntu/expertsApp/ServerApp/submissions/round4/transfer4.py";
private static final String R4_RENDER_IN  = "/home/ubuntu/expertsApp/ServerApp/submissions/round4/round4_final_transfered.json";
private static final String R4_RENDER_OUT = "/var/www/html/live-ranking.html";
private static final String R4_TOHTML     = "/home/ubuntu/scripts/tohtml.py";


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/submit_round4")
public synchronized String handleRound4Submission(@RequestBody Map<String, Object> body) {
    String username = (String) body.getOrDefault("username", "anonymous");
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    boolean isFinal = "1".equals(String.valueOf(body.get("submitted")));

    System.out.println(">>> [submit_round4] Submission received from: " + username);

    File directory = new File("submissions/round4");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions/round4' directory.");
    }

    File allFile = new File(directory, "round4_all.json");
    File finalFile = new File(directory, "round4_final.json");

    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("isFinal", isFinal);
        wrapped.put("data", body);

        Map<String, List<Map<String, Object>>> allData = allFile.exists()
            ? mapper.readValue(allFile, new TypeReference<>() {})
            : new HashMap<>();
        allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
        mapper.writeValue(allFile, allData);
        System.out.println(">>> Saved to round4_all.json");

        if (isFinal) {
            Map<String, List<Map<String, Object>>> finalData = finalFile.exists()
                ? mapper.readValue(finalFile, new TypeReference<>() {})
                : new HashMap<>();
            finalData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(finalFile, finalData);
            System.out.println(">>> Saved to round4_final.json");
        }

        // Always attempt to run the HTML renderer after each submission (final or not)
        //     This is non-fatal: any error is logged but won't break the submission API.
        runRound4Pipeline();


        return "Round 4 submission saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving round4 submission for: " + username);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save round4 submission.");
    }
}

/** Runs: python3 /home/ubuntu/scripts/tohtml.py --in R4_RENDER_IN --out R4_RENDER_OUT
 *  Non-fatal: logs errors and returns. 180s timeout, stdout+stderr captured to logs.
 */
private void runRound4Pipeline() {
    try {
        // Step 1: Run transfer4.py
        List<String> transferCmd = List.of("python3", R4_TRANSFER);
        System.out.println(">>> [round4_pipeline] Running transfer: " + String.join(" ", transferCmd));
        runProcessAndLog(transferCmd, 60);

        // Step 2: Run tohtml.py (only if transfer succeeded and output exists)
        File inFile = new File(R4_RENDER_IN);
        if (!inFile.exists()) {
            System.err.println(">>> [round4_pipeline] Skip render: input not found " + R4_RENDER_IN);
            return;
        }

        List<String> renderCmd = List.of("python3", R4_TOHTML, "--in", R4_RENDER_IN, "--out", R4_RENDER_OUT);
        System.out.println(">>> [round4_pipeline] Running render: " + String.join(" ", renderCmd));
        runProcessAndLog(renderCmd, 180);

    } catch (Exception e) {
        System.err.println(">>> [round4_pipeline] Failed: " + e.getMessage());
        e.printStackTrace();
    }
}

/** Utility to run a process with timeout and stream logs. */
private void runProcessAndLog(List<String> cmd, int timeoutSeconds) throws Exception {
    ProcessBuilder pb = new ProcessBuilder(cmd);
    pb.redirectErrorStream(true);

    Process p = pb.start();
    try (java.util.Scanner sc = new java.util.Scanner(p.getInputStream())) {
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            System.out.println(">>> " + cmd.get(1) + ": " + line);
        }
    }

    boolean finished = p.waitFor(timeoutSeconds, java.util.concurrent.TimeUnit.SECONDS);
    if (!finished) {
        p.destroyForcibly();
        throw new RuntimeException("Command timed out: " + String.join(" ", cmd));
    }

    if (p.exitValue() != 0) {
        throw new RuntimeException("Command failed (" + p.exitValue() + "): " + String.join(" ", cmd));
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/get_latest_round4")
public Map<String, Object> getLatestRound4Submission(@RequestBody Map<String, String> request) {
    String username = request.getOrDefault("username", "anonymous");
    File file = new File("submissions/round4/round4_all.json");
    ObjectMapper mapper = new ObjectMapper();

    try {
        if (!file.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 4 submissions found.");
        }

        Map<String, List<Map<String, Object>>> allData = mapper.readValue(file, new TypeReference<>() {});
        List<Map<String, Object>> userSubs = allData.get(username);
        if (userSubs == null || userSubs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 4 submission for user.");
        }

        // Return only the raw payload like in previous rounds
        return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read Round 4 submission.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/get_latest_round4_final")
public Map<String, Object> getLatestRound4Final(@RequestBody Map<String, String> request) {
    String username = request.getOrDefault("username", "anonymous");
    File file = new File("submissions/round4/round4_final.json");
    ObjectMapper mapper = new ObjectMapper();

    try {
        if (!file.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No final Round 4 submissions found.");
        }

        Map<String, List<Map<String, Object>>> finalData = mapper.readValue(file, new TypeReference<>() {});
        List<Map<String, Object>> userSubs = finalData.get(username);
        if (userSubs == null || userSubs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No final Round 4 submission for user.");
        }

        return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read final Round 4 submission.");
    }
}

private static final File CHAT_FINISHED_FILE = new File("submissions/chat/finished.json");

@SuppressWarnings("unchecked")
private Map<String, Object> readFinishedStore() throws IOException {
    if (!CHAT_DIR.exists()) CHAT_DIR.mkdirs();
    if (!CHAT_FINISHED_FILE.exists()) {
        Map<String, Object> init = new HashMap<>();
        init.put("updatedAt", nowIsoUtc());
        init.put("users", new HashMap<String, List<String>>()); // username -> [chatId, ...]
        writeJsonFile(CHAT_FINISHED_FILE, init);
    }
    return readJsonFile(CHAT_FINISHED_FILE);
}

private void writeFinishedStore(Map<String, Object> store) throws IOException {
    store.put("updatedAt", nowIsoUtc());
    writeJsonFile(CHAT_FINISHED_FILE, store);
}

@SuppressWarnings("unchecked")
private List<String> getFinishedIdsForUser(Map<String, Object> store, String usernameLc) {
    Map<String, Object> users = (Map<String, Object>) store.get("users");
    if (users == null) return Collections.emptyList();
    Object raw = users.get(usernameLc);
    if (raw == null) return Collections.emptyList();
    List<String> list = new ArrayList<>();
    if (raw instanceof List<?>) {
        for (Object o : (List<?>) raw) if (o != null) list.add(String.valueOf(o));
    }
    // stable sort (by insertion order json might not keep), but we'll sort for determinism
    Collections.sort(list);
    return list;
}

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/update_finished_chat")
public synchronized Map<String, Object> updateFinishedChat(@RequestBody Map<String, Object> body) {
    String username = Objects.toString(body.get("username"), "").trim().toLowerCase(Locale.ROOT);
    String chatId   = Objects.toString(body.get("chatId"), "").trim();
    String op       = Objects.toString(body.get("op"), "").trim().toLowerCase(Locale.ROOT);

    if (username.isEmpty() || chatId.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username and chatId are required");
    }
    // Optionally restrict to known users (comment this out if you want to allow anyone)
    if (!userPasswords.keySet().stream().map(String::toLowerCase).collect(Collectors.toSet()).contains(username)) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "unknown user");
    }

    // derive action
    Boolean doneFlag = (body.get("done") instanceof Boolean) ? (Boolean) body.get("done") : null;
    boolean add;
    if ("add".equals(op)) add = true;
    else if ("remove".equals(op)) add = false;
    else if (doneFlag != null) add = doneFlag;
    else {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "must include either done:true/false or op:add/remove");
    }

    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    try {
        Map<String, Object> store = readFinishedStore();

        @SuppressWarnings("unchecked")
        Map<String, Object> users = (Map<String, Object>) store.get("users");
        if (users == null) {
            users = new HashMap<>();
            store.put("users", users);
        }

        @SuppressWarnings("unchecked")
        List<String> current = (List<String>) users.get(username);
        if (current == null) current = new ArrayList<>();

        // operate using a set for uniqueness
        Set<String> s = new LinkedHashSet<>(current);
        boolean changed;
        if (add) {
            changed = s.add(chatId);
        } else {
            changed = s.remove(chatId);
        }

        if (changed) {
            users.put(username, new ArrayList<>(s)); // back to list for JSON
            writeFinishedStore(store);
        }

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("ok", true);
        resp.put("username", username);
        resp.put("action", add ? "added" : "removed");
        resp.put("chatId", chatId);
        resp.put("finishedIds", getFinishedIdsForUser(store, username));
        resp.put("updatedAt", store.get("updatedAt"));
        return resp;

    } catch (IOException ioe) {
        ioe.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update finished chat state");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/get_finished_chats")
public Map<String, Object> getFinishedChats(@RequestBody Map<String, Object> body) {
    String username = Objects.toString(body.get("username"), "").trim().toLowerCase(Locale.ROOT);
    if (username.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username is required");
    }

    try {
        Map<String, Object> store = readFinishedStore();
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("ok", true);
        resp.put("username", username);
        resp.put("finishedIds", getFinishedIdsForUser(store, username));
        resp.put("updatedAt", store.get("updatedAt"));
        return resp;
    } catch (IOException ioe) {
        ioe.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read finished chats");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://panelb.codecomprehensibility.site"})
@PostMapping("/submit_referrals")
public synchronized String handleExpertReferrals(@RequestBody Map<String, Object> body) {
    String referrerEmail = String.valueOf(body.getOrDefault("referrerEmail", "unknown")).trim();
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    System.out.println(">>> [submit_referrals] Referrals received from: " + referrerEmail);
    System.out.println(">>> Timestamp: " + timestamp);

    // Ensure directory exists
    File directory = new File("submissions");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions' directory.");
    }

    File referralsFile = new File("submissions/expert_referrals.json");
    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        // Extract and sanitize referrals
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> rawReferrals =
                (List<Map<String, Object>>) body.getOrDefault("referrals", new ArrayList<>());

        List<Map<String, String>> cleaned = new ArrayList<>();
        for (Object o : rawReferrals) {
            if (!(o instanceof Map)) continue;
            @SuppressWarnings("unchecked")
            Map<String, Object> r = (Map<String, Object>) o;

            String name  = r.getOrDefault("name",  "").toString().trim();
            String email = r.getOrDefault("email", "").toString().trim();

            // Skip completely empty rows
            if (name.isEmpty() && email.isEmpty()) continue;

            // Optional: skip rows with clearly invalid emails (but don't be too strict)
            if (!email.isEmpty() && !looksLikeEmail(email)) {
                System.out.println(">>> Skipping invalid email: " + email);
                continue;
            }

            Map<String, String> entry = new HashMap<>();
            entry.put("name", name);
            entry.put("email", email);
            cleaned.add(entry);
        }

        // Optionally cap to avoid abuse (keep the first 50)
        if (cleaned.size() > 50) {
            cleaned = cleaned.subList(0, 50);
        }

        // Build wrapped record
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("referrerEmail", referrerEmail);
        wrapped.put("referrals", cleaned);

        // Append to file
        List<Map<String, Object>> allData = referralsFile.exists()
                ? mapper.readValue(referralsFile, new TypeReference<>() {})
                : new ArrayList<>();
        allData.add(wrapped);
        mapper.writeValue(referralsFile, allData);

        System.out.println(">>> Saved to expert_referrals.json (" + cleaned.size() + " items)");

        // Send confirmation email to the referrer (optional)
        String subject = "Thanks for your colleague recommendations";
        String message = "Thank you for recommending colleagues for the Code Comprehension Study.\n\n"
                + "We have received " + cleaned.size() + " entr" + (cleaned.size() == 1 ? "y" : "ies") + ". "
                + "If you’d like to add or update suggestions, just reply to this email.\n\n"
                + "— Code Comprehension Study Team";
        if (!"unknown".equalsIgnoreCase(referrerEmail)) {
            System.out.println(">>> Sending referral receipt email to: " + referrerEmail);
            sendEmailViaPython(referrerEmail, subject, message);
        }

        return "Referrals saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving referrals from: " + referrerEmail);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save referrals.");
    }
}

/** Minimal email sanity check (not strict). */
private static boolean looksLikeEmail(String s) {
    return s != null && s.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");
}





}
