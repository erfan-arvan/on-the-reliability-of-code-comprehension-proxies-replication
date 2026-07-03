# Snippets and Comprehension Tasks

This file documents the 8 code snippets shown to participants and the 
comprehension tasks (questions) asked for each snippet.


---


## Snippet 1 — `isValidProjectName`

```java
public static boolean isValidProjectName(String name) {
    if (name == null) {
        return false;
    }
    if (name.startsWith(".")) {
        return false;
    }
    if ((name.length() < 1) || (name.length() > MAX_NAME_LENGTH)) {
        return false;
    }
    for (int i = 0; i < name.length(); i++) {
        char c = name.charAt(i);
        if (!Character.isLetterOrDigit(c) && !VALID_NAME_SET.contains(c)) {
            return false;
        }
    }
    return true;
}
```


### Tasks

**Q1 (Output prediction (short answer), id: `output`)**

What value does the method return when called with the following input, considering the following assumptions?
  Input: "a1_"

  Assumptions:
  
    MAX_NAME_LENGTH is defined as 10
    VALID_NAME_SET is a Set<Character> that contains: '_', '-', and '.'


**Q2 (Syntax/binary question (Yes/No), id: `syntaxBL`)**

Is MAX_NAME_LENGTH used in a conditional expression?


**Q3 (Function description (open-ended), id: `function`)**

What does this code snippet do? Briefly describe its main functionality.


**Q4 (Likert scale, id: `scaleSM`)**

How easy or difficult was this snippet to understand?

Scale: Very easy · Easy · Neutral · Difficult · Very difficult



---


## Snippet 2 — `isRemote`

```java
public static boolean isRemote(URI uri) {
    if (isFilesystemPath(uri)) {
        return false;
    }
    String scheme = uri.getScheme();
    if (scheme == null) {
        return false;
    }
    switch (scheme) {
        case "file":
        case "jar":
            return false;
        default:
            break;
    }
    return true;
}
```


### Tasks

**Q1 (Output prediction (short answer), id: `output`)**

What value does the method return when called with the following input, considering the following assumptions?
  Input: isRemote(URI.create("http://example.com"))

  Assumptions:
  
    The method isFilesystemPath(uri) returns false for this input.


**Q2 (Syntax/binary question (Yes/No), id: `syntaxBL`)**

Does the switch statement include more than two case labels?


**Q3 (Function description (open-ended), id: `function`)**

What does this code snippet do? Briefly describe its main functionality.


**Q4 (Likert scale, id: `scaleSM`)**

How easy or difficult was this snippet to understand?

Scale: Very easy · Easy · Neutral · Difficult · Very difficult



---


## Snippet 3 — `isMachineTypeDefined`

```java
public static boolean isMachineTypeDefined(short type) {
    if (type == IMAGE_FILE_MACHINE_UNKNOWN) {
        // Unsupported machine type
        return false;
    }
    for (Field field : CoffMachineType.class.getDeclaredFields()) {
        if (!field.isSynthetic()) {
            int modifiers = field.getModifiers();
            if (Modifier.isFinal(modifiers) && Modifier.isStatic(modifiers)) {
                try {
                    if (field.getShort(null) == type) {
                        return true;
                    }
                } catch (IllegalAccessException e) {
                    continue;
                }
            }
        }
    }
    return false;
}
```


### Tasks

**Q1 (Output prediction (short answer), id: `output`)**

What value does the method return when called with the following input, considering the following assumptions?
  Input: (short) 999

  Assumptions:
  
    IMAGE_FILE_MACHINE_UNKNOWN = 0
    CoffMachineType has exactly three declared public static final short fields:
    
      IMAGE_FILE_MACHINE_AMD64 = (short) 34404
      IMAGE_FILE_MACHINE_ARM = (short) 448
      IMAGE_FILE_MACHINE_I386 = (short) 332
    
    getDeclaredFields() returns the fields in the order listed above.
    No IllegalAccessException is thrown during execution.


**Q2 (Syntax/binary question (Yes/No), id: `syntaxBL`)**

Is the variable modifiers initialized using a method call on the right-hand side?


**Q3 (Function description (open-ended), id: `function`)**

What does this code snippet do? Briefly describe its main functionality.


**Q4 (Likert scale, id: `scaleSM`)**

How easy or difficult was this snippet to understand?

Scale: Very easy · Easy · Neutral · Difficult · Very difficult



---


## Snippet 4 — `indexOfIgnoreCase`

```java
public static int indexOfIgnoreCase(CharSequence str, CharSequence searchStr, int startPos) {
    if (str == null || searchStr == null) {
        return INDEX_NOT_FOUND;
    }
    if (startPos < 0) {
        startPos = 0;
    }
    int searchStrLen = searchStr.length();
    int endLimit = str.length() - searchStrLen + 1;
    if (startPos > endLimit) {
        return INDEX_NOT_FOUND;
    }
    if (searchStrLen == 0) {
        return startPos;
    }
    for (int i = startPos; i < endLimit; i++) {
        if (regionMatches(str, true, i, searchStr, 0, searchStrLen)) {
            return i;
        }
    }
    return INDEX_NOT_FOUND;
}
```


### Tasks

**Q1 (Output prediction (short answer), id: `output`)**

What value does the method return when called with the following input, considering the following assumptions?
  Input: Str = "AbcXabc", searchStr = "ABC", startPos = 1

  Assumptions:
  
    INDEX_NOT_FOUND = -1
    regionMatches(CharSequence cs, boolean ignoreCase, int thisStart, CharSequence substring, int start, int length) behaves like String.regionMatches(...) in Java, but works on CharSequence.
    All inputs are standard Java String objects (which implement CharSequence).


**Q2 (Syntax/binary question (Yes/No), id: `syntaxBL`)**

Is the variable endLimit declared inside the for loop?


**Q3 (Function description (open-ended), id: `function`)**

What does this code snippet do? Briefly describe its main functionality.

  Notes:
  
    regionMatches(CharSequence cs, boolean ignoreCase, int thisStart, CharSequence substring, int start, int length) behaves like String.regionMatches(...) in Java, but works on CharSequence.
    All inputs are standard Java String objects (which implement CharSequence).


**Q4 (Likert scale, id: `scaleSM`)**

How easy or difficult was this snippet to understand?

Scale: Very easy · Easy · Neutral · Difficult · Very difficult



---


## Snippet 5 — `deleteRecursively`

```java
public static boolean deleteRecursively(@Nullable Path root) throws IOException {
    if (root == null) return false;
    if (!Files.exists(root)) return false;

    Files.walkFileTree(root, new SimpleFileVisitor<>() {
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
            Files.delete(file);
            return FileVisitResult.CONTINUE;
        }
        @Override
        public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
            Files.delete(dir);
            return FileVisitResult.CONTINUE;
        }
    });

    return true;
}
```


### Tasks

**Q1 (Output prediction (short answer), id: `output`)**

What value does the method return when called with the following input, considering the following assumptions?
  Input: Paths.get("/tmp/example")

  Assumptions:
  
    /tmp/example is a directory that exists and contains a single file: /tmp/example/foo.txt.
    Files.exists(...) returns true for /tmp/example.
    Files.walkFileTree(...) visits the file before the directory.
    All Files.delete(...) calls succeed and no exceptions are thrown.


**Q2 (Syntax/binary question (Yes/No), id: `syntaxBL`)**

Is the method walkFileTree passed exactly two arguments?


**Q3 (Function description (open-ended), id: `function`)**

What does this code snippet do? Briefly describe its main functionality.


**Q4 (Likert scale, id: `scaleSM`)**

How easy or difficult was this snippet to understand?

Scale: Very easy · Easy · Neutral · Difficult · Very difficult



---


## Snippet 6 — `CharSequence`

```java
public static int encodedLength(CharSequence sequence) {
    // Optimized implementation
    int utf16Length = sequence.length();
    int utf8Length = utf16Length;
    int i = 0;

    while (i < utf16Length && sequence.charAt(i) < 0x80) {
        i++;
    }

    for (; i < utf16Length; i++) {
        char c = sequence.charAt(i);
        if (c < 0x800) {
            utf8Length += ((0x7f - c) >>> 31);
        } else {
            utf8Length += encodedLengthGeneral(sequence, i);
            break;
        }
    }

    if (utf8Length < utf16Length) {
        throw new IllegalArgumentException(
            "UTF-8 length does not fit in int: " + (utf8Length + (1L << 32)));
    }

    return utf8Length;
}
```


### Tasks

**Q1 (Output prediction (short answer), id: `output`)**

What value does the method return when called with the following input, considering the following assumptions?
  Input: "abऩd"

  Assumptions:
  
    encodedLengthGeneral(...) returns 2 when called.
    'ऩ' has code point 0x929 ≥ 0x800.
    No exception is thrown.


**Q2 (Syntax/binary question (Yes/No), id: `syntaxBL`)**

Is the variable c declared inside the body of the for loop?


**Q3 (Function description (open-ended), id: `function`)**

What does this code snippet do? Briefly describe its main functionality.


**Q4 (Likert scale, id: `scaleSM`)**

How easy or difficult was this snippet to understand?

Scale: Very easy · Easy · Neutral · Difficult · Very difficult



---


## Snippet 7 — `lowestPositiveRoot`

```java
public static float lowestPositiveRoot(float a, float b, float c) {
    float det = b * b - 4 * a * c;
    if (det < 0) return Float.NaN;

    float sqrtD = (float)Math.sqrt(det);
    float invA = 1 / (2 * a);
    float r1 = (-b - sqrtD) * invA;
    float r2 = (-b + sqrtD) * invA;

    if (r1 > r2) {
        float tmp = r2;
        r2 = r1;
        r1 = tmp;
    }

    if (r1 > 0) return r1;
    if (r2 > 0) return r2;
    return Float.NaN;
}
```


### Tasks

**Q1 (Output prediction (short answer), id: `output`)**

What value does the method return when called with the following input?
  Input: a = 1f, b = 2f, c = -3f


**Q2 (Syntax/binary question (Yes/No), id: `syntaxBL`)**

Does the if (r1 > r2) block contain a variable declaration?


**Q3 (Function description (open-ended), id: `function`)**

What does this code snippet do? Briefly describe its main functionality.


**Q4 (Likert scale, id: `scaleSM`)**

How easy or difficult was this snippet to understand?

Scale: Very easy · Easy · Neutral · Difficult · Very difficult



---


## Snippet 8 — `atan2`

```java
public static float atan2(float y, float x) {
    float n = y / x;

    if (n != n)
        n = (y == x ? 1f : -1f);
    else if (n - n != n - n)
        x = 0f;

    if (x > 0)
        return atanUnchecked(n);
    else if (x < 0) {
        if (y >= 0) return atanUnchecked(n) + PI;
        return atanUnchecked(n) - PI;
    } else if (y > 0)
        return x + HALF_PI;
    else if (y < 0)
        return x - HALF_PI;

    return x + y;
}
```


### Tasks

_(questions not found)_
