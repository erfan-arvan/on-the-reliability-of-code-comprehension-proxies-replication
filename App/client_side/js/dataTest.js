const snippetsOriginal = [
  {
    id: 1,
    title: "Snippet 1",
    code: `
    <span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">methodA</span>(<span class="type">String</span> name) {
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
    `
        },
        {
          id: 2,
          title: "Snippet 2",
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
          `            
        },
        {
          id: 3,
          title: "Snippet 3",
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
          `            
        },
        {
          id: 4,
          title: "Snippet 4",
          code: `
          <span class="keyword">public static</span> <span class="type">int</span> <span class="function">indexOfIgnoreCase</span>(<span class="type">CharSequence</span> str, <span class="type">CharSequence</span> searchStr, <span class="type">int</span> startPos) {
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
          }
          `            
        },
        {
          id: 5,
          title: "Snippet 5",
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
          `            
    },
    {
      id: 6,
      title: "Snippet 6",
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
      `        
    },
    {
      id: 7,
      title: "Snippet 7",
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
      `        
    },
    {
      id: 8,
      title: "Snippet 8",
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
      `        
    }
  ];

      
      const questionsPerSnippetOriginal = {
        "1": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input, considering the following assumptions?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">&quot;a1_&quot;</span>\n</div>\n\n<div class=\"assumptions\">\n  <p><strong>Assumptions:</strong></p>\n  <ul>\n    <li><span class=\"qcode\">MAX_NAME_LENGTH</span> is defined as <span class=\"qcode\">10</span></li>\n    <li><span class=\"qcode\">VALID_NAME_SET</span> is a Set&lt;Character&gt; that contains: <code>'_'</code>, <code>'-'</code>, and <code>'.'</code></li>\n  </ul>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Is <span class=\"qcode\">MAX_NAME_LENGTH</span> used in a conditional expression?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "open",
            "id": "function",
            "prompt": "What does this code snippet do? Briefly describe its main functionality.",
            "type2": "",
            "id2": "",
            "question2": ""
          }, 
          {
              "type": "scale",
              "id": "scaleST",
              "prompt": "How easy or difficult were the tasks you performed for this snippet?",
              "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
              "type2": "scale",
              "id2": "scaleSM",
              "question2": "How easy or difficult was this snippet to understand?",
              "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
            }
        ],
        "2": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input, considering the following assumptions?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">isRemote(URI.create(&quot;http://example.com&quot;))</span>\n</div>\n\n<div class=\"assumptions\">\n  <p><strong>Assumptions:</strong></p>\n  <ul>\n    <li>The method <span class=\"qcode\">isFilesystemPath(uri)</span> returns <span class=\"qcode\">false</span> for this input.</li>\n  </ul>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Does the <span class=\"qcode\">switch</span> statement include more than two <span class=\"qcode\">case</span> labels?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "open",
            "id": "function",
            "prompt": "What does this code snippet do? Briefly describe its main functionality.",
            "type2": "",
            "id2": "",
            "question2": ""
          }, 
          {
              "type": "scale",
              "id": "scaleST",
              "prompt": "How easy or difficult were the tasks you performed for this snippet?",
              "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
              "type2": "scale",
              "id2": "scaleSM",
              "question2": "How easy or difficult was this snippet to understand?",
              "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
            }
        ],
        "3": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input, considering the following assumptions?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">(short) 999</span>\n</div>\n\n<div class=\"assumptions\">\n  <p><strong>Assumptions:</strong></p>\n  <ul>\n    <li><span class=\"qcode\">IMAGE_FILE_MACHINE_UNKNOWN</span> = <span class=\"qcode\">0</span></li>\n    <li><span class=\"qcode\">CoffMachineType</span> has exactly three declared <code>public static final short</code> fields:</li>\n    <ul>\n      <li><span class=\"qcode\">IMAGE_FILE_MACHINE_AMD64 = (short) 34404</span></li>\n      <li><span class=\"qcode\">IMAGE_FILE_MACHINE_ARM = (short) 448</span></li>\n      <li><span class=\"qcode\">IMAGE_FILE_MACHINE_I386 = (short) 332</span></li>\n    </ul>\n    <li><span class=\"qcode\">getDeclaredFields()</span> returns the fields in the order listed above.</li>\n    <li>No <span class=\"qcode\">IllegalAccessException</span> is thrown during execution.</li>\n  </ul>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          { 
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Is the variable <span class=\"qcode\">modifiers</span> initialized using a method call?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "open",
            "id": "function",
            "prompt": "What does this code snippet do? Briefly describe its main functionality.",
            "type2": "",
            "id2": "",
            "question2": ""
          }, 
          {
              "type": "scale",
              "id": "scaleST",
              "prompt": "How easy or difficult were the tasks you performed for this snippet?",
              "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
              "type2": "scale",
              "id2": "scaleSM",
              "question2": "How easy or difficult was this snippet to understand?",
              "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
            }
        ],
        "4": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input, considering the following assumptions?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">Str = &quot;AbcXabc&quot;, searchStr = &quot;ABC&quot;, startPos = 1</span>\n</div>\n\n<div class=\"assumptions\">\n  <p><strong>Assumptions:</strong></p>\n  <ul>\n    <li><span class=\"qcode\">INDEX_NOT_FOUND</span> = <span class=\"qcode\">-1</span></li>\n    <li><span class=\"qcode\">regionMatches(CharSequence cs, boolean ignoreCase, int thisStart, CharSequence substring, int start, int length)</span> behaves like <a href=\"#\" class=\"underline-dotted-pointer\" onclick=\"openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#regionMatches-boolean-int-java.lang.String-int-int-')\">String.regionMatches(...)</a> in Java, but works on <code>CharSequence</code>.</li>\n    <li>All inputs are standard Java <code>String</code> objects (which implement <code>CharSequence</code>).</li>\n  </ul>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Is the variable <span class=\"qcode\">endLimit</span> declared inside the <span class=\"qcode\">for</span> loop?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "open",
            "id": "function",
            "prompt": "What does this code snippet do? Briefly describe its main functionality.",
            "type2": "",
            "id2": "",
            "question2": ""
          }, 
          {
              "type": "scale",
              "id": "scaleST",
              "prompt": "How easy or difficult were the tasks you performed for this snippet?",
              "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
              "type2": "scale",
              "id2": "scaleSM",
              "question2": "How easy or difficult was this snippet to understand?",
              "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
            }
        ],
        "5": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input, considering the following assumptions?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">Paths.get(&quot;/tmp/example&quot;)</span>\n</div>\n\n<div class=\"assumptions\">\n  <p><strong>Assumptions:</strong></p>\n  <ul>\n    <li><code>/tmp/example</code> is a directory that exists and contains a single file: <code>/tmp/example/foo.txt</code>.</li>\n    <li><span class=\"qcode\">Files.exists(...)</span> returns <span class=\"qcode\">true</span> for <code>/tmp/example</code>.</li>\n    <li><span class=\"qcode\">Files.walkFileTree(...)</span> visits the file before the directory.</li>\n    <li>All <span class=\"qcode\">Files.delete(...)</span> calls succeed and no exceptions are thrown.</li>\n  </ul>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Is the method <span class=\"qcode\">walkFileTree</span> passed exactly two arguments?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "open",
            "id": "function",
            "prompt": "What does this code snippet do? Briefly describe its main functionality.",
            "type2": "",
            "id2": "",
            "question2": ""
          }, 
          {
              "type": "scale",
              "id": "scaleST",
              "prompt": "How easy or difficult were the tasks you performed for this snippet?",
              "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
              "type2": "scale",
              "id2": "scaleSM",
              "question2": "How easy or difficult was this snippet to understand?",
              "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
            }
        ],
        "6": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input, considering the following assumptions?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">&quot;abऩd&quot;</span>\n</div>\n\n<div class=\"assumptions\">\n  <p><strong>Assumptions:</strong></p>\n  <ul>\n    <li><span class=\"qcode\">encodedLengthGeneral(...)</span> returns <span class=\"qcode\">2</span> when called.</li>\n    <li><code>'ऩ'</code> has code point <span class=\"qcode\">0x929</span> ≥ <span class=\"qcode\">0x800</span>.</li>\n    <li>No exception is thrown.</li>\n  </ul>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Is the variable <span class=\"qcode\">c</span> declared inside the body of the for loop?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "open",
            "id": "function",
            "prompt": "What does this code snippet do? Briefly describe its main functionality.",
            "type2": "",
            "id2": "",
            "question2": ""
          }, 
          {
              "type": "scale",
              "id": "scaleST",
              "prompt": "How easy or difficult were the tasks you performed for this snippet?",
              "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
              "type2": "scale",
              "id2": "scaleSM",
              "question2": "How easy or difficult was this snippet to understand?",
              "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
            }
        ],
        "7": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">a = 1f, b = 2f, c = -3f</span>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Does the <span class=\"qcode\">if (r1 &gt; r2)</span> block contain a variable declaration?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "open",
            "id": "function",
            "prompt": "What does this code snippet do? Briefly describe its main functionality.",
            "type2": "",
            "id2": "",
            "question2": ""
          }, 
          {
              "type": "scale",
              "id": "scaleST",
              "prompt": "How easy or difficult were the tasks you performed for this snippet?",
              "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
              "type2": "scale",
              "id2": "scaleSM",
              "question2": "How easy or difficult was this snippet to understand?",
              "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
            }
        ],
        "8": [
          {
            "type": "short",
            "id": "output",
            "prompt": "What value does the method return when called with the following input, considering the following assumptions?<br><br><div class=\"input-block\">\n  <strong>Input:</strong> <span class=\"qcode\">x = -1f, y = -1f</span>\n</div>\n\n<div class=\"assumptions\">\n  <p><strong>Assumptions:</strong></p>\n  <ul>\n    <li><span class=\"qcode\">atanUnchecked(x)</span> behaves like <a href=\"#\" class=\"underline-dotted-pointer\" onclick=\"openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#atan-double-')\">atan(x)</a> but assumes x is finite</li>\n    <li><span class=\"qcode\">atanUnchecked(1.0f)</span> = <span class=\"qcode\">0.7853982f</span></li>\n    <li><span class=\"qcode\">PI</span> = <span class=\"qcode\">3.1415927f</span></li>\n    <li><span class=\"qcode\">HALF_PI</span> = <span class=\"qcode\">1.5707964f</span></li>\n  </ul>\n</div>",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
            "type": "bin",
            "id": "syntaxBL",
            "prompt": "Is the variable <span class=\"qcode\">n</span> declared inside a conditional block?",
            "type2": "",
            "id2": "",
            "question2": ""
          },
          {
          "type": "open",
          "id": "function",
          "prompt": "What does this code snippet do? Briefly describe its main functionality.",
          "type2": "",
          "id2": "",
          "question2": ""
        }, 
        {
            "type": "scale",
            "id": "scaleST",
            "prompt": "How easy or difficult were the tasks you performed for this snippet?",
            "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
            "type2": "scale",
            "id2": "scaleSM",
            "question2": "How easy or difficult was this snippet to understand?",
            "labels2": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"]
          }
        ]
      };

      const StartingQuestions = [{
        "type": "none",
        "id": "Read",
        "prompt": "<p class=\"instruction\"><strong>Please read the code snippet and form an overall impression.</strong><span> This should take no more than 2 minutes.</span></p><p class=\"instruction\">When you're ready, click <strong>'Next'</strong> to proceed to the questions. <em>(You will still be able to see the snippet while answering.)</em></p>",
        "type2": "",
        "id2": "",
        "question2": ""
      }];
      
      