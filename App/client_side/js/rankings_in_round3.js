
const participantRankings = [
    {
      id: 1,
      name: "Nadeeshan",
      html: `<div class="participant-section">
  <strong>Nadeeshan</strong>
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

    <!-- Rank 1 -->
    <div class="ranking-slot" style="position: relative;">
      <button class="snippet-1" onclick="show_snippet(1)">Snippet 1</button>

      <!-- Comparison: 1 vs 2 -->
      <div class="reasoning-point" onclick="compare([1], [2])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
        Snippet 1 has straightforward logic; snippet 2's URI logic is kinda unclear - (does it handle remote file location or local?)
      </div>
    </div>

    <!-- Rank 2 -->
    <div class="ranking-slot" style="position: relative;">
      <button class="snippet-2" onclick="show_snippet(2)">Snippet 2</button>
      
       <!-- Comparison: 2 vs 4+7 -->
      <div class="reasoning-point" onclick="compare([2], [4,7])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
        Snippet 2 is way shorter than snippet 4, and the logic is much clearer.
        Snippet 7 is easier when you have common mathematics knowledge to solve quadratic equations.
      </div>
    </div>

    <!-- Rank 3 -->
    <div class="ranking-slot" style="position: relative;">
      <button class="snippet-4" onclick="show_snippet(4)">Snippet 4</button>
      <button class="snippet-7" onclick="show_snippet(7)">Snippet 7</button>

      <!-- Grouping reasoning -->
      <div class="reasoning-point" onclick="compare([4], [7])" style="position: absolute; top: -7px; right:50px;"></div>
      <div class="tooltip-box" style="position: absolute; top: 25px; left: 10px; width: 360px;">
        💡 <strong>Reason:</strong><br>
        Since Snippet 7 requires recalling the solution to a quadratic formula -- which I do know now, and Snippet 4 is straightforward when read from top to bottom, I believe the ranking is appropriate.
      </div>


      <!-- Comparison: 4+7 vs 5 -->
      <div class="reasoning-point" onclick="compare([4,7], [5])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
        Snippet 5 uses the Visitor design pattern (which I'm not very familiar with) and relies on domain knowledge of the Java file visiting API.
      </div>
    </div>

    <!-- Rank 4 -->
    <div class="ranking-slot"></div>

    <!-- Rank 5 -->
    <div class="ranking-slot" style="position: relative;">
      <button class="snippet-5" onclick="show_snippet(5)">Snippet 5</button>

      <!-- Comparison: 5 vs 3 -->
      <div class="reasoning-point" onclick="compare([5], [3])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
        Since snippet 3 uses Java reflection.
      </div>
    </div>

    <!-- Rank 6 -->
    <div class="ranking-slot" style="position: relative;">
      <button class="snippet-3" onclick="show_snippet(3)">Snippet 3</button>

      <!-- Comparison: 3 vs 6 -->
      <div class="reasoning-point" onclick="compare([3], [6])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
        Since Snippet 6 requires knowledge of UTF-8 to UTF-16 conversion, it assumes some familiarity with character encoding concepts.
      </div>
    </div>

    <!-- Rank 7 -->
    <div class="ranking-slot" style="position: relative;">
      <button class="snippet-6" onclick="show_snippet(6)">Snippet 6</button>

      <!-- Comparison: 6 vs 8 -->
      <div class="reasoning-point" onclick="compare([6], [8])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
        Snippet 8 require special domain knowledge--how atan works specifically
      </div>
    </div>

    <!-- Rank 8 -->
    <div class="ranking-slot">
      <button class="snippet-8" onclick="show_snippet(8)">Snippet 8</button>
    </div>

  </div>
</div>
`
    },
    {
        id: 2,
        name: "Oscar",
        html: `<div class="participant-section">
        <strong>Oscar</strong>
        <div class="ranking-row">
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-1" onclick="show_snippet(1)">Snippet 1</button>
            <div class="reasoning-point" onclick="compare([7], [2])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
            Those in position 2 use more complex implementation patterns than the one in position 1, still, all three are pretty easy to understand to me.            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
             <button class="snippet-3" onclick="show_snippet(3)">Snippet 3</button>
            <button class="snippet-5" onclick="show_snippet(5)">Snippet 5</button>
             <div class="reasoning-point" onclick="compare([3], [5])" style="position: absolute; top: -7px; right:50px;"></div>
            <div class="tooltip-box" style="position: absolute; top: 25px; left: 10px; width: 360px;">
                Similar logic and patterns are used to implement their functionality. Hard to distinguish them for me.
            </div>
            
            <div class="reasoning-point" onclick="compare([3,5], [7])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
                Here low domain knowledge proficiency would make snippet 7 more difficult to understand. But actually, the logic is pretty simple in snippet 7. If we don't factor in the domain knowledge, I would put snippet 7 before snippets 3 and 5.            
            </div>
            
           </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-7" onclick="show_snippet(7)">Snippet 7</button>
            <div class="reasoning-point" onclick="compare([7], [2])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
               The reason a ranked snippet 2 after snippet 7 is that I am not familiar with an URI's scheme and why implementing that logic (in snippet 2) is enough to check if it is remote. Snippet 7 is straightforward to understand if we remember/know the quadratic formula.            
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-2" onclick="show_snippet(2)">Snippet 2</button>
            
             <div class="reasoning-point" onclick="compare([7], [2])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
                While there is missing context in both snippets required to help me understand the snippets, I think snippet 4 implements more complex logic.
            </div>
          </div>
          <div class="ranking-slot"></div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-4" onclick="show_snippet(4)">Snippet 4</button>
            <div class="reasoning-point" onclick="compare([4], [6])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              Snippet 6 is harder to understand for me because I don't know what the bit shifts are doing to check or determine the sequence length in UTF-8. Snippet 4 is easier to understand, despite it being unclear what regionMatches is doing — overall, I understand what the method is doing.
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-6" onclick="show_snippet(6)">Snippet 6</button>
            <div class="reasoning-point" onclick="compare([6], [8])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
                atan2 is just very hard to understand because I don't remember how arctan's math works.
            </div>
          </div>
          <div class="ranking-slot">
            <button class="snippet-8" onclick="show_snippet(8)">Snippet 8</button>
          </div>
        </div>
      </div>`
      }, 
      {
        id: 3,
        name: "Martin",
        html: `<div class="participant-section-wide">
        <strong>Martin</strong>
        <div class="ranking-row">
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-1" onclick="show_snippet(1)">Snippet 1</button>
            <div class="reasoning-point" onclick="compare([1], [2])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 isRemote involves a little more domain knowledge.
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-2" onclick="show_snippet(2)">Snippet 2</button>
            <div class="reasoning-point" onclick="compare([2], [4,5,7])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
These three snippets each involve a method with a clear specification but a complicated implementation. Snippet 2 has both a clear spec and a clear impl.
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;"></div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-4" onclick="show_snippet(4)">Snippet 4</button>
            <button class="snippet-7" onclick="show_snippet(7)">Snippet 7</button>
            <button class="snippet-5" onclick="show_snippet(5)">Snippet 5</button>
            <div class="reasoning-point" onclick="compare([4,7], [5])" style="position: absolute; top: -7px; right:50px;"></div>
            <div class="tooltip-box" style="position: absolute; top: 25px; left: 10px; width: 500px;">
Each implements a moderately complex operation that's easy to specify but involves getting a bunch of details right.
            </div>
            <div class="reasoning-point" onclick="compare([4,7,5], [3])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
Reflection.
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-3" onclick="show_snippet(3)">Snippet 3</button>
            <div class="reasoning-point" onclick="compare([3], [6])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
encodedLength requires domain knowledge of encodings. isMachineTypeDefined's semantics can at least be understood without any background, though its purpose remains mysterious.            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">

          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-6" onclick="show_snippet(6)">Snippet 6</button>
            <div class="reasoning-point" onclick="compare([6], [8])" style="position: absolute; top: 10px; right: -12px;"></div>
      <div class="tooltip-box" style="top: 35px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              Both require line-by-line reasoning, but \`atan2\` requires _two_ kinds of domain-specific knowledge (numerical methods + trig) vs just one for \`encodedLength\` (encodings).<br>
            </div>
          </div>
          <div class="ranking-slot">
            <button class="snippet-8" onclick="show_snippet(8)">Snippet 8</button>
          </div>
        </div>
      </div>`
      }   
      
  ];
  