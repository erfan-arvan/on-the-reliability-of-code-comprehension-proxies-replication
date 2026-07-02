const snippets = [
  {
    id: 1,
    title: "Snippet 1",
    methodName: "isValidProjectName",
    code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isValidProjectName</span>(<span class="type">String</span> name) {
    <span class="keyword">if</span> (name == <span class="literal">null</span>) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">if</span> (name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-')">startsWith</a>(<span class="string">"."</span>)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">if</span> ((name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#length--')">length</a>() < <span class="number">1</span>) || (name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#length--')">length</a>() > MAX_NAME_LENGTH)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">for</span> (<span class="type">int</span> i = <span class="number">0</span>; i < name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#length--')">length</a>(); i++) {
        <span class="type">char</span> c = name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#charAt-int-')">charAt</a>(i);
        <span class="keyword">if</span> (!Character.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLetterOrDigit-char-')">isLetterOrDigit</a>(c) && !VALID_NAME_SET.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/util/Set.html#contains-java.lang.Object-')">contains</a>(c)) {
            <span class="keyword">return</span> <span class="literal">false</span>;
        }
    }
    <span class="keyword">return</span> <span class="literal">true</span>;
}
`,
    responses: [
    {
      "participant": "expertC",
      "summary": "validation method for a string name\n\nMakes sure the name isn't empty, doesn't start with a period, isn't too long\n\nMakes sure each char of string is a letter or digit and is within some Constant set of allowed characters",
      "comprehensibility": "Isn't clear why we need both the letter or digit check and also valid name set. I would think the valid name set could easily contain all letters and numbers and avoid the other check. Because of the AND in the if statement, things need to be in the valid name set, so I would drop that separate check for isLetterOrDigit\n\nOtherwise very easy to understand and follow"
    },
    {
      "participant": "expertB",
      "summary": "The code validates whether the input name is valid, given the restrictions defined in the application (nullability, length, and valid characters).",
      "comprehensibility": "The code is easy to comprehend.\n\nThe code is well structured, as each condition evaluates an independent factor to know whether the input string is a valid project name.\n\nThe evaluated conditions also build upon the previous ones making the code easy to follow when reading it sequentially."
    },
    {
      "participant": "expertA",
      "summary": "Implements some rules that make a project name invalid. If a project name does not satisfy the rules implemented, then the name is valid.",
      "comprehensibility": "Method and variable names are very clear. Simple to understand."
    },
    {
      "participant": "expertE",
      "summary": "This method checks whether a given project name is valid. It rejects names that are: (1) null, (2) start with a dot, (3) are too short (less than 1) or too long (over a defined maximum length), or (4) contain characters that aren’t letters, digits, or part of an allowed predefined character set. If the name passes all those checks, it returns true.",
      "comprehensibility": "I started by looking at the method signature and then read through the methods and its various checks from top to bottom. The code is pretty easy to understand because each condition is simple and the early returns make the logic straightforward. The variable and method names also make the intent clear — it’s obvious this is validating a project name. The only part that requires a quick glance is the reference to the predefined character set, since you’d need to see what’s in that set to know exactly what’s allowed. A comment may be useful there. Other than that, the snippet is clean and very readable."
    },
    {
      "participant": "expertD",
      "summary": "There is a definition of how to call a name, and this function defines whether the name is valid or not based on what is expected.",
      "comprehensibility": "It is an understandable method, but the initial validations could be summarized a little without losing the readability of the code."
    }
  ]},
  {
    id: 2,
    title: "Snippet 2",
    methodName: "isRemote",
    code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isRemote</span>(<span class="type">URI</span> uri) {
    <span class="keyword">if</span> (<span class="function">isFilesystemPath</span>(uri)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="type">String</span> scheme = uri.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/net/URI.html#getScheme--')">getScheme</a>();
    <span class="keyword">if</span> (scheme == <span class="literal">null</span>) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">switch</span> (scheme) {
        <span class="keyword">case</span> <span class="string">"file"</span>:
        <span class="keyword">case</span> <span class="string">"jar"</span>:
            <span class="keyword">return</span> <span class="literal">false</span>;
        <span class="keyword">default</span>:
            <span class="keyword">break</span>;
    }
    <span class="keyword">return</span> <span class="literal">true</span>;
}
`,
    responses: [
    {
      "participant": "expertC",
      "summary": "Checks if a URI is a remote(non-local) location",
      "comprehensibility": "Not clear why the hardcoded checks for 'file' and 'jar' are there. Maybe they cannot be remote?\n\nSwitch statement is easy to understand but turning it into an if statement would turn like 8 lines of code into 2\n\nOr really I'd combine them all, ```if scheme == null || scheme.equals(\"file\") || scheme.equals(\"jar\")``` return false\n\nI think when you have very limited cases, and when you're not really doing different things with those cases (in this case, we have 3 cases that do 1 thing, return false) the switch statement is overkill"
    },
    {
      "participant": "expertB",
      "summary": "The snippet defines any URI that points to a file system path, a file, a jar, or lacks a URI scheme definition, as non-remote URIs.",
      "comprehensibility": "The comprehensibility is not bad but it's not perfect either. Part of the check is given by a call to a function to assess if the URI points to a file system path, and the rest of the code makes a remoteness decision based on the scheme of the URI. As these are two independent grouping categories, the code could be clearer making the separation of concerns a bit more explicit (for instance having an `isSchemeRemote`/`isSchemeLocal` function. Nevertheless the code is short enough that it is still comprehensible."
    },
    {
      "participant": "expertA",
      "summary": "Implements some rules that determine if a given URI is not remote. If no rule is satisfied, the method concludes that the URI is remote.",
      "comprehensibility": "Is concise, method names are explicit and simple to understand. Overall, good comprehensibility."
    },
    {
      "participant": "expertE",
      "summary": "This method checks whether a given URI should be considered “remote.” It returns false: (1) for filesystem paths; (2) if the URI has no scheme; or (3) if the scheme is something local like file or jar. For anything else, it treats the URI as remote and returns true.",
      "comprehensibility": "I went through the snippet line by line and looked at the early-return conditions to see how it decides whether a URI is considered remote. The logic is pretty straightforward, and the switch statement makes the handling of local schemes clear. The only part that requires a little guesswork is the call to isFilesystemPath(uri) since that method isn’t shown— a short comment explaining what counts as a filesystem path would make that intention a bit clearer. Otherwise, the code is easy to read and generally understand."
    },
    {
      "participant": "expertD",
      "summary": "is the filter that receives a URI to determine whether it is a remote URI or not.",
      "comprehensibility": "The code is clear and easy to read in its operation due to its good structure."
    }
  ]
  },
  {
    id: 3,
    title: "Snippet 3",
    methodName: "isMachineTypeDefined",
    code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isMachineTypeDefined</span>(<span class="type">short</span> type) {
    <span class="keyword">if</span> (type == IMAGE_FILE_MACHINE_UNKNOWN) {
        <span class="comment">// Unsupported machine type</span>
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">for</span> (<span class="type">Field</span> field : CoffMachineType.<span class="function">class</span>.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#getDeclaredFields--')">getDeclaredFields</a>()) {
        <span class="keyword">if</span> (!field.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#isSynthetic--')">isSynthetic</a>()) {
            <span class="type">int</span> modifiers = field.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#getModifiers--')">getModifiers</a>();
            <span class="keyword">if</span> (<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Modifier.html#isFinal-int-')">Modifier.isFinal</a>(modifiers) && <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Modifier.html#isStatic-int-')">Modifier.isStatic</a>(modifiers)) {
                <span class="keyword">try</span> {
                    <span class="keyword">if</span> (field.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#getShort-java.lang.Object-')">getShort</a>(<span class="literal">null</span>) == type) {
                        <span class="keyword">return</span> <span class="literal">true</span>;
                    }
                } <span class="keyword">catch</span> (<span class="type">IllegalAccessException</span> e) {
                    <span class="keyword">continue</span>;
                }
            }
        }
    }
    <span class="keyword">return</span> <span class="literal">false</span>;
}
`,
    responses: [
      {
        id: 1,
        participant: "expertA",
        summary: `<p>Uses reflection to implement a checker that verifies if a given value matches the value of any of the declared static final attributes or fields in the class CoffMachineType.</p>`,
        comprehensibility: `<p>It is simple to comprehend for someone familiar with reflection. The use of the for-each loop simplifies the intention of the check.</p>`
      },
      {
        id: 2,
        participant: "expertB",
        summary: `<p>In case the CoffMachineType has declared fields the code throws a null pointer exception in line 11. Otherwise it will return false.</p>`,
        comprehensibility: `<p>The code is difficult to comprehend. By the name it's expected that the short representation of a type (input value) is checked to know whether it is defined as a "MachineType". Line 2 validation is very specific and covers only the case when the type is associated to an IMAGE_FILE_MACHINE and this is unknown, which is strange. Line 6 explicitly checks values for a CoffMachineType, suggesting a very narrow domain. Line 11 will always throw a null pointer exception trying to convert null into a Short.</p>`
      },
      {
        id: 3,
        participant: "expertC",
        summary: `<p>Takes a short and returns if it's a known machine type.</p>`,
        comprehensibility: `<p>Not clear what fields we're checking or what isSynthetic is doing. If it's not synthetic, it checks the modifiers and sees if they're static and final, and then if they are and the field matches our type then it's valid. It is incomprehensible without context of what a Machine Type is, what the CoffMachineType class is, what isSynthetic does, and why we would check all the fields of that class. Would need to see the class to know; I would think we would define some array of types and use that.</p>`
      },
      {
        id: 4,
        participant: "expertD",
        summary: `<p>Creates the validation of a machine type, where a type is received as a short variable and verified if it is a known type. If it is a known type, it checks whether the type entered is within CoffMachineType, filtering that it has been generated by the compiler and that it must be of final and static type (and clearly not an empty value). If all of this is true, the result is true; otherwise, it is false.</p>`,
        comprehensibility: `<p>The code is clear, concise, and uses the language's native resources to simplify its understanding.</p>`
      },
      {
        id: 5,
        participant: "expertE",
        summary: `<p>This method checks whether the given type value corresponds to any of the machine type constants defined in the CoffMachineType class. It skips the IMAGE_FILE_MACHINE_UNKNOWN value, then uses reflection to loop through the class’s static final fields and compares each one’s short value to the input. If it finds a match, it returns true; otherwise it returns false</p>`,
        comprehensibility: `<p>I read through the snippet from top to bottom and focused on what the method was trying to check and how it went about doing that. The basic idea is pretty easy to follow once you notice it’s looping over constants in a class, but the use of reflection makes it a little harder to read at first glance. Reflection typically requires a moment to think about what fields are being inspected and why. The check for static final fields helps clarify the intent, but it’s still not immediately obvious unless you’re familiar with how reflection works in Java. A short comment explaining why reflection is being used would make the code a bit easier to digest. Overall, it’s understandable, just not as straightforward as it would be without reflection.</p>`
      }
    ]
  },
  {
    id: 4,
    title: "Snippet 4",
    methodName: "indexOfIgnoreCase",
    code: `<span class="keyword">public static</span> <span class="type">int</span> <span class="function">indexOfIgnoreCase</span>(<span class="type">CharSequence</span> str, <span class="type">CharSequence</span> searchStr, <span class="type">int</span> startPos) {
    <span class="keyword">if</span> (str == <span class="literal">null</span> || searchStr == <span class="literal">null</span>) {
        <span class="keyword">return</span> INDEX_NOT_FOUND;
    }
    <span class="keyword">if</span> (startPos < <span class="number">0</span>) {
        startPos = <span class="number">0</span>;
    }
    <span class="type">int</span> searchStrLen = searchStr.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#length--')">length</a>();
    <span class="type">int</span> endLimit = str.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#length--')">length</a>() - searchStrLen + <span class="number">1</span>;
    <span class="keyword">if</span> (startPos > endLimit) {
        <span class="keyword">return</span> INDEX_NOT_FOUND;
    }
    <span class="keyword">if</span> (searchStrLen == <span class="number">0</span>) {
        <span class="keyword">return</span> startPos;
    }
    <span class="keyword">for</span> (<span class="type">int</span> i = startPos; i < endLimit; i++) {
        <span class="keyword">if</span> (<span class="function">regionMatches</span>(str, <span class="literal">true</span>, i, searchStr, <span class="number">0</span>, searchStrLen)) {
            <span class="keyword">return</span> i;
        }
    }
    <span class="keyword">return</span> INDEX_NOT_FOUND;
}`,
    responses: [
    {
      "participant": "expertC",
      "summary": "Based on method signature - indexOf method but it ignores case, with optional start position parameter (assuming it's optional based on other indexOf implementations I've seen)\n\nScanning code:\nerror case check up front\ndefault case check for start pos\nSet array index bounds\nerror case check that string is 1 char or less\nerror case that search string is empty (I don't think returning start pos makes sense here I would return index not found but as long as that's documented that could be OK)\n\nNow scan through string and see if each substring is the string we're looking for",
      "comprehensibility": "I found it flowed very naturally and was easy to understand. The variable names made a lot of sense and each if statement had a clear check it was doing.\n\nMy only question was line 13-14 why return startPos. Maybe that's standard practice and I haven't used IndexOf recently enough.\n\nThis is probably how I would code it up making it as clear as possible (like for an interview)\n\nMost straightforward code so far but maybe biased because it's a simple index of check"
    },
    {
      "participant": "expertB",
      "summary": "The code returns the index of a substring `searchStr` inside a given string `str` using an offset of `startPos` to search inside the `str`. Allegedly the function ignores case sensitivity. In cases when the `searchStr` is an empty string the `startPos` value is returned.",
      "comprehensibility": "The snippet is ok. The good things:\n- Uses well defined constants to express the concept of an `INDEX_NOT_FOUND`\n- Variables have meaningful names\n- Defines variables with useful concepts that build upon each other to compute the business logic.\n\nGiven that we don't know the implementation of the `regionMatches` method we have to assume that the second or fourth parameters indicate that case-sensitivity has to be ignored in the matching."
    },
    {
      "participant": "expertA",
      "summary": "Apparently, given a string, the function will return an index greater than or equals to the provided position, that corresponds to the starting position of the substring contained in the original string.",
      "comprehensibility": "Pros: names are, for the most part, simple to understand. Early returns make easy to identify special cases that needs to be handled. Indentation is just what one would expect to easily follow the code.\n\nCons: str is not a good method name. Same applies to endLimit. Not clear where the IgnoreCase part of the method is implemented (yes, the second arg in regionMatches seems to be the one that controls the ignore case logic, but that's something not explicit in this snippet)"
    },
    {
      "participant": "expertE",
      "summary": "This method performs a case-insensitive search for a substring within a larger character sequence, starting at a given position passed in as a parameter to the function. If it finds a match, it returns the index where the match begins. If the input is invalid or no match is found, it returns a special “not found” value.",
      "comprehensibility": "I started by looking at the parameters and then read through the method from top to bottom to see how it handled the search. The overall flow is pretty easy to follow because the conditions are simple and the early returns make the logic clear. The variable names are straightforward and descriptive, and the loop that checks each position lines up with how you’d expect a substring search to work. The only part that isn’t immediately obvious is what regionMatches does without seeing its implementation, but the name gives you a good hint, and a short comment there might help if that method isn't in the same file or nearby. Overall, the snippet is clean and easy to understand."
    },
    {
      "participant": "expertD",
      "summary": "searches for the position where a sequence of characters begins within another sequence of characters",
      "comprehensibility": "The code is clear in its objective, declaring the statements in order and giving me the desired result."
    }
  ],
  },
  {
    id: 5,
    title: "Snippet 5",
    methodName: "deleteRecursively",
    code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">deleteRecursively</span>(@Nullable <span class="type">Path</span> root) <span class="keyword">throws</span> <span class="type">IOException</span> {
    <span class="keyword">if</span> (root == <span class="literal">null</span>) <span class="keyword">return</span> <span class="literal">false</span>;
    <span class="keyword">if</span> (!<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#exists-java.nio.file.Path-java.nio.file.LinkOption...-')">Files.exists</a>(root)) <span class="keyword">return</span> <span class="literal">false</span>;

    <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#walkFileTree-java.nio.file.Path-java.nio.file.FileVisitor-')">Files.walkFileTree</a>(root, <span class="keyword">new</span> <span class="type">SimpleFileVisitor</span>&lt;&gt;() {
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">visitFile</span>(<span class="type">Path</span> file, <span class="type">BasicFileAttributes</span> attrs) <span class="keyword">throws</span> <span class="type">IOException</span> {
            <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#delete-java.nio.file.Path-')">Files.delete</a>(file);
            <span class="keyword">return</span> FileVisitResult.CONTINUE;
        }
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">postVisitDirectory</span>(<span class="type">Path</span> dir, <span class="type">IOException</span> exc) <span class="keyword">throws</span> <span class="type">IOException</span> {
            <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#delete-java.nio.file.Path-')">Files.delete</a>(dir);
            <span class="keyword">return</span> FileVisitResult.CONTINUE;
        }
    });

    <span class="keyword">return</span> <span class="literal">true</span>;
}
`,
    responses: [
    {
      "participant": "expertC",
      "summary": "Delete a local file directory and all sub directories",
      "comprehensibility": "error cases (line 2-3) are straigthforward and make sense.\n\nmethod names like 'walkFileTree' make sense in this context.\n\nWe're using fancy java lambdas or whatever here, which maybe makes it a little more complicated but overall it makes sense because of the easy to understand class name and method names"
    },
    {
      "participant": "expertB",
      "summary": "It deletes all files and directories inside a given filesystem path.",
      "comprehensibility": "The comprehensibility is good except for the name of the function. The main function `deleteRecursively` being named `-recursively` may lead a code reader into thinking that the method was implemented using recursion. In this case the method itself is not written recursively (Files.walkFileTree may or may not use a recursive pattern but this is out of the scope of this function). Instead the method could be called \"deepDelete\" or something similar to avoid reading the method looking for a recursive call that doesn't actually happen."
    },
    {
      "participant": "expertA",
      "summary": "Deletes a folder, starting from its content.",
      "comprehensibility": "Simple only for someone familiar with the visitor pattern. Most of the comprehensibility comes from the good naming used by the API elements being called so it is easily comprehensively"
    },
    {
      "participant": "expertE",
      "summary": "This method deletes the file or directory at the given path passed into the method. If the path is a directory, it recursively deletes all files and subdirectories, then deletes the directory itself. It returns true only if the path is non-null and exists.",
      "comprehensibility": "I assessed the snippet’s comprehensibility by reading it top-down and checking for clear and traditional structure, familiar APIs, generally accepted naming conventions, and consistent flow. The method is relatively easy to understand because it uses a straightforward control flow and well-known Java NIO constructs like Files.walkFileTree and SimpleFileVisitor. The overridden visitFile and postVisitDirectory methods make the deletion logic explicit and predictable.\n\nThe main difficulty is that understanding recursive deletion through a file-tree visitor requires familiarity with how walkFileTree behaves, so someone new to that API might find it less intuitive. Additionally, the snippet provides no comments explaining why these methods are overridden or what assumptions are being made about edge cases (e.g., symbolic links, partial failures). Brief comments could make the intent clearer and help readers understand the boundaries of its correctness."
    },
    {
      "participant": "expertD",
      "summary": "deletes all files from a directory that is given as a parameter",
      "comprehensibility": "The code is understandable, although it is difficult to understand why the methods are organized in this way."
    }
  ]
  },
  {
    id: 6,
    title: "Snippet 6",
    methodName: "encodedLength",
    code: `
<span class="keyword">public static</span> <span class="type">int</span> <span class="function">encodedLength</span>(<span class="type">CharSequence</span> sequence) {
    <span class="comment">// Optimized implementation</span>
    <span class="type">int</span> utf16Length = sequence.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#length--')">length</a>();
    <span class="type">int</span> utf8Length = utf16Length;
    <span class="type">int</span> i = <span class="number">0</span>;

    <span class="keyword">while</span> (i < utf16Length && sequence.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#charAt-int-')">charAt</a>(i) < <span class="literal">0x80</span>) {
        i++;
    }

    <span class="keyword">for</span> (; i < utf16Length; i++) {
        <span class="type">char</span> c = sequence.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#charAt-int-')">charAt</a>(i);
        <span class="keyword">if</span> (c < <span class="literal">0x800</span>) {
            utf8Length += ((<span class="literal">0x7f</span> - c) >>> <span class="number">31</span>);
        } <span class="keyword">else</span> {
            utf8Length += <span class="function">encodedLengthGeneral</span>(sequence, i);
            <span class="keyword">break</span>;
        }
    }

    <span class="keyword">if</span> (utf8Length < utf16Length) {
        <span class="keyword">throw new</span> <span class="type">IllegalArgumentException</span>(
            <span class="string">"UTF-8 length does not fit in int: "</span> + (utf8Length + (<span class="literal">1L</span> << <span class="number">32</span>)));
    }

    <span class="keyword">return</span> utf8Length;
}
`,
    responses: [
    {
      "participant": "expertC",
      "summary": "Get encoded length of a string (as Char Sequence)",
      "comprehensibility": "This code confuses me but I'm also not very familiar with UTF 8 vs. 16 and the bitwise stuff that's going on.\n\nline 7 while loop confuses me. It's probably important but I don't know why. Not sure what the <0x80 does. But it looks important. This will increment 'i' to ~something~ for the next loop\n\nFor loop - more comparisons to binary stuff that doesn't mean anything to me. Would have to look up these special characters.\n\nIn the end it seems to be incrementing the utf8Length based on the string somehow, doing a error case check, and returning it. Overall not very comprehensible to me. Anytime you're doing stuff like this, you NEED comments. the one comment 'Optimized Implementation' just tells me the obvious, or tells me someone did this on purpose at least."
    },
    {
      "participant": "expertB",
      "summary": "What it does: Depending on the input string the code throws an index out of bounds exception in line 12.\n\nWhat maybe it tries to do: It may try to encode the integer value corresponding to the length of a characters sequence into the integer representation of a the length of a string in UTF-8. This description doesn't even make sense but it may be that someone needs that at some point (?)",
      "comprehensibility": "The comprehensibility is extremely bad. The factors that make it hard to understand are:\n\n- UTF-8 is a string encoding. From line 1 you would expect the length of the input CharSequence to be encoded as a UTF-8 string, but instead the method returns an integer.\n- line 7 gives a condition to a loop that depends both on the length of the input CharSequence as well as the specific values contained in this sequence. Not clear why ascii values above 0x80 would not be considered.\n- Checking the 0x80 value (128) we can assume that most characters given in a CharSequence will be under 128, hence line 12 will in most cases throw an index out of bounds exception.\n- Line 14 uses bit shift which can be clever and optimised for some operations but normally doesn't lead to easy understanding of code in most scenarios.\n- Line 16 calls another function that probably does something very similar to the current function but it's unclear what we could expect from a function that uses an unreliable index and the input sequence as parameters.\n- In general the function is extremely cryptic and most likely incorrect"
    },
    {
      "participant": "expertA",
      "summary": "No idea. Encodes a string into a number, but the nature of the encoding is ciphered.",
      "comprehensibility": "The logic relies on some magic numbers that are not explained. Without that information, it is hard to guess the purpose of encodedLengthGeneral. The local variables shed a bit of light on the purpose, but nothing conclusive. Overall, not very comprehensible."
    },
    {
      "participant": "expertE",
      "summary": "This method appears to be calculating how many bytes a given CharSequence would take if it were encoded as UTF-8.  The method iterates through the characters, skipping over the ASCII range, then adjusts the count for multi-byte UTF-8 characters. If the resulting length would overflow an int data type, it throws an exception. Otherwise, it returns the computed UTF-8 byte length.",
      "comprehensibility": "I read through the snippet step by step and tried to figure out how the length calculation worked and why certain branches existed. I don't think overall idea is too hard to follow once you realize it’s computing UTF-8 length from UTF-16 characters, and the early loop that skips ASCII makes sense. The harder part is the bit-level expressions like ((0x7f - c) >>> 31), which aren’t immediately obvious unless you’ve seen or worked with that style of optimization before. The lack of comments around the more complex arithmetic also makes it take a little longer to understand and discern what’s going on. Overall, it’s readable, but some of the low-level operations require a little extra thinking."
    },
    {
      "participant": "expertD",
      "summary": "iterates through a sequence of characters to define   the length of utf8 characters in that sequence",
      "comprehensibility": "It is difficult to follow the thread of the code when operating with numbers and the numerical values of a letter.\nThe handling of the exception is not well specified.\nIt is difficult to understand the purpose of the first while loop when there is immediately another for loop that iterates the same condition that has already been validated by the while loop.\nThe comment at the beginning does not provide me with any guiding information, but rather indicates a state of the code that is not important when reading it.\ni don't know what is the CharSequence object definition, and the method is not called like action"
    }
  ]
  },
  {
    id: 7,
    title: "Snippet 7",
    methodName: "lowestPositiveRoot",
    code: `
<span class="keyword">public static</span> <span class="type">float</span> <span class="function">lowestPositiveRoot</span>(<span class="type">float</span> a, <span class="type">float</span> b, <span class="type">float</span> c) {
    <span class="type">float</span> det = b * b - <span class="number">4</span> * a * c;
    <span class="keyword">if</span> (det < <span class="number">0</span>) <span class="keyword">return</span> <span class="type">Float</span>.NaN;

    <span class="type">float</span> sqrtD = (<span class="type">float</span>)<span class="type">Math</span>.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#sqrt-double-')">sqrt</a>(det);
    <span class="type">float</span> invA = <span class="number">1</span> / (<span class="number">2</span> * a);
    <span class="type">float</span> r1 = (-b - sqrtD) * invA;
    <span class="type">float</span> r2 = (-b + sqrtD) * invA;

    <span class="keyword">if</span> (r1 > r2) {
        <span class="type">float</span> tmp = r2;
        r2 = r1;
        r1 = tmp;
    }

    <span class="keyword">if</span> (r1 > <span class="number">0</span>) <span class="keyword">return</span> r1;
    <span class="keyword">if</span> (r2 > <span class="number">0</span>) <span class="keyword">return</span> r2;
    <span class="keyword">return</span> <span class="type">Float</span>.NaN;
}
`,
    responses: [
    {
      "participant": "expertC",
      "summary": "Gets the lowest possible positive square root of 3 numbers (That's based on reading the method signature)\n\nReading through the code:\nCalculates 'det' and does a sanity check/error case\nCalculates a few other variables\nIf r1 is greater than r2, switch them around\nReturn whatever is positive checking in order r1 and r2",
      "comprehensibility": "I'm not familiar enough with the math to know the abbreviation 'det' or 'r'\n\nI'm not familiar enough with it to know why we need to switch around r1 and r2\n\nI would simplify it and combine the if statements, like if r1 is bigger just check if r2>0 and return it. the swapping of numbers seems unnecessary.\n\nUsing variable 'tmp' to switch things around is hard to keep track of at first glance, until you see it's just swapping numbers."
    },
    {
      "participant": "expertB",
      "summary": "This code gives the root for a second degree polynomial of the form ax^2+bx+c=0.\n\nEdit: Initially I didn't notice that the code was using the quadratic formula to compute the roots of a second degree polynomial. I'm changing this review after I realised this is the case after the final questions in the survey.\n\n---\nOriginal response: \n\nNot sure what this code does. Depending on the inputs it could return a Float.NaN. Otherwise it does some seemingly random computations and returns one of those computations as a result.",
      "comprehensibility": "The comprehensibility is alright. Given that I didn't learn this formula in English I'm not sure if the components of the equation are called something similar to Det and Inv. Nevertheless I think the variable naming could be improved. In addition to it using Float is not the best decision give it could lead to arithmetic mistakes. Instead something like BigDecimal could be a better choice.\n\n---\nOriginal:\n\nThe comprehensibility is bad.\n\n- The main name makes you understand that we'll be trying to find the lowest root for the three input numbers, but the math inside the method is quite confusing.\n- Line 2 computes what by the name of the variable would be expected to be a \"determinant\", making you think that the values come from a matrix, but this doesn't make sense.\n- Line 6 would make you think an inverse of a number is being calculated, but it's rather the \"double multiplicative inverse\".\n- The code does some sorting in an ascending manner but it's not clear whether the values that are being sort make sense. It could be that all the math executed in lines 2 to 8 are indeed some \"root\" computation for 3 input float numbers. In that case the code would make some sense."
    },
    {
      "participant": "expertA",
      "summary": "Implements the quadratic function formula to return the lowest positive root of a function represented by the coefficients a, b, and c.",
      "comprehensibility": "Not good. It requires previous knowledge to understand the purpose of the method. \n\ndet, sqrtD, invA, r1, and r2 mean nothing to someone not familiar with the quadratic function formula."
    },
    {
      "participant": "expertE",
      "summary": "This method solves a quadratic equation and returns the smallest positive root. It first checks the discriminant, then computes both roots, sorts them so the smaller one is ordered first, and returns the first positive one it finds. If neither root is positive or the discriminant is negative, it returns Float.NaN.",
      "comprehensibility": "I started by looking at the parameters and then read through the method from top to bottom to see how it handles the quadratic equation. The flow is easy to follow because it more or less mirrors how you’d solve a quadratic by hand: check the discriminant, compute both roots, sort them, and then pick the smallest positive one. The variable names also follow normal mathematical naming conventions, which makes it easier to keep track of what’s going on. The only part that takes a second to think about is the little swap section to reorder the roots, but even that makes sense once you notice why it’s there. Overall, the method is clear and pretty straightforward to understand."
    },
    {
      "participant": "expertD",
      "summary": "It is the calculation of the positive square root of a small number. Validating whether a value is null.",
      "comprehensibility": "The names of the variables are unclear, which makes it quite difficult to understand (even though it is a mathematical principle)."
    }
  ]
  },
  {
    id: 8,
    title: "Snippet 8",
    methodName: "atan2",
    code: `
<span class="keyword">public static</span> <span class="type">float</span> <span class="function">atan2</span>(<span class="type">float</span> y, <span class="type">float</span> x) {
    <span class="type">float</span> n = y / x;

    <span class="keyword">if</span> (n != n)
        n = (y == x ? <span class="number">1f</span> : <span class="number">-1f</span>);
    <span class="keyword">else if</span> (n - n != n - n)
        x = <span class="number">0f</span>;

    <span class="keyword">if</span> (x > <span class="number">0</span>)
        <span class="keyword">return</span> <span class="function">atanUnchecked</span>(n);
    <span class="keyword">else if</span> (x < <span class="number">0</span>) {
        <span class="keyword">if</span> (y >= <span class="number">0</span>) <span class="keyword">return</span> <span class="function">atanUnchecked</span>(n) + PI;
        <span class="keyword">return</span> <span class="function">atanUnchecked</span>(n) - PI;
    } <span class="keyword">else if</span> (y > <span class="number">0</span>)
        <span class="keyword">return</span> x + HALF_PI;
    <span class="keyword">else if</span> (y < <span class="number">0</span>)
        <span class="keyword">return</span> x - HALF_PI;

    <span class="keyword">return</span> x + y;
}
`,
    responses: [
    {
      "participant": "expertC",
      "summary": "A complete guess is that this is related to arctangent but I could be wrong, not familiar with 'atan' otherwise. I would guess it takes the square of arc tangent? Don't know enough about math to know why XD\n\nReading the rest of the code, it returns 'atanUnchecked' so maybe it's literally like 'V2' of atan",
      "comprehensibility": "using x y and n for variables makes it not so easy to comprehend\n\nnot clear what the if/else is doing line 4-7. I can understand it's setting some initial values in edge cases but not sure why\n\nThe code itself is straightforward, the if statements are simple and things like method calls and reference to PI makes sense but I don't know enough to say if it's correct or why it's doing these things"
    },
    {
      "participant": "expertB",
      "summary": "I'm not sure what this snippet does. I guess it's trying to compute the atan2 mathematical function but I it's definitely not implemented properly.",
      "comprehensibility": "The code is terrible. The first if/else condition does nothing as the if conditions for lines 4 and 6 are never true.\n\nThe last line (line 19) returns the sum of two coordinates, when the atan2 function should return a result in degrees or radians.\n\nLines 15 and 17 are operating between a coordinate value and a radians value, which again doesn't make sense.\n\nIn order to analise the rest of the code I'd need to review what the atan2 function math is, but I think it's not necessary as the rest of the implementation is so flawed."
    },
    {
      "participant": "expertA",
      "summary": "No idea.",
      "comprehensibility": "atan, and the presence of HALF_PI suggest that this method could be related to some computation of an arctan, but neither the method name nor the local variables shed any light on the purpose of the method; in other words, the method is ciphered. Only a person with previous knowledge has the key to decipher it."
    },
    {
      "participant": "expertE",
      "summary": "This method computes an approximation of atan2(y, x), which is the angle of the point (x, y) in radians. It handles different quadrants by checking the signs of x and y, uses a fallback when the y/x ratio is undefined or produces NaN, and then adjusts the result with either pi or pi/2 depending on where the point lies. The actual angle calculation is done through a helper method called atanUnchecked.",
      "comprehensibility": "I looked at the parameters first and then read through the method from top to bottom to see how it was trying to approximate atan2. The general structure appears to be similar to how you’d reason about the problem by hand — compute the y/x ratio and then figure out the correct quadrant based on the signs of x and y. That part makes the intent fairly easy to follow. The harder part is the NaN handling using expressions like n != n and n - n != n - n, which isn’t very intuitive unless you’ve seen that pattern before. It’s also not a traditional way to check for NaN, since most code would use built-in helper functions like Float.isNaN(), so it takes a moment to understand what the code is doing. Without comments explaining those cases, you have to stop and think about what’s going on. Overall, the snippet is understandable, but the NaN checks make it harder to read than it should be."
    },
    {
      "participant": "expertD",
      "summary": "is the calculation of an arctangent, returning a rational number for an angle.",
      "comprehensibility": "It's understandable, but the names of the variables and the function are a little confusing. You can use Java validation in the first if and elif statements. The lack of curly brackets {} prevents me from seeing explicitly where the conditions begin and end."
    }
  ]
  }
];
