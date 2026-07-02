const snippetsOriginal = [
  {
    id: 99,
    title: "Sample Snippet",
    code: `
<span class="keyword">public static</span> <span class="type">int</span> <span class="function">addPositive</span>(<span class="type">int</span> a, <span class="type">int</span> b) {
  <span class="keyword">if</span> (a &lt; 0 || b &lt; 0) {
    <span class="keyword">return</span> <span class="literal">-1</span>;
  }
  <span class="keyword">return</span> a + b;
}`
  }
];


  const questionsPerSnippetOriginal = {
    "99": [
      {
        "type": "short",
        "id": "output",
        "prompt": "What value does the method return when called with the input <code>addPositive(3, -2)</code>? \n\n<div class=\"assumptions\">\n  <p><strong>Assumptions/Notes:</strong></p>\n  <ul>\n    <li>Here might be some extra information about the snippet.</li>\n    <li>For example, clarifying assumptions.</li>\n  </ul>\n</div>",
        "type2": "",
        "id2": "",
        "question2": ""
      },
      {
        "type": "bin",
        "id": "syntaxBL",
        "prompt": "Is the <span class=\"qcode\">||</span> operator used in a conditional expression?",
        "type2": "",
        "id2": "",
        "question2": ""
      },
      {
        "type": "open",
        "id": "function",
        "prompt": "What does this method do? Describe its purpose briefly.",
        "type2": "",
        "id2": "",
        "question2": ""
      },
      {
        "type": "scale",
        "id": "scaleSM",
        "prompt": "How easy or difficult was this snippet to understand?",
        "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
        "type2": "",
        "id2": "",
        "question2": "",
      },
      {
        "type": "scale",
        "id": "scaleST",
        "prompt": "How easy or difficult were the tasks you performed for this snippet?",
        "labels": ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
        "type2": "",
        "id2": "",
        "question2": "",
      }
    ]
  };


    const StartingQuestions = [{
      "type": "none",
      "id": "Read",
      "prompt": "<p class=\"instruction\"><strong>Please read the code snippet and form an overall impression.</strong><span> This should take no more than 2 minutes.</span></p><p class=\"instruction\">When you're ready, confirm that you have read it and click <strong>'Next'</strong> to proceed to the questions. <em>(You will still be able to see the snippet while answering.)</em></p>",
      "type2": "scale",
      "id2": "ReadConfirm",
      "question2": "Have you carefully read the entire snippet and formed an overall impression?",
      "labels2": ["Yes"]
    }];
      
      
      const messagesShort = [
        "Not so fast! You’ve earned this break — stay put.",
        "Deep breath in... and out. Let it all go.",
        "Your back thanks you. Just sit. Just be.",
        "Nothing to do. Nowhere to go. Just here.",
        "Blink slowly. Reset your eyes. Feels good, right?",
        "No clicking allowed — your hands are on vacation.",
        "The chair feels like a throne right now.",
        "If calm had a shape, you’d be sitting in it.",
        "Let your shoulders drop. They’ve been working too hard.",
        "Eyes off the screen for a second — even that helps.",
        "Imagine your thoughts stretching like a cat.",
        "The air is still. Your brain is idling.",
        "You’re doing nothing — and that’s everything.",
        "Still too soon. Let your breath take the lead.",
        "Feel your weight in the chair — grounded and still.",
        "A single minute can work quiet magic.",
        "The code isn’t going anywhere. Neither are you.",
        "Drift... just a little. You're still right here.",
        "The timer ticks — you're still not allowed to think yet.",
        "Soften your gaze. No one’s judging.",
        "You are currently: buffering.",
        "The best ideas start in moments like this.",
        "Pause. Don’t plan. Don’t prepare. Just pause.",
        "Don’t even *think* about typing yet.",
        "You can resume soon — but not now.",
        "Let stillness do its thing a bit longer.",
        "This is the quiet moment your brain loves.",
        "The seconds stretch out like a good sigh.",
        "Almost there — but stay just a bit longer.",
        "Okay… now you're ready. Let’s get back to it."
      ];
      

      const messagesLong = [
        "You made it to the long break! Time to relax — your way.",
        "Step away if you'd like, or just sit back and breathe.",
        "Stretch your legs… or stay put and stretch your thoughts.",
        "No rush. Move slowly. This time is yours.",
        "Use the restroom, refill your water, or simply rest.",
        "Eyes tired? Now’s a great time to look away.",
        "You don’t need to *do* anything right now.",
        "If you leave, return quietly to keep the peace.",
        "The best break is the one that works for you.",
        "Just sitting quietly is a perfectly good option.",
        "Move your neck, roll your shoulders — simple is enough.",
        "If your body wants to move, let it. If not, let it be.",
        "A quiet stretch can feel like a reboot.",
        "You’re off the clock for a few minutes. Enjoy it.",
        "The screen will wait. Your wellbeing comes first.",
        "Standing up is great. So is sitting still.",
        "This is your mental cool-down. Let it work.",
        "A short walk? A quiet pause? Either is valid.",
        "Let your brain catch its breath — it’s been busy.",
        "Take a moment for yourself before we dive back in.",
        "Want to close your eyes? Nobody’s judging.",
        "Breaks like these aren’t wasted — they’re necessary.",
        "Let your thoughts drift. Even coders need daydreams.",
        "Coffee? Water? A breath of air? Take your pick.",
        "The best thinking happens when you're not trying.",
        "A short reset now will boost your focus later.",
        "Just one goal: be kind to your brain and body.",
        "Even a quiet moment of stillness counts as rest.",
        "Almost there — return when you’re ready, gently.",
        "Okay, time’s nearly up. Bring your calm self back."
      ];
      