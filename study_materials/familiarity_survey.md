# Background Knowledge (Familiarity) Survey

Participants answered the following questions before the study to assess their background knowledge relevant to the code snippets.

Each topic has two parts:
1. **Familiarity check** — Yes/No self-assessment
2. **Multiple-choice question** — to verify understanding


## URIs

### Topic 1: `uri_scheme`

**Familiarity question:** Are you familiar with the concept of Uniform Resource Identifier (URI) schemes?

**Knowledge check:** Which part of “http://example.com/page.html” is the URI scheme?

- [ ] example.com
- [✓] http
- [ ] /page.html
- [ ] ://

### Topic 2: `file_vs_network_uri`

**Familiarity question:** Do you know the difference between filesystem URIs and remote/network URIs?

**Knowledge check:** What is the main difference between a file:// URI and http:// or ftp:// URIs?

- [ ] file:// URIs are always encrypted, while http:// and ftp:// are not
- [ ] file:// URIs can only be used on Linux, while http:// and ftp:// work everywhere
- [ ] file:// URIs automatically delete files, while http:// and ftp:// only read them
- [✓] file:// URIs refer to local filesystem resources, while http:// and ftp:// URIs refer to network resources


## Java

### Topic 3: `reflection`

**Familiarity question:** Are you familiar with the Java Reflection API?

**Knowledge check:** Which of the following is an example of reflection?

- [ ] Checking if a variable is null
- [ ] Writing a loop to iterate over numbers
- [ ] Converting an integer to a string
- [✓] Listing all methods of an object at runtime

### Topic 4: `visitor_walkFileTree`

**Familiarity question:** Are you familiar with the Visitor design pattern, particularly as used in Java’s Files.walkFileTree API?

**Knowledge check:** What is the main purpose of using the Visitor pattern in Files.walkFileTree?

- [✓] It lets you define what happens at each file or directory visit while the API handles the traversal logic.
- [ ] It automatically performs recursive deletion of directories.
- [ ] It provides faster traversal by avoiding recursion.
- [ ] It stores metadata about files and directories for later access.


## Unicode

### Topic 5: `utf8_utf16`

**Familiarity question:** Do you know the difference between UTF-8 and UTF-16 Unicode encodings?

**Knowledge check:** Which statement best describes the main difference between UTF-8 and UTF-16?

- [ ] UTF-8 is fixed-length, while UTF-16 is variable-length.
- [ ] UTF-16 is backward compatible with ASCII, while UTF-8 is not.
- [ ] UTF-8 and UTF-16 both use exactly 2 bytes for every character.
- [✓] UTF-8 uses 1 to 4 bytes per character, while UTF-16 uses 2 or 4 bytes per character.


## Bits

### Topic 6: `bitwise_ops`

**Familiarity question:** Do you know what bitwise operators (e.g., &, |, ^, >>, >>>) do in programming?

**Knowledge check:** In Java, what does the operator >>> do?

- [ ] Signed right shift (preserves the sign bit)
- [✓] Unsigned right shift (fills left bits with zeros)
- [ ] Left shift (fills right bits with zeros)
- [ ] Bitwise OR


## Number Systems

### Topic 7: `hex_to_dec`

**Familiarity question:** Do you know how to convert between hexadecimal and decimal numbers without using a calculator?

**Knowledge check:** What is the decimal value of the hexadecimal constant 0x7F?

- [ ] 80
- [✓] 127
- [ ] 128
- [ ] 255


## Math

### Topic 8: `quadratic`

**Familiarity question:** Are you familiar with the quadratic formula?

**Knowledge check:** The quadratic formula gives the roots of ax² + bx + c = 0 as:

- [✓] (–b ± √(b² – 4ac)) / (2a)
- [ ] (–a ± √(a² – 4bc)) / (2b)
- [ ] (–c ± √(c² – 4ab)) / (2a)
- [ ] (–b ± √(a² + b² + c²)) / (2)

### Topic 9: `atan`

**Familiarity question:** Are you familiar with the arctangent (atan) function?

**Knowledge check:** The function Math.atan(x) is used to:

- [ ] Compute the magnitude of a vector
- [✓] Compute the angle of a vector in the correct quadrant
- [ ] Convert radians to degrees
- [ ] Calculate sine and cosine simultaneously


## Floating Point

### Topic 10: `nan`

**Familiarity question:** Are you familiar with the concept of NaN (Not a Number) and its behavior in Java?

**Knowledge check:** In Java, when x is a floating-point variable, which of the following expressions evaluates to true if and only if x is NaN?

- [ ] x == NaN
- [✓] x != x
- [ ] x++ > x
- [ ] It is not possible to check for NaN in Java

### Topic 11: `fp_singularities`

**Familiarity question:** Are you familiar with Java’s handling of floating-point singularities (such as division by zero)?

**Knowledge check:** What is the result of evaluating 1.0 / 0.0 in Java?

- [ ] NaN
- [✓] Infinity
- [ ] 0.0
- [ ] Throws an exception
