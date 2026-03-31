// Round 2 presentented disagreement points:

const disagreements = [
  {
  snippet: "isMachineTypeDefined",
  text: `
<p>
  <strong>isMachineTypeDefined</strong> is one of the most divisive methods, with experts placing it
  anywhere from near-easy to the hardest in the set.
</p>

<ul>
  <li>
    <strong>Expert D</strong> placed <code>isMachineTypeDefined</code> toward the easy side at Position 2.
    <ul>
      <li>
        They described it as “clear, concise,” praising how reflection is used in a straightforward
        way to iterate over constants and check for a match. Even though reflection requires some
        prior knowledge, they felt the intent remained easy to follow.
      </li>
    </ul>
  </li>

  <li>
    <strong>Expert C</strong> placed it in Position 3.
    <ul>
      <li>
        They said the control flow is understandable but expressed uncertainty about what each field
        represents and what <code>isSynthetic</code> is doing. They noted that the method “requires
        business knowledge about the domain,” and that using reflection to inspect declared fields
        is “advanced Java stuff that is not very common.”
      </li>
    </ul>
  </li>

  <li>
    <strong>Expert A</strong> placed it in Position 4.
    <ul>
      <li>
        They wrote that the method is “simple to comprehend for someone familiar with reflection”
        but still requires specific API knowledge. They viewed it similarly to
        <code>deleteRecursively</code> in terms of difficulty and noted that both methods require
        more contextual knowledge than the simplest ones like <code>isValidProjectName</code>.
      </li>
    </ul>
  </li>

  <li>
    <strong>Expert E</strong> placed it significantly harder, at Position 6.
    <ul>
      <li>
        They explained that although the reflective loop is recognizable once you see that it's
        iterating over constants, the method still relies on understanding modifiers, synthetic vs
        non-synthetic fields, and why reflection is being used at all. They consistently judged it
        harder than more linear, mathematical methods like <code>lowestPositiveRoot</code>.
      </li>
    </ul>
  </li>

  <li>
    <strong>Expert B</strong> placed <code>isMachineTypeDefined</code> at the extreme hard end
    (Position 8).
    <ul>
      <li>
        They called it “difficult to comprehend,” arguing that the name implies a general
        MachineType check, yet the implementation is tied specifically to
        <code>CoffMachineType</code>. They also noted that one path always triggers a null-pointer
        exception. They grouped it with <code>encodedLength</code> and <code>atan2</code> as “hacky
        or cryptic” functions full of hidden assumptions and errors requiring significant “mental
        debugging.”
      </li>
    </ul>
  </li>
</ul>

<p>
  <strong>Overall</strong>, experts disagreed sharply depending on how comfortable they are with
  reflection, how much domain context they inferred or expected, and how they assessed the clarity
  and intention behind the method’s structure.
</p>
`
},
    {
    snippet: "isValidProjectName",
    // title: "minor disagreement on isValidProjectName",
    text: `
<p>
  <strong>isValidProjectName</strong> shows noticeable disagreement across experts,
  with most placing it in the easiest tier and others rating it slightly or significantly harder.
</p>

<ul>
  <li>
    <strong>Experts A, B, and E</strong> all ranked <code>isValidProjectName</code> in Position 1.
    <ul>
      <li>
        <strong>Expert A</strong> described it as “simple to understand” with “very clear”
        method and variable names. They emphasized that short, self-contained methods like this
        have an obvious purpose and that “the purpose of local variables and called methods is
        clear,” which makes it belong among the easiest code.
      </li>
      <li>
        <strong>Expert B</strong> also viewed it as one of the simplest methods, praising its
        well-structured conditions and noting that each check contributes independently to the
        overall validation. In comparing it to <code>isRemote</code>, they said that “the problem
        of defining a valid project name is more straightforward than that of defining a URI as
        local” and that the project-name validator is “very self explanatory,” reinforcing why
        they consider it strictly easier.
      </li>
      <li>
        <strong>Expert E</strong> likewise considered it very easy, saying that the method
        signature and the simple sequence of checks made it “pretty easy to understand.” They
        highlighted that “everything isValidProjectName does is right there in front of you and
        self-contained,” unlike <code>isRemote</code>, which relies on domain knowledge about URI
        schemes and an unseen helper.
      </li>
    </ul>
  </li>

  <li>
    <strong>Expert C</strong> ranked <code>isValidProjectName</code> slightly harder, in Position 2.
    <ul>
      <li>
        They found it mostly easy to follow but were unsure why both a letter-or-digit check and
        a separate valid-character-set check were necessary. They explained that
        <code>isValidProjectName</code> (and <code>isRemote</code>) requires a bit more domain
        knowledge to understand the special cases, whereas their easiest methods—
        <code>indexOfIgnoreCase</code> and <code>deleteRecursively</code>—can be followed line by
        line without additional assumptions.
      </li>
    </ul>
  </li>

  <li>
    <strong>Expert D</strong> placed <code>isValidProjectName</code> much higher, at Position 4.
    <ul>
      <li>
        They wrote that the method is understandable, but that the initial chain of validations is
        too long and could be “summarized a little without losing the readability.” They
        consistently favored code whose naming and structure felt more compact and directly aligned
        with its purpose, which pushed <code>isValidProjectName</code> outside the easiest tier
        for them.
      </li>
    </ul>
  </li>
</ul>

<p>
  <strong>Overall</strong>, the disagreement arises from how experts weigh the method's length,
  redundancy of checks, and the small amount of domain knowledge it assumes. For some, these
  details are negligible, leaving the method firmly among the easiest; for others, they introduce
  enough overhead to move it into a slightly or significantly harder tier.
</p>
`
  },

 {
  snippet: "indexOfIgnoreCase",
  text: `
<p>
  <strong>indexOfIgnoreCase</strong> shows varied difficulty assessments, with experts split
  between viewing it as one of the easiest methods and placing it solidly in the mid-range.
</p>

<ul>
  <li>
    <strong>Expert C</strong> placed <code>indexOfIgnoreCase</code> in Position 1.
    <ul>
      <li>
        They said it “flowed very naturally,” with each condition playing an obvious role in the
        search logic. They grouped it with <code>deleteRecursively</code>, explaining that both
        methods can be followed line by line, with meaningful variable names and straightforward
        logic.
      </li>
    </ul>
  </li>

  <li>
    <strong>Experts E and D</strong> placed <code>indexOfIgnoreCase</code> in Position 3.
    <ul>
      <li>
        <strong>Expert E</strong> emphasized that the method's control flow is clear and the
        earlier return checks are intuitive. They also contrasted it with more complicated methods
        such as reflection-based ones or UTF-8 encoding, noting that
        <code>indexOfIgnoreCase</code> is fully self-contained.
      </li>
      <li>
        <strong>Expert D</strong> described it as structurally clear and readable, though more
        complex than the very simplest methods.
      </li>
    </ul>
  </li>

  <li>
    <strong>Experts A and B</strong> placed it at Position 5.
    <ul>
      <li>
        <strong>Expert A</strong> acknowledged that the implementation is generally expected but
        pointed out naming issues (e.g., “str,” “endLimit”), saying these reduce readability. They
        felt this pushes the method slightly harder than some reflection-based ones because the
        naming obscures intent.
      </li>
      <li>
        <strong>Expert B</strong> called the method “ok” but noted that the number of intermediate
        values and the hand-rolled search logic makes it less transparent than shorter, simpler
        methods. They said <code>deleteRecursively</code> is easier to follow once one ignores its
        misleading name, and they argued that <code>lowestPositiveRoot</code> can be easier than
        <code>indexOfIgnoreCase</code> because the latter is “reinventing the wheel” instead of
        using built-in substring operations.
      </li>
    </ul>
  </li>
</ul>

<p>
  <strong>Overall</strong>, <code>indexOfIgnoreCase</code> is a clear point of disagreement about
  what counts as truly easy code: some see it as a straightforward implementation of string search,
  while others find its naming, intermediate variables, and reinvention of built-in functionality
  enough to place it in a more effortful mid-range tier.
</p>
`
},

 {
  snippet: "lowestPositiveRoot",
  text: `
<p>
  <strong>lowestPositiveRoot</strong> shows disagreement about how much mathematical familiarity
  should influence perceived difficulty.
</p>

<ul>
  <li>
    <strong>Expert B</strong> placed <code>lowestPositiveRoot</code> in Position 4.
    <ul>
      <li>
        They described the method as “alright,” explaining that implementing a well-known quadratic
        formula makes it easier to follow than methods like <code>indexOfIgnoreCase</code>. Although
        variable names like “det” and “inv” are not ideal, the mathematical structure is familiar.
      </li>
    </ul>
  </li>

  <li>
    <strong>Expert E</strong> placed it in Position 5.
    <ul>
      <li>
        They noted that once you recognize the flow as a direct translation of how one solves a
        quadratic equation by hand, the logic becomes easy to track. Still, they acknowledged it
        requires some mathematical background. They contrasted it with reflection-heavy methods,
        saying <code>lowestPositiveRoot</code> has a linear and self-contained structure.
      </li>
    </ul>
  </li>

  <li>
    <strong>Experts A, C, and D</strong> all placed <code>lowestPositiveRoot</code> at Position 7.
    <ul>
      <li>
        <strong>Expert A</strong> wrote “Not good,” highlighting that it requires previous
        knowledge of the quadratic formula and that abbreviated names like “det,” “sqrtD,” “invA,”
        “r1,” and “r2” provide no clarity to someone unfamiliar with the math involved.
      </li>
      <li>
        <strong>Expert C</strong> said they were “not familiar enough” with the abbreviations and
        felt uncertain about the purpose of swapping the roots. They compared it unfavorably to
        <code>encodedLength</code>, saying <code>lowestPositiveRoot</code> involves “even more
        complicated math.”
      </li>
      <li>
        <strong>Expert D</strong> similarly argued that the unclear variable names and reliance on
        unannotated mathematical steps make the method “quite difficult to understand,” even though
        the underlying idea is just the quadratic formula.
      </li>
    </ul>
  </li>
</ul>

<p>
  <strong>Overall</strong>, <code>lowestPositiveRoot</code> ranges from moderately complex to one
  of the hardest methods, depending on the expert's mathematical comfort level, expectations about
  naming clarity, and tolerance for compact representations of formulas.
</p>
`
}
];


//====================

// Round 3 presentented disagreement points:


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

