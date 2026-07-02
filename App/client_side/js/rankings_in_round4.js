
const participantRankings = [
    {
      id: 1,
      name: "Nadeeshan",
      html: ` <div class="participant-section">
      <strong>nadeeshan</strong>
      <div class="ranking-labels">
        <div class="ranking-label">1 (easiest)</div>
        <div class="ranking-label">2</div>
        <div class="ranking-label">3</div>
        <div class="ranking-label">4</div>
        <div class="ranking-label">5</div>
        <div class="ranking-label">6</div>
        <div class="ranking-label">7</div>
        <div class="ranking-label">8 (hardest)</div>
      </div>
      <div class="ranking-row">
        <div class="ranking-slot" style="position: relative;">
          <button class="snippet-1" onclick="show_snippet(1)">isValidProjectN</button>
            <div class="reasoning-point" onclick="compare([1],[7,2,4])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">lowestPositiveR is way shorter than lowestPositiveR</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-4" onclick="show_snippet(4)">indexOfIgnoreCa</button>
<button class="snippet-7" onclick="show_snippet(7)">lowestPositiveR</button>
<button class="snippet-2" onclick="show_snippet(2)">isRemote</button>
            <div class="reasoning-point" onclick="compare([7],[2,4])" style="position: absolute; top: -7px; right: 50px;"></div>
            <div class="tooltip-box" style="position: absolute; top: 25px; left: 10px; width: 360px;">💡 <strong>Reason:</strong><br>All of them require some background knowledge about maths or Java APIs.</div>
            <div class="reasoning-point" onclick="compare([7,2,4],[5])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">The complex structure of isRemote makes it harder to understand.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-5" onclick="show_snippet(5)">deleteRecursive</button>
            <div class="reasoning-point" onclick="compare([5],[3])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">Without identifying the isMachineTypeDe uses Java reflection, it is hard to understand the logic straightforwardly.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-3" onclick="show_snippet(3)">isMachineTypeDe</button>
            <div class="reasoning-point" onclick="compare([3],[6])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">Since encodedLength requires knowledge of UTF-8 to UTF-16 conversion, it assumes some familiarity with character encoding concepts.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-6" onclick="show_snippet(6)">encodedLength</button>
            <div class="reasoning-point" onclick="compare([6],[8])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">atan2 require special domain knowledge--how atan works specifically</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-8" onclick="show_snippet(8)">atan2</button>
          </div>
      </div>
    </div>
`
    },
    {
        id: 2,
        name: "Oscar",
        html: `    <div class="participant-section">
      <strong>oscar</strong>
      <div class="ranking-labels">
        <div class="ranking-label">1 (easiest)</div>
        <div class="ranking-label">2</div>
        <div class="ranking-label">3</div>
        <div class="ranking-label">4</div>
        <div class="ranking-label">5</div>
        <div class="ranking-label">6</div>
        <div class="ranking-label">7</div>
        <div class="ranking-label">8 (hardest)</div>
      </div>
      <div class="ranking-row">
        <div class="ranking-slot" style="position: relative;">
          <button class="snippet-1" onclick="show_snippet(1)">isValidProjectN</button>
            <div class="reasoning-point" onclick="compare([1],[2])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">both snippets implement simple logic and their overall intent is easy to understand -- the identifiers help quite a bit. <br><br>S2 is slightly harder to understand because it is unclear why checking for file and jar is enough to determine that the URI is not remote. I guess my familiarity with the URI&#x27;s scheme is not enough to fully understand the method.<br><br>This ordering is also consistent with the one from my colleagues.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-2" onclick="show_snippet(2)">isRemote</button>
            <div class="reasoning-point" onclick="compare([2],[7])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">Both implement simple logic as well, but S7 requires people to understand/remember the quadratic formula, hence it is slightly harder to understand than S2.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-7" onclick="show_snippet(7)">lowestPositiveR</button>
            <div class="reasoning-point" onclick="compare([7],[4])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">I think the logic of S4 is more complex, although I understand what it does -- it requires more nuanced understanding</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-4" onclick="show_snippet(4)">indexOfIgnoreCa</button>
            <div class="reasoning-point" onclick="compare([4],[5])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">S5 requires knowing the visitor pattern to fully understand what it does -- it can be obscure for people unfamiliar with the pattern. S4, on the other hand, doesn&#x27;t implement any patterns: it is just regular code.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-5" onclick="show_snippet(5)">deleteRecursive</button>
            <div class="reasoning-point" onclick="compare([5],[3])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">I guess reflection is harder to understand than the visitor pattern, as my colleagues point out. To me, both are pretty straightforward to understand, though, because I am familiar with these concepts and the identifiers make both pretty easy to understand.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-3" onclick="show_snippet(3)">isMachineTypeDe</button>
            <div class="reasoning-point" onclick="compare([3],[6])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">not idea what the UFT8-2-UT16 entails, so for sure S6 is harder to understand than S3</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-6" onclick="show_snippet(6)">encodedLength</button>
            <div class="reasoning-point" onclick="compare([6],[8])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">atan2 is just very hard to understand because I don&#x27;t remember how arctan&#x27;s math works -- this is by far the hardest to understand for me.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-8" onclick="show_snippet(8)">atan2</button>
          </div>
      </div>
    </div>`
      }, 
      {
        id: 3,
        name: "Martin",
        html: `    <div class="participant-section">
      <strong>martin</strong>
      <div class="ranking-labels">
        <div class="ranking-label">1 (easiest)</div>
        <div class="ranking-label">2</div>
        <div class="ranking-label">3</div>
        <div class="ranking-label">4</div>
        <div class="ranking-label">5</div>
        <div class="ranking-label">6</div>
        <div class="ranking-label">7</div>
        <div class="ranking-label">8 (hardest)</div>
      </div>
      <div class="ranking-row">
        <div class="ranking-slot" style="position: relative;">
          <button class="snippet-1" onclick="show_snippet(1)">isValidProjectN</button>
            <div class="reasoning-point" onclick="compare([1],[2])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">isRemote involves a little more domain knowledge, but both have simple structure and similar purpose: check some arbitrary conditions.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-2" onclick="show_snippet(2)">isRemote</button>
            <div class="reasoning-point" onclick="compare([2],[4])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">isRemote has simpler control flow. indexOfIgnoreCase has a clearer specification (i.e., is easier to understand without reading the code), but once you get into the details it&#x27;s a bit trickier. For both, you need to know something about the standard library (for isRemote, URIs; for indexOfIgnoreCase, String#regionMatches)</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-4" onclick="show_snippet(4)">indexOfIgnoreCa</button>
            <div class="reasoning-point" onclick="compare([4],[5])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">The File API is confusing and easy to get wrong. And, fewer engineers work in codebases that need to deal with files compared to codebases that need to deal with Strings. But, both of these methods have simple high-level specifications and there&#x27;s really only one tricky thing about them, so they&#x27;re easy to follow overall.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-5" onclick="show_snippet(5)">deleteRecursive</button>
            <div class="reasoning-point" onclick="compare([5],[7])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">deleteRecursively is pretty easy to understand at a high-level without much domain knowledge. lowestPositiveRoot has a lot more going on, but the spec is also pretty simple.</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-7" onclick="show_snippet(7)">lowestPositiveR</button>
            <div class="reasoning-point" onclick="compare([7],[3])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">reflection</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-3" onclick="show_snippet(3)">isMachineTypeDe</button>
            <div class="reasoning-point" onclick="compare([3],[6])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">encodings require serious, rare domain knowledge</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-6" onclick="show_snippet(6)">encodedLength</button>
            <div class="reasoning-point" onclick="compare([6],[8])" style="position: absolute; top: 10px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 35px; right: -160px;">Both require line-by-line reasoning, but atan2 requires _two_ kinds of domain-specific knowledge (numerical methods + trig) vs just one for encodedLength (encodings).</div>
          </div>

          <div class="ranking-slot" style="position: relative;">
          <button class="snippet-8" onclick="show_snippet(8)">atan2</button>
          </div>
      </div>
    </div>`
      }   
      
  ];
  