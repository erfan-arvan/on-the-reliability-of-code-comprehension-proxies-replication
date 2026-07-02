window.DISAGREEMENTS = [
  {
    id: "1",
    title: "lowestPositiveRoot",
    "snippet-id": "lowestPositiveRoot",
    htmltext: `<code>lowestPositiveRoot</code> sits at the center of multiple disagreements:
<ul>
  <li>Against <code>indexOfIgnoreCase</code>: Martin has <code>indexOfIgnoreCase</code> &gt; <code>lowestPositiveRoot</code>; Oscar has the opposite; Nadeeshan ties them.</li>
  <li>Against <code>deleteRecursively</code>: Martin has <code>deleteRecursively</code> &gt; <code>lowestPositiveRoot</code>; Oscar and Nadeeshan have the opposite.</li>
  <li>Against <code>isRemote</code>: Martin & Oscar have <code>isRemote</code> &gt; <code>lowestPositiveRoot</code>; Nadeeshan ties them.</li>
</ul>
<p>The open questions are: (1) Is <code>lowestPositiveRoot</code> clearly harder than <code>deleteRecursively</code> (majority view) or not (Martin)? (2) Should it be tied with <code>indexOfIgnoreCase</code> (Nadeeshan) or clearly above/below (Martin/Oscar)? (3) Is it distinct from <code>isRemote</code> or tied?</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin (via indexOfIgnoreCase/deleteRecursively reflections):</strong></p>
    <ul>
      <li>On <code>indexOfIgnoreCase</code>: “not too hard to follow ... regionMatches ... not that complex.”</li>
      <li>On <code>deleteRecursively</code>: “willing to shift it downwards, but not below <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code>.”</li>
    </ul>

    <p><strong>Oscar (via reflections):</strong></p>
    <ul>
      <li>“<code>indexOfIgnoreCase</code> doesn’t require specialized knowledge ... <code>deleteRecursively</code> does (visitor pattern), which makes it more obscure.”</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> The overall purpose of <code>lowestPositiveRoot</code> is clear.</li>
      <li><strong>Q2:</strong> From a typical engineer’s perspective, if carefully read, the logic is straightforward. Even without documentation for <span style="font-style: italic;">regionMatches</span>, its parameters make the intent clear.</li>
      <li><strong>Q3:</strong> No, I would not change the rank of <code>lowestPositiveRoot</code>.</li>
    </ul>
  </div>
</details>`
  },
  {
    id: "2",
    title: "indexOfIgnoreCase vs lowestPositiveRoot (and vs isRemote)",
    "snippet-id": "indexOfIgnoreCase",
    htmltext: `Experts diverged on whether <code>indexOfIgnoreCase</code> should be above, below, or tied with <code>lowestPositiveRoot</code>, and whether it is distinct from or tied with <code>isRemote</code>. A key point is how much <span style="font-style: italic;">regionMatches</span> (and similar APIs) create real barriers for typical engineers.
<ul>
  <li><strong>Martin</strong> placed <code>indexOfIgnoreCase</code> above <code>lowestPositiveRoot</code>, noting <span style="font-style: italic;">regionMatches</span> can be looked up and the rest is straightforward.</li>
  <li><strong>Oscar</strong> placed <code>indexOfIgnoreCase</code> below <code>lowestPositiveRoot</code>, concerned unfamiliar APIs may hinder comprehension.</li>
  <li><strong>Nadeeshan</strong> tied <code>indexOfIgnoreCase</code> with <code>lowestPositiveRoot</code>, and also tied it with <code>isRemote</code>, suggesting comparable difficulty after careful reading.</li>
</ul>
<p>The unresolved issue is whether <code>indexOfIgnoreCase</code> sits above <code>lowestPositiveRoot</code>, below it, or tied; and whether it should be distinct from <code>isRemote</code>.</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I stand by my round 2 response: <code>indexOfIgnoreCase</code> isn't too hard to follow. The only tricky part is <span style="font-style: italic;">regionMatches</span>, and IRL any engineer unfamiliar with that would immediately look it up. I read its Javadoc, and it's not that complex.</li>
      <li><strong>Q2:</strong> No.</li>
      <li><strong>Q3:</strong> Yes: I think I agree with Nadeeshan that it could be shifted left, below <code>atan2</code> and maybe <code>isMachineTypeDefined</code>.</li>
    </ul>

    <p><strong>Oscar:</strong></p>
    <ul>
      <li><strong>Q1:</strong> Tend to agree with Nadeeshan: <code>indexOfIgnoreCase</code> doesn't require specialized knowledge, but <code>deleteRecursively</code> does (visitors).</li>
      <li><strong>Q2:</strong> yeah</li>
      <li><strong>Q3:</strong> yeah, I will factor in more the specialized knowledge needed to understand the code</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I agree on the point that the overall purpose of <code>indexOfIgnoreCase</code> is clear.</li>
      <li><strong>Q2:</strong> From a typical engineer’s perspective, if one carefully reads the code, the logic is straightforward. Even without documentation for <span style="font-style: italic;">regionMatches</span>, its parameters make the intent inferable.</li>
      <li><strong>Q3:</strong> No, I would not change the rank of <code>lowestPositiveRoot</code>.</li>
    </ul>
  </div>
</details>`
  },
  {
    id: "3",
    title: "deleteRecursively vs lowestPositiveRoot",
    "snippet-id": "deleteRecursively",
    htmltext: `Experts disagreed on whether <code>deleteRecursively</code> should be ranked above or below <code>lowestPositiveRoot</code>. The crux is how much specialized knowledge of the Java File API and the Visitor pattern should be assumed for typical engineers.
<ul>
  <li><strong>Martin</strong> placed <code>deleteRecursively</code> above <code>lowestPositiveRoot</code>, finding the spec clear and the idiom recognizable once you know the API.</li>
  <li><strong>Oscar</strong> and <strong>Nadeeshan</strong> placed <code>lowestPositiveRoot</code> above <code>deleteRecursively</code>, arguing the Visitor pattern introduces extra difficulty.</li>
</ul>
<p>The question: does clear structure + naming offset pattern/API familiarity, or does that familiarity dominate comprehensibility?</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong></p>
    <ul>
      <li><strong>Q1:</strong> Nadeeshan and I broadly agree: the spec is clear but understanding depends on API familiarity. Oscar also agrees on the clear spec, but because he knows the idiom he ranks it very easy. For a non-expert, it’s trickier. I prefer the middle ranking.</li>
      <li><strong>Q2:</strong> We all agree on what's there, but not on how to interpret it.</li>
      <li><strong>Q3:</strong> Yes: I'm willing to shift it a bit downwards, but not below <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code>.</li>
    </ul>

    <p><strong>Oscar:</strong></p>
    <ul>
      <li><strong>Q1:</strong> The visitor pattern requires specialized knowledge not everybody has, so I may move <code>deleteRecursively</code> to the right.</li>
      <li><strong>Q2:</strong> yes</li>
      <li><strong>Q3:</strong> yes</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I agree with Martin that understanding <code>deleteRecursively</code> properly requires Java file system knowledge.</li>
      <li><strong>Q2:</strong> Yes.</li>
      <li><strong>Q3:</strong> Yes. I would move it from 6 to 5. But still, domain knowledge is required.</li>
    </ul>
  </div>
</details>`
  },
    {
    id: "4",
    title: "isRemote vs indexOfIgnoreCase & lowestPositiveRoot",
    "snippet-id": "isRemote",
    htmltext: `In previous rounds, experts disagreed on whether <code>isRemote</code> is distinctly simpler than <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code>, or about the same level.
<ul>
  <li><strong>Martin</strong> and <strong>Oscar</strong> ranked <code>isRemote</code> higher than both, citing short, direct logic without deep API/pattern knowledge.</li>
  <li><strong>Nadeeshan</strong> tied <code>isRemote</code> with <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code>, arguing all three are comparably straightforward when read carefully.</li>
</ul>
<p>The disagreement centers on whether <code>isRemote</code>’s brevity justifies placing it above the others, or tying them.</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong></p>
    <ul>
      <li><strong>Q1:</strong> We broadly agree. I think it's worth differentiating <code>isRemote</code> from <code>isValidProjectName</code>, and Oscar and I agree that this one is a little bit trickier. I think Nadeeshan would agree that, if he had to choose, <code>isRemote</code> is a little more complex. So, I think we'll agree on <code>isValidProjectName</code> at the bottom, and <code>isRemote</code> above it.</li>
      <li><strong>Q2:</strong> No.</li>
      <li><strong>Q3:</strong> No.</li>
    </ul>

    <p><strong>Oscar:</strong></p>
    <ul>
      <li><strong>Q1:</strong> Yeah, maybe I'm giving too much importance to understanding the intention of checking the scheme is jar or file to check that the URI is or isn't remote.</li>
      <li><strong>Q2:</strong> yep</li>
      <li><strong>Q3:</strong> yep, need to see the other methods.</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I agree with Oscar on <code>isRemote</code>’s URI implementation logic. However, despite that uncertainty, the purpose of the method remains clear to me.</li>
      <li><strong>Q2:</strong> Yes.</li>
      <li><strong>Q3:</strong> I would change rank of <code>isRemote</code> from 1 to 2</li>
    </ul>
  </div>
</details>`
  }
];
