const snippetsOriginal = [
    {
      id: 1,
      title: "Snippet 1",
              code:`
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isValidProjectName</span>(<span class="type">String</span> name) {
      <span class="keyword">if</span> (name == <span class="literal">null</span>) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">if</span> (name.<span class="function">startsWith</span>(<span class="string">"."</span>)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">if</span> ((name.<span class="function">length</span>() < <span class="number">1</span>) || (name.<span class="function">length</span>() > MAX_NAME_LENGTH)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">for</span> (<span class="type">int</span> i = <span class="number">0</span>; i < name.<span class="function">length</span>(); i++) {
        <span class="type">char</span> c = name.<span class="function">charAt</span>(i);
        <span class="keyword">if</span> (!Character.<span class="function">isLetterOrDigit</span>(c) && !VALID_NAME_SET.<span class="function">contains</span>(c)) {
          <span class="keyword">return</span> <span class="literal">false</span>;
        }
      }
      <span class="keyword">return</span> <span class="literal">true</span>;
    }
      `
          },
          {
            id: 2,
            title: "Snippet 2",
            code: `<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isRemote</span>(<span class="type">URI</span> uri) {
      <span class="keyword">if</span> (<span class="function">isFilesystemPath</span>(uri)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="type">String</span> scheme = uri.<span class="function">getScheme</span>();
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
    `
          },
          {
            id: 3,
            title: "Snippet 3",
            code: `<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isMachineTypeDefined</span>(<span class="type">short</span> type) {
      <span class="keyword">if</span> (type == IMAGE_FILE_MACHINE_UNKNOWN) {
        <span class="comment">// Unsupported machine type</span>
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">for</span> (<span class="type">Field</span> field : CoffMachineType.<span class="function">class</span>.<span class="function">getDeclaredFields</span>()) {
        <span class="keyword">if</span> (!field.<span class="function">isSynthetic</span>()) {
          <span class="type">int</span> modifiers = field.<span class="function">getModifiers</span>();
          <span class="keyword">if</span> (<span class="function">Modifier.isFinal</span>(modifiers) && <span class="function">Modifier.isStatic</span>(modifiers)) {
            <span class="keyword">try</span> {
              <span class="keyword">if</span> (field.<span class="function">getShort</span>(<span class="literal">null</span>) == type) {
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
    `
          },
          {
            id: 4,
            title: "Snippet 4",
            code: `<span class="keyword">public static</span> <span class="type">int</span> <span class="function">indexOfIgnoreCase</span>(<span class="type">CharSequence</span> str, <span class="type">CharSequence</span> searchStr, <span class="type">int</span> startPos) {
      <span class="keyword">if</span> (str == <span class="literal">null</span> || searchStr == <span class="literal">null</span>) {
        <span class="keyword">return</span> INDEX_NOT_FOUND;
      }
      <span class="keyword">if</span> (startPos < <span class="number">0</span>) {
        startPos = <span class="number">0</span>;
      }
      <span class="type">int</span> searchStrLen = searchStr.<span class="function">length</span>();
      <span class="type">int</span> endLimit = str.<span class="function">length</span>() - searchStrLen + <span class="number">1</span>;
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
    }
    `
          },
          {
            id: 5,
            title: "Snippet 5",
            code: `<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">deleteRecursively</span>(@Nullable <span class="type">Path</span> root) <span class="keyword">throws</span> <span class="type">IOException</span> {
      <span class="keyword">if</span> (root == <span class="literal">null</span>) <span class="keyword">return</span> <span class="literal">false</span>;
      <span class="keyword">if</span> (!Files.<span class="function">exists</span>(root)) <span class="keyword">return</span> <span class="literal">false</span>;

      Files.<span class="function">walkFileTree</span>(root, <span class="keyword">new</span> <span class="type">SimpleFileVisitor</span>&lt;&gt;() {
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">visitFile</span>(<span class="type">Path</span> file, <span class="type">BasicFileAttributes</span> attrs) <span class="keyword">throws</span> <span class="type">IOException</span> {
          Files.<span class="function">delete</span>(file);
          <span class="keyword">return</span> FileVisitResult.CONTINUE;
        }
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">postVisitDirectory</span>(<span class="type">Path</span> dir, <span class="type">IOException</span> exc) <span class="keyword">throws</span> <span class="type">IOException</span> {
          Files.<span class="function">delete</span>(dir);
          <span class="keyword">return</span> FileVisitResult.CONTINUE;
        }
      });

      <span class="keyword">return</span> <span class="literal">true</span>;
    }
    `
      },
      {
        id: 6,
        title: "Snippet 6",
        code: `<span class="keyword">public static</span> <span class="type">int</span> <span class="function">encodedLength</span>(<span class="type">CharSequence</span> sequence) {
  <span class="comment">// Optimized implementation</span>
  <span class="type">int</span> utf16Length = sequence.<span class="function">length</span>();
  <span class="type">int</span> utf8Length = utf16Length;
  <span class="type">int</span> i = <span class="number">0</span>;

  <span class="keyword">while</span> (i < utf16Length && sequence.<span class="function">charAt</span>(i) < <span class="literal">0x80</span>) {
    i++;
  }

  <span class="keyword">for</span> (; i < utf16Length; i++) {
    <span class="type">char</span> c = sequence.<span class="function">charAt</span>(i);
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
`
      },
      {
        id: 7,
        title: "Snippet 7",
        code: `<span class="keyword">public static</span> <span class="type">float</span> <span class="function">lowestPositiveRoot</span>(<span class="type">float</span> a, <span class="type">float</span> b, <span class="type">float</span> c) {
  <span class="type">float</span> det = b * b - <span class="number">4</span> * a * c;
  <span class="keyword">if</span> (det < <span class="number">0</span>) <span class="keyword">return</span> <span class="type">Float</span>.NaN;

  <span class="type">float</span> sqrtD = (<span class="type">float</span>)<span class="type">Math</span>.<span class="function">sqrt</span>(det);
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
`
      },
      {
        id: 8,
        title: "Snippet 8",
        code: `<span class="keyword">public static</span> <span class="type">float</span> <span class="function">atan2</span>(<span class="type">float</span> y, <span class="type">float</span> x) {
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
`
      }
    ];



    const general_questions = [
        {
          type: "open",
          id: "function",
          prompt: "What does this code snippet do? Briefly describe its main functionality.",
          type2: "",
          id2: "",
          question2: ""
        }, 
        {
            type: "scale",
            id: "scaleST",
            prompt: "How easy or difficult were the tasks you performed for this snippet?",
            labels: ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
            type2: "scale",
            id2: "scaleSM",
            question2: "How easy or difficult was this snippet to understand?",
            labels2: ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
          }
      ];
      
      
      const questionsPerSnippetOriginal = {
        "1": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does the character at position i (i.e., name.charAt(i)) affect whether the loop continues to the next iteration?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What is the return value of the method for the input \"abc123___\"?",
            "type2": "short",
            "id2": "output2",
            "question2": "What is the value of i immediately after the for loop completes?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Is subtraction (-) used in an expression?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many exit points does the for loop have?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ],
        "2": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does the result of isFilesystemPath(uri) affect whether uri.getScheme() is evaluated?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What is the return value of the method for a URI with scheme = \"jar\" and isFilesystemPath(uri) = false?",
            "type2": "bin",
            "id2": "output2",
            "question2": "Is the method uri.getScheme() called for this input?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Are all local variables immediately initialized as part of their declaration?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many case labels are in the switch statement?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ],
        "3": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does the result of field.isSynthetic() affect the value of modifiers?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What is the return value of the method for input type = -1?",
            "type2": "bin",
            "id2": "output2",
            "question2": "Is the for loop over getDeclaredFields() entered for this input?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Is there a top-level loop that appears after some code containing a return statement?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many if conditions must be satisfied before field.getShort(null) == type is evaluated?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ],
        "4": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does the result of searchStr.length() affect whether str == null?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What is the return value of the method for input str = \"abcdefg\", searchStr = \"xyz\", startPos = 0?",
            "type2": "short",
            "id2": "output2",
            "question2": "How many times is the loop body executed?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Are all local variables immediately initialized as part of their declaration?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many local variables are declared before the for loop begins?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ],
        "5": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does the value of root affect whether the method returns true?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What is the return value of the method if root refers to a path that does not exist on disk?",
            "type2": "short",
            "id2": "output2",
            "question2": "Is Files.walkFileTree(...) ever called?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Is the type of the second method parameter int?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many method calls occur inside the visitFile method?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ],
        "6": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does setting i = 0 affect whether the exception is thrown at the end?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What value is returned by the method for input \"ABCDEF\"?",
            "type2": "bin",
            "id2": "output2",
            "question2": "Is encodedLengthGeneral(...) called for this input?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Is subtraction (-) used in an expression?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many loops appear in this method?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ],
        "7": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does the value of a affect whether r1 and r2 are finite values or NaN?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What is the return value of the method for input a = 1, b = -5, c = 6?",
            "type2": "short",
            "id2": "output2",
            "question2": "After the swap check (if (r1 > r2)), what is the relationship between r1 and r2?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Does the method use an explicit type cast?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many if statements may cause early return from this method?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ],
        "8": [
          {
            "type": "bin",
            "id": "semanticsSlicing",
            "prompt": "Does the expression x + HALF_PI affect the value of n?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "output",
            "prompt": "What is the return path taken for input x = -1, y = 1?",
            "type2": "bin",
            "id2": "output2",
            "question2": "Does the line x = 0f; execute for this input?"
          },
          {
            "type": "bin",
            "id": "syntaxW",
            "prompt": "Does the method catch any exceptions?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "short",
            "id": "syntaxB",
            "prompt": "How many different return statements are present in this method?",
            "type2": "",
            "id2": "",
            "question2": ""
          }
        ]
      };

      const StartingQuestions = [{
        "type": "none",
        "id": "Read",
        "prompt": "Please read the code snippet and form an overall impression. This should take no more than 2 minutes. Click 'Next' when you feel ready to answer the questions. (You will still see the snippet while answering the questions.)",
        "type2": "",
        "id2": "",
        "question2": ""
      }];
      
      