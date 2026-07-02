  const originalSnippets = [
    {
      id: 1,
      title: "Snippet 1",
      methodName:"isValidProjectName",
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
`
          },
          {
            id: 2,
            title: "Snippet 2",
            methodName:"isRemote",
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
            methodName:"isMachineTypeDefined",
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
            methodName:"indexOfIgnoreCase",
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
}`
          },              
          {
            id: 5,
            title: "Snippet 5",
            methodName:"deleteRecursively",
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
        methodName:"CharSequence",
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
        methodName:"lowestPositiveRoot",
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
        methodName:"atan2",
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
  


function getStoredSnippetOrder() {
  const stored = sessionStorage.getItem('snippetOrder') || localStorage.getItem('snippetOrder');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === 8) return parsed;
    } catch {}
  }
  return null;
}

// Apply the stored snippet order
const order = getStoredSnippetOrder();
const snippets = [];

if (order) {
  order.forEach((index, newId) => {
    const snippet = { ...originalSnippets[index - 1] };
    snippet.id = newId + 1;
    snippet.title = `Snippet ${newId + 1}`;
    snippets.push(snippet);
  });
} else {
  alert("⚠️ Missing snippet order. Please login again.");
  window.location.href = '/';
}

console.log("Applied snippet order:", snippets.map(s => s.title));

function openJavadocModal(url) {
  window.open(url, "_blank");
}

function show_snippet(id) {
  const snippet = snippets.find(s => s.id === id);
  if (!snippet) return;

  document.getElementById('modal-snippet-title').innerText = snippet.methodName;

  const codeLines = snippet.code.trim().split('\n');

  // Render styled spans
  document.getElementById('modal-code-content').innerHTML = codeLines.join('\n');

  // Line numbers
  document.getElementById('modal-line-numbers').innerHTML = codeLines.map((_, i) => i + 1).join('<br>');

  document.getElementById('snippet-modal').style.display = 'block';
  applyModalTheme();
}

function toggleModalTheme() {
  const body = document.body;
  const isLight = body.classList.contains("light-mode");

  if (isLight) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("codeTheme", "dark");
    document.getElementById('modal-theme-toggle').textContent = "Switch to Light Mode";
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("codeTheme", "light");
    document.getElementById('modal-theme-toggle').textContent = "Switch to Dark Mode";
  }
}

function applyModalTheme() {
  const theme = localStorage.getItem('codeTheme') || 'light';
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(theme + '-mode');
  const btn = document.getElementById('modal-theme-toggle');
  if (btn) {
    btn.textContent = theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode";
  }
}

function compare(leftIds, rightIds) {
  const leftContainer = document.getElementById('compare-left');
  const rightContainer = document.getElementById('compare-right');
  if (!leftContainer || !rightContainer) return;

  leftContainer.innerHTML = '';
  rightContainer.innerHTML = '';

  const getSnippet = id => snippets.find(s => s.id === id);

  // Left side: stacked
  leftIds.forEach(id => {
    const snippet = getSnippet(id);
    if (snippet) {
      const box = document.createElement('div');
      box.className = 'snippet-box';
      box.innerHTML = `<h4>${snippet.methodName}</h4><pre class="code-content">${snippet.code}</pre>`;
      leftContainer.appendChild(box);
    }
  });

  // Right side: stacked
  rightIds.forEach(id => {
    const snippet = getSnippet(id);
    if (snippet) {
      const box = document.createElement('div');
      box.className = 'snippet-box';
      box.innerHTML = `<h4>${snippet.methodName}</h4><pre class="code-content">${snippet.code}</pre>`;
      rightContainer.appendChild(box);
    }
  });

  const modal = document.getElementById('compare-modal');
  if (modal) modal.style.display = 'block';
}
