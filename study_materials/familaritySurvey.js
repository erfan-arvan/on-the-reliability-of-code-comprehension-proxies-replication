    const topics = [
  {
    "id": "uri_scheme",
    "tag": "URIs",
    "familiarity": {
      "q": "Are you familiar with the concept of Uniform Resource Identifier (URI) schemes?"
    },
    "mcq": {
      "q": "Which part of “http://example.com/page.html” is the URI scheme?",
      "options": ["example.com", "http", "/page.html", "://"],
      "correctIndex": 1
    }
  },
  {
    "id": "file_vs_network_uri",
    "tag": "URIs",
    "familiarity": {
      "q": "Do you know the difference between filesystem URIs and remote/network URIs?"
    },
    "mcq": {
      "q": "What is the main difference between a file:// URI and http:// or ftp:// URIs?",
      "options": [
        "file:// URIs are always encrypted, while http:// and ftp:// are not",
        "file:// URIs can only be used on Linux, while http:// and ftp:// work everywhere",
        "file:// URIs automatically delete files, while http:// and ftp:// only read them",
        "file:// URIs refer to local filesystem resources, while http:// and ftp:// URIs refer to network resources"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": "reflection",
    "tag": "Java",
    "familiarity": {
      "q": "Are you familiar with the Java Reflection API?"
    },
    "mcq": {
      "q": "Which of the following is an example of reflection?",
      "options": [
        "Checking if a variable is null",
        "Writing a loop to iterate over numbers",
        "Converting an integer to a string",
        "Listing all methods of an object at runtime"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": "visitor_walkFileTree",
    "tag": "Java",
    "familiarity": {
      "q": "Are you familiar with the Visitor design pattern, particularly as used in Java’s Files.walkFileTree API?"
    },
    "mcq": {
      "q": "What is the main purpose of using the Visitor pattern in Files.walkFileTree?",
      "options": [
        "It lets you define what happens at each file or directory visit while the API handles the traversal logic.",
        "It automatically performs recursive deletion of directories.",
        "It provides faster traversal by avoiding recursion.",
        "It stores metadata about files and directories for later access."
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "utf8_utf16",
    "tag": "Unicode",
    "familiarity": {
      "q": "Do you know the difference between UTF-8 and UTF-16 Unicode encodings?"
    },
    "mcq": {
      "q": "Which statement best describes the main difference between UTF-8 and UTF-16?",
      "options": [
        "UTF-8 is fixed-length, while UTF-16 is variable-length.",
        "UTF-16 is backward compatible with ASCII, while UTF-8 is not.",
        "UTF-8 and UTF-16 both use exactly 2 bytes for every character.",
        "UTF-8 uses 1 to 4 bytes per character, while UTF-16 uses 2 or 4 bytes per character."
      ],
      "correctIndex": 3
    }
  },
  {
    "id": "bitwise_ops",
    "tag": "Bits",
    "familiarity": {
      "q": "Do you know what bitwise operators (e.g., &, |, ^, >>, >>>) do in programming?"
    },
    "mcq": {
      "q": "In Java, what does the operator >>> do?",
      "options": [
        "Signed right shift (preserves the sign bit)",
        "Unsigned right shift (fills left bits with zeros)",
        "Left shift (fills right bits with zeros)",
        "Bitwise OR"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": "hex_to_dec",
    "tag": "Number Systems",
    "familiarity": {
      "q": "Do you know how to convert between hexadecimal and decimal numbers without using a calculator?"
    },
    "mcq": {
      "q": "What is the decimal value of the hexadecimal constant 0x7F?",
      "options": ["80", "127", "128", "255"],
      "correctIndex": 1
    }
  },
  {
    "id": "quadratic",
    "tag": "Math",
    "familiarity": {
      "q": "Are you familiar with the quadratic formula?"
    },
    "mcq": {
      "q": "The quadratic formula gives the roots of ax² + bx + c = 0 as:",
      "options": [
        "(–b ± √(b² – 4ac)) / (2a)",
        "(–a ± √(a² – 4bc)) / (2b)",
        "(–c ± √(c² – 4ab)) / (2a)",
        "(–b ± √(a² + b² + c²)) / (2)"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "atan",
    "tag": "Math",
    "familiarity": {
      "q": "Are you familiar with the arctangent (atan) function?"
    },
    "mcq": {
      "q": "The function Math.atan(x) is used to:",
      "options": [
        "Compute the magnitude of a vector",
        "Compute the angle of a vector in the correct quadrant",
        "Convert radians to degrees",
        "Calculate sine and cosine simultaneously"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": "nan",
    "tag": "Floating Point",
    "familiarity": {
      "q": "Are you familiar with the concept of NaN (Not a Number) and its behavior in Java?"
    },
    "mcq": {
      "q": "In Java, when x is a floating-point variable, which of the following expressions evaluates to true if and only if x is NaN?",
      "options": ["x == NaN", "x != x", "x++ > x", "It is not possible to check for NaN in Java"],
      "correctIndex": 1
    }
  },
  {
    "id": "fp_singularities",
    "tag": "Floating Point",
    "familiarity": {
      "q": "Are you familiar with Java’s handling of floating-point singularities (such as division by zero)?"
    },
    "mcq": {
      "q": "What is the result of evaluating 1.0 / 0.0 in Java?",
      "options": ["NaN", "Infinity", "0.0", "Throws an exception"],
      "correctIndex": 1
    }
  }
]
