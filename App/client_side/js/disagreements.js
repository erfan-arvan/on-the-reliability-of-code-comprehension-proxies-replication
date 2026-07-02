window.DISAGREEMENTS = [
  {
    id: "1",
    title: "Disagreement on indexOfIgnoreCase and deleteRecursively",
    "snippet-id": "indexOfIgnoreCase",
    htmltext: `
<b>Most common trend:</b>
Across most experts (A, B, D, and E), <code>indexOfIgnoreCase</code> and <code>deleteRecursively</code> are generally perceived as <b>early-to-mid difficulty snippets (roughly Positions 3–5)</b>. Within this shared range, <code>deleteRecursively</code> is more often viewed as slightly easier than <code>indexOfIgnoreCase</code>. However, this broad alignment masks a deeper disagreement about what qualifies as “easy” code in the first place.
<br><br>

This tension becomes clear in Round 2, where experts diverged on whether these methods should be considered straightforward implementations of familiar patterns or API-heavy code that demands prior knowledge and careful tracing.
<br><br>

<ul>
  <li><b>Expert C</b> grouped indexOfIgnoreCase and deleteRecursively together at Position 1.<br>
  – They explained that both methods are easy to follow line by line, with meaningful variable and method names and clear error cases. In their view, “the business logic is straightforward based on the method name/signature,” and both snippets reflect how they would naturally implement such functionality.</li>
</ul>

<ul>
  <li><b>Expert A</b> grouped indexOfIgnoreCase, deleteRecursively, and isMachineTypeDefined together at Position 4.<br>
  – They argued that although the intent of these methods is understandable, all require specific prior knowledge. For indexOfIgnoreCase, they pointed to unclear naming such as <code>str</code> and <code>endLimit</code>, and noted that the ignore-case behavior is implicit rather than explicit. For deleteRecursively, they emphasized that familiarity with the visitor pattern is required to fully follow the logic.</li>
</ul>

<ul>
  <li><b>Expert D</b> placed deleteRecursively at Position 4 and indexOfIgnoreCase at Position 5.<br>
  – They felt both methods are readable but unnecessarily complicated relative to the problems they solve. In particular, they noted that indexOfIgnoreCase performs repeated validations and lacks centralized error handling, making it feel more complex than expected.</li>
</ul>

<ul>
  <li><b>Expert B</b> split the two, placing deleteRecursively at Position 3 and indexOfIgnoreCase at Position 4.<br>
  – They argued that deleteRecursively benefits from familiar Java APIs and expressive visitor method names, whereas indexOfIgnoreCase requires more “mental compilation” due to intermediate variables and reimplementing functionality that could be delegated to built-in string operations.</li>
</ul>

<ul>
  <li><b>Expert E</b> placed indexOfIgnoreCase at Position 3 and deleteRecursively at Position 4.<br>
  – They emphasized that indexOfIgnoreCase has more moving parts and requires reasoning about bounds and helper methods like <code>regionMatches</code>, while <code>deleteRecursively</code> requires understanding how <code>Files.walkFileTree</code> drives control flow externally.</li>
</ul>

<br>
Overall, the disagreement is less about relative ordering and more about whether linear readability alone is sufficient to classify a method as easy, or whether reliance on implicit APIs and patterns meaningfully increases cognitive load.
`
  },

  {
    id: "2",
    title: "Disagreement on isMachineTypeDefined",
    "snippet-id": "isMachineTypeDefined",
    htmltext: `
<b>Most common trend:</b>
Most experts (A, C, and D) place <code>isMachineTypeDefined</code> in the <b>middle of the difficulty spectrum (Positions 3–4)</b>, treating it as understandable once its reflective structure is recognized. At the same time, this apparent convergence conceals a persistent disagreement about how much hidden domain knowledge should factor into perceived difficulty.
<br><br>

As discussion progressed, experts increasingly framed their disagreement not around control flow or code length, but around tolerance for reflection and implicit assumptions about the surrounding domain.
<br><br>

<ul>
  <li><b>Expert D</b> placed isMachineTypeDefined at Position 3.<br>
  – They described the method as “clear, concise,” and praised its use of Java’s native reflection facilities to shorten the logic. In their view, the control flow is simpler than methods like <code>atan2</code> that rely on mathematical reasoning or low-level encoding logic.</li>
</ul>

<ul>
  <li><b>Expert C</b> also placed it at Position 3, but for different reasons.<br>
  – They emphasized that while the logic is guessable, the method “requires business knowledge about the domain” and uses “advanced Java stuff that is not very common,” such as inspecting declared fields via reflection.</li>
</ul>

<ul>
  <li><b>Expert A</b> placed isMachineTypeDefined at Position 4.<br>
  – They wrote that the method is “simple to comprehend for someone familiar with reflection,” noting that the for-each loop over declared fields simplifies the intention. However, they still considered it harder than the simplest snippets due to the prerequisite API knowledge.</li>
</ul>

<ul>
  <li><b>Expert E</b> placed the method significantly harder, at Position 6.<br>
  – They acknowledged that the reflective pattern becomes understandable once recognized, but stressed that understanding why reflection is used, what synthetic fields are, and how static final filtering contributes to correctness requires additional mental effort and domain context.</li>
</ul>

<ul>
  <li><b>Expert B</b> originally ranked the snippet very hard, but revised their understanding after reading other experts’ feedback.<br>
  – They acknowledged that some concerns (such as a suspected null-pointer exception) were incorrect and stated they would now consider ranking it slightly easier. Despite this, they continued to group it with other cryptic methods and did not view it as easy.</li>
</ul>

<br>
Overall, disagreement persisted because experts differed in whether recognizing a standard reflective idiom should outweigh the cognitive cost of hidden assumptions and domain-specific correctness criteria.
`
  },

  {
    id: "3",
    title: "Disagreement on lowestPositiveRoot",
    "snippet-id": "lowestPositiveRoot",
    htmltext: `
<b>Most common trend:</b>
Most experts place <code>lowestPositiveRoot</code> toward the <b>harder half of the ranking (approximately Positions 5–7)</b>. Even those who revised their initial assessments continue to rank it above the midpoint, suggesting broad agreement that the snippet presents nontrivial comprehension challenges. The remaining disagreement concerns where those challenges should be attributed.
<br><br>

This divergence reflects a deeper split between experts who weigh mathematical background heavily in their difficulty judgments and those who focus more on naming clarity and self-documentation.
<br><br>

<ul>
  <li><b>Experts A and C</b> placed lowestPositiveRoot near the hardest end, at Position 7.<br>
  – Expert A argued that variable names like <code>det</code>, <code>sqrtD</code>, <code>invA</code>, <code>r1</code>, and <code>r2</code> “mean nothing” without prior knowledge of the quadratic formula, making both the purpose and implementation difficult to grasp.<br>
  – Expert C similarly cited discomfort with the abbreviations and uncertainty about why the roots are swapped, describing it as “even more complicated math” than other difficult snippets.</li>
</ul>

<ul>
  <li><b>Expert D</b> placed the method at Position 6.<br>
  – They agreed that unclear variable names and reliance on mathematical background significantly increase difficulty, even though the underlying algorithm is standard.</li>
</ul>

<ul>
  <li><b>Experts B and E</b> placed lowestPositiveRoot in the mid-range, at Position 5.<br>
  – Expert B initially struggled but revised their assessment after realizing the snippet implements the quadratic formula, noting that mathematical familiarity substantially reduced the perceived complexity.<br>
  – Expert E argued that once the formula is recognized, the method becomes linear and predictable, with difficulty stemming more from math familiarity than from code structure.</li>
</ul>

<br>
Overall, the disagreement centers on whether difficulty should reflect the effort required to recognize the underlying mathematical model or the clarity of the code once that model is known.
`
  },

  {
    id: "4",
    title: "Residual minor disagreements on boundary placements",
    "snippet-id": "multiple",
    htmltext: `
<b>Most common trend:</b>
After accounting for the major disagreements, the remaining differences in Round 2 involve fine-grained boundary placements among otherwise well-aligned rankings.
<br><br>

<ul>
  <li><code>isValidProjectName</code> vs. <code>isRemote</code>:<br>
  All experts agree that these two snippets belong at the easier end of the difficulty spectrum. Experts B, D, and E consistently rank <code>isRemote</code> as slightly harder than <code>isValidProjectName</code>, while Experts A and C group the two together as equally easy. This reflects a tie-versus-ordering judgment rather than a substantive disagreement about code comprehension.</li>
</ul>

<ul>
  <li>
    <code>atan2</code> vs. <code>encodedLength</code>:<br>
    All experts place both snippets in difficult positions, but differ on ordering:
    Experts C and D rank <code>atan2</code> as easier,
    Experts A and B group them together,
    and Expert E ranks <code>atan2</code> as harder.
  </li>
</ul>`
  }
];
