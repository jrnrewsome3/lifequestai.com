/* =====================================================================
   BLOG POSTS
   =====================================================================
   TO ADD A POST: copy one block below, paste it at the TOP of the array,
   change the fields, then run:  npm run build

   slug     -> the web address: /blog/<slug>/   (lowercase, dashes, no spaces)
   title    -> the headline
   dek      -> one-sentence summary, shown on cards and in Google results
   category -> groups posts on the blog page (reuses existing ones if you match spelling)
   date     -> YYYY-MM-DD
   classId  -> which class this post should send readers to (1-10)
   body     -> the article itself, in simple HTML: <p>, <h2>, <ul><li>, <blockquote>
   ===================================================================== */

const POSTS = [
  {
    slug: 'automation-vs-agent',
    title: 'Automation vs. Agent: Which One Does Your Problem Actually Need?',
    dek: 'Both run without you. Only one of them decides what to do next — and that difference determines which you should build.',
    category: 'Automation',
    date: '2026-08-14',
    classId: 9,
    body: `
<p>“Agent” is the word of the year, which means it is now attached to things that are not agents. That would be a harmless marketing problem except for one thing: building the wrong one wastes weeks. So here is the distinction in plain language, and a test you can apply to your own problem in about a minute.</p>

<h2>An automation follows a path you drew</h2>
<p>An automation is a fixed sequence. Something happens, then steps run in order. A form gets submitted, so a row is added to a spreadsheet, an AI step drafts a summary, and the summary lands in your inbox. Every single time, the same path.</p>
<p>That rigidity is a feature, not a limitation. Automations are cheap, fast, and boringly reliable. When one breaks, you can point at the step that broke. If you can sketch your process as a flowchart on the back of an envelope, you want an automation — and you can probably build it in an afternoon.</p>

<h2>An agent decides its own path</h2>
<p>An agent is given a goal, a set of tools, and permission to figure out the steps. You do not tell it “first search, then summarize, then email.” You tell it what a good outcome looks like and let it choose what to do, in what order, adapting as it goes.</p>
<p>That flexibility is genuinely powerful for work where the steps cannot be known in advance. “Research these fifteen suppliers and flag anything concerning” is agent work — what counts as concerning varies per supplier, and the path through the research depends on what turns up.</p>
<p>It is also slower, more expensive per run, and less predictable. An agent can take a reasonable-looking wrong turn and burn twenty steps on it. This is the part the demos leave out.</p>

<h2>The one-minute test</h2>
<p>Ask yourself: <strong>can I draw the flowchart?</strong></p>
<ul>
<li><strong>Yes, easily.</strong> Build an automation. You are done deciding.</li>
<li><strong>Yes, but it has a few branches.</strong> Still an automation. Branches are just conditions, and conditions are cheap.</li>
<li><strong>No, because it depends on what we find.</strong> Now you are in agent territory.</li>
<li><strong>No, because I have never actually mapped this process.</strong> This is the most common answer, and it means the real task is mapping the process — not building anything yet.</li>
</ul>
<p>That last one deserves emphasis. A surprising amount of “we need AI for this” turns out to be “we have never written down how we do this.” Writing it down often reveals that three of the seven steps exist only because someone left the company in 2019.</p>

<h2>Whichever you build, keep a human on the consequences</h2>
<p>The single most important design decision is not automation versus agent. It is which actions require a person to say yes.</p>
<p>My rule: anything that <em>sends, pays, publishes, or deletes</em> gets an approval step. The system can do all the work — draft the email, prepare the payment, write the post, identify the files — and then stop and wait for a human. You keep nearly all the time savings and you eliminate nearly all the catastrophic outcomes.</p>
<blockquote>Automating a task you have never verified is just making the same mistake faster and more often.</blockquote>
<p>Start with something small, repetitive, and low-stakes. Get it running. Watch it for a week. The confidence you build from one boring automation that actually works is worth more than an ambitious agent you do not trust.</p>
`
  },

  {
    slug: 'fix-three-processes',
    title: 'Don’t “Adopt AI.” Fix Three Processes.',
    dek: 'The organizations getting real value from AI didn’t roll out a strategy. They picked the three most repetitive things they do and attacked those.',
    category: 'Small Business',
    date: '2026-08-04',
    classId: 7,
    body: `
<p>“We need an AI strategy” is a sentence that produces meetings. “Our quoting process takes four hours and we do it eleven times a month” is a sentence that produces results.</p>
<p>If you run a small business or a nonprofit, you do not have spare capacity for a transformation initiative. You have a Tuesday. So here is a method for finding where AI will actually pay off in your organization, which takes about an hour and requires no technology at all.</p>

<h2>Step one: list what you actually repeat</h2>
<p>Open a blank page and write down every recurring process in your organization. Not projects — <em>processes</em>. Things that happen again and again: writing proposals, answering the same twelve customer questions, producing the monthly report, onboarding a new hire, drafting the newsletter, researching grants, chasing invoices, updating the website.</p>
<p>Aim for fifteen to twenty. Most people are surprised by the length of this list, which is itself informative.</p>

<h2>Step two: score each one on three things</h2>
<p>For each process, note three numbers:</p>
<ul>
<li><strong>Frequency</strong> — how many times a month does this happen?</li>
<li><strong>Time</strong> — how long does one round take, honestly, including the part where you avoid starting it?</li>
<li><strong>Tolerance</strong> — if the first draft were 80% right and needed editing, would that be fine? Or does this need to be perfect and defensible on the first pass?</li>
</ul>
<p>Multiply frequency by time to get monthly hours. Then look at tolerance, because it is the deciding factor people skip. A task that eats twelve hours a month but must be flawless and legally precise is a bad first candidate. A task that eats six hours a month where a solid draft saves you most of the work is an excellent one.</p>

<h2>Step three: pick three and ignore everything else</h2>
<p>Sort by monthly hours, filter for high tolerance, take the top three. Those are your projects. Write them on something you will see.</p>
<p>The discipline here is the ignoring. Every organization I have watched try this has been tempted to start with the most <em>interesting</em> opportunity rather than the most <em>repetitive</em> one. The interesting one makes a better story at a conference. The repetitive one gives you back your Thursday afternoons, which is what you actually wanted.</p>

<h2>Step four: write down how you do it now</h2>
<p>Before you bring AI anywhere near the process, document the current version. Plain steps, in order, the way you would explain it to a new hire.</p>
<p>Two things happen when you do this. First, you find dead steps — approvals nobody reads, fields nobody uses, a spreadsheet that exists because of a problem you solved years ago. Removing those is free improvement that requires no technology. Second, you now have the exact context an AI tool needs to be useful. “Here is how we write proposals, here are two good examples, draft one for this client” produces something usable. “Write me a proposal” produces something generic.</p>

<h2>What good looks like after a month</h2>
<p>Not “we are an AI-forward organization.” Something more like: the quote that took four hours takes ninety minutes, the newsletter gets written on the day it was scheduled instead of four days late, and the twelve repeated customer questions have solid answers that anyone on the team can send.</p>
<blockquote>Three fixed processes beat one grand strategy, every time.</blockquote>
<p>Then — and only then — pick the next three.</p>
`
  },

  {
    slug: 'kids-ai-homework-conversation',
    title: 'Your Kid Is Already Using AI for Homework. Here’s the Conversation to Have.',
    dek: 'The useful question isn’t whether they used AI. It’s whether the learning still happened — and that’s a line a family can actually agree on.',
    category: 'Families',
    date: '2026-07-21',
    classId: 5,
    body: `
<p>Most households are running one of two policies right now. Either “we don’t talk about it,” or a blanket ban that everyone quietly ignores. Neither one teaches a kid anything about the tool they are going to use for the rest of their working life.</p>
<p>Here is a framing that works better, because it draws the line where the line actually belongs.</p>

<h2>The line is learning, not tools</h2>
<p>Forget “is using AI cheating.” Ask instead: <strong>did the learning still happen?</strong></p>
<p>A calculator does not prevent a kid from understanding math — unless they never learned what the operations mean. Same principle here, and it sorts almost every situation cleanly into three buckets.</p>
<ul>
<li><strong>AI does the work.</strong> It writes the essay, solves the problems, produces the thing that gets submitted. The learning did not happen. This is the line, and it is worth naming plainly.</li>
<li><strong>AI explains the work.</strong> “I don’t understand why this step happens — explain it three different ways.” “Quiz me on this chapter.” “What am I missing in my argument?” The learning absolutely happened, often better than it would have alone. A patient tutor who never sighs is a real gift to a struggling kid.</li>
<li><strong>AI checks the work.</strong> They wrote it, then asked for feedback. This is fine and genuinely valuable — with one caveat below.</li>
</ul>

<h2>The test that settles arguments</h2>
<p>Ask them to explain it to you without the screen.</p>
<p>If they can walk you through their reasoning, defend a choice, and answer “why did you do it that way” — the learning happened, whatever tools were involved. If they cannot explain their own submitted work, it is not theirs, and they know it. This test is fast, hard to game, and it moves the conversation off enforcement and onto understanding, which is where you wanted it.</p>

<h2>The caveat on feedback</h2>
<p>AI feedback is confident and often generic. It will happily rewrite a kid's distinctive sentence into corporate mush and call it an improvement. Worth saying out loud: <em>you are allowed to disagree with it.</em> Learning to reject bad advice from a confident source is arguably the most transferable skill in this entire conversation.</p>

<h2>What to actually say</h2>
<p>Skip the lecture. Sit down together and try it on something real — a chapter they are struggling with, not an assignment due tomorrow. Use it as a tutor for twenty minutes. You will both learn more from that than from any policy discussion.</p>
<p>Then agree on a few house rules and write them down. Ours would look something like:</p>
<ul>
<li>You can use AI to understand, practice, and check. Not to produce.</li>
<li>If you cannot explain it, you cannot submit it.</li>
<li>Whatever your teacher's rule is, that rule wins.</li>
<li>Never put your full name, school, address, or photos into an AI tool.</li>
<li>If something it says seems off, bring it to a person.</li>
</ul>

<h2>The part that matters more than the rules</h2>
<p>Your kid is going to enter a workplace where using these tools well is assumed. The households that treat AI as contraband are not producing kids who avoid it — they are producing kids who use it secretly and badly.</p>
<blockquote>The goal is not a kid who avoids AI. It’s a kid who can tell when it’s wrong.</blockquote>
<p>That takes practice, out loud, with an adult in the room. Which is a much better use of a Sunday afternoon than another argument about screen time.</p>
`
  },

  {
    slug: 'five-minute-meeting-prep',
    title: 'The Five-Minute Meeting Prep That Makes You the Most Prepared Person in the Room',
    dek: 'One prompt, three inputs, and the five minutes before a meeting instead of the night before.',
    category: 'Productivity',
    date: '2026-07-07',
    classId: 4,
    body: `
<p>Most meeting preparation fails not because people are lazy but because it is scheduled wrong. You intend to prepare the night before, the night before fills up, and you arrive having skimmed the invite in the hallway.</p>
<p>This version takes five minutes and happens immediately before the meeting, which is the only time you reliably have.</p>

<h2>Gather three things</h2>
<p>No system required. Just collect:</p>
<ul>
<li>The calendar invite — title, attendees, any agenda</li>
<li>Notes from the last conversation with these people, if any exist</li>
<li>The most recent email thread or document that this meeting is about</li>
</ul>
<p>Paste all three into your AI tool. Messy is fine. It does not need to be tidy to be useful.</p>

<h2>Ask for four things, not a summary</h2>
<p>“Summarize this” gets you a summary you did not need. Ask instead for the things you would have thought about if you had an hour:</p>
<blockquote>Here are the invite, my notes from last time, and the current thread. Before this meeting, give me: (1) who is attending and what each person most likely wants out of this, (2) what is still outstanding since we last spoke, (3) three questions worth asking that would move this forward, and (4) one risk or objection nobody has raised yet. Be brief. Flag anything you are unsure about.</blockquote>
<p>That last instruction matters. Without it you get four confident sections and no signal about which parts were inferred.</p>

<h2>Then do the part only you can do</h2>
<p>Read the output and cut it in half.</p>
<p>You know things the model does not: that the second attendee has been skeptical since March, that the “outstanding item” was quietly dropped, that the risk it flagged is real but not sayable in this room. The output is a starting draft of your own thinking, not a script. People who skip this step walk in and read AI-generated questions aloud, which is transparent and slightly embarrassing.</p>
<p>What you want in your hand when you walk in: two or three questions and one thing to watch for. That is it. That is what being prepared actually looks like.</p>

<h2>Why it compounds</h2>
<p>Do this for two weeks and something shifts. You stop being the person who is catching up during the first ten minutes. You are the person who says “before we start — where did we land on the pricing question from last time?” and watches the room reorganize around you.</p>
<p>Then keep the prompt. Save it somewhere you can grab it in four seconds. A prompt you have to rewrite each time is a prompt you will stop using — the entire value is in the reuse.</p>
<blockquote>The best AI workflows are unglamorous, take five minutes, and run every single week.</blockquote>
<p>After the meeting, one more pass is worth it: paste your rough notes back in and ask for the follow-up message and a list of what you committed to. The follow-up that actually gets sent is worth more than the perfect one you draft on Friday and never send.</p>
`
  },

  {
    slug: 'why-ai-answers-are-generic',
    title: 'Why Your AI Answers Come Back Generic — And the Four Things That Fix It',
    dek: 'Disappointing AI output is almost never a capability problem. It’s a communication problem, and it has four specific causes.',
    category: 'Prompting',
    date: '2026-06-23',
    classId: 2,
    body: `
<p>The most common complaint I hear about AI tools is some version of “it just gives me generic fluff.” It is a fair complaint. It is also, nearly always, fixable in one round — because the output is generic for a specific and diagnosable reason.</p>
<p>Here is what is missing, in the order it usually goes wrong.</p>

<h2>1. Context — what it needs to know</h2>
<p>Compare “write a follow-up email to a client” with “write a follow-up to a client who asked for a discount I can’t give, who has been with us three years, and who I don’t want to lose.”</p>
<p>The first has no situation in it, so you get the average of every follow-up email ever written. That average is exactly the fluff you are complaining about. Context does not have to be long — two sentences of real specifics beats a page of background.</p>

<h2>2. Task — what you actually want</h2>
<p>“Help me with my newsletter” is not a task. “Turn these three bullet points into a 200-word opening paragraph” is a task.</p>
<p>Vague asks force the model to guess what you want, and its guess is the safest, blandest interpretation. When you find yourself disappointed, check whether you actually stated the deliverable.</p>

<h2>3. Format — how you want it back</h2>
<p>This one is free and almost nobody uses it. You can ask for a table. A checklist. Five options ranked by cost. An outline with speaker notes. Three sentences, not three paragraphs.</p>
<p>Left unspecified, you get prose — usually more prose than you wanted, in a structure you now have to reorganize. Specifying format eliminates most of your editing.</p>

<h2>4. Constraints — the guardrails</h2>
<p>What should it avoid? What must it include? Who is the audience? “Explain this for someone who has never used a spreadsheet” and “explain this for our CFO” are different documents. “Don’t use marketing language” is a constraint that improves almost any draft.</p>

<h2>Watch it work</h2>
<p><strong>Before:</strong> “Write a post about our new class.”</p>
<p><strong>After:</strong> “We’re launching a 3-hour beginner AI class for people who’ve never used ChatGPT — a lot of them are nervous about it. Write a short social post, under 80 words, that speaks to the nervousness rather than hyping the technology. Warm and plain, no exclamation marks, no phrases like ‘unlock the power of AI.’ Give me three options with different opening lines.”</p>
<p>Same tool, thirty extra seconds of typing, completely different result. Everything added there was just context, task, format, and constraints.</p>

<h2>The habit that makes this stick</h2>
<p>When you get a prompt that works, <em>save it.</em> Most of what you do repeats weekly, so most of your prompting should be reuse, not invention. Ten saved prompts covering the things you actually do beats a hundred clever ones you found online and never opened again.</p>
<blockquote>You are not bad at AI. You are being polite and brief with something that needs specifics.</blockquote>
<p>And when a first attempt lands badly, do not rewrite from scratch — say what is wrong with it. “Too formal, and cut the second paragraph” gets you there faster than starting over.</p>
`
  },

  {
    slug: 'catch-ai-mistakes',
    title: 'AI Sounds Certain Even When It’s Wrong. Here’s the Two-Minute Fix.',
    dek: 'These tools don’t look things up — they predict plausible text. Once you understand that, catching the errors becomes a habit rather than a worry.',
    category: 'Getting Started',
    date: '2026-06-09',
    classId: 1,
    body: `
<p>The first genuinely unnerving experience most people have with AI is catching it in a confident lie. It cites a study that does not exist. It states a number that is wrong. It describes a feature of a product that was never built. And it does all of this in the same calm, competent tone it uses when it is right.</p>
<p>This is the single most important thing to understand about these tools, and it takes about a paragraph.</p>

<h2>Why it happens</h2>
<p>When you type a question, the tool is not searching a database of facts and reporting back. It is predicting what text most plausibly comes next, based on patterns learned from an enormous amount of writing.</p>
<p>Most of the time, plausible and true are the same thing — which is why it works so well. But when they diverge, the tool has no internal alarm. It cannot feel uncertain. A fabricated citation is generated by exactly the same process as a correct one, which is why it arrives with exactly the same confidence. The industry calls this “hallucination,” a word that unhelpfully suggests something rare and dramatic. It is neither. It is the normal behavior of the machine at the edge of what it knows.</p>

<h2>Where the errors cluster</h2>
<p>They are not random. Errors concentrate around:</p>
<ul>
<li><strong>Specific numbers</strong> — statistics, prices, dates, dosages, measurements</li>
<li><strong>Citations and sources</strong> — paper titles, authors, page numbers, URLs</li>
<li><strong>Recent events</strong> — anything after its training cutoff, or that changed lately</li>
<li><strong>Niche specifics</strong> — small companies, local regulations, your particular software version</li>
<li><strong>Anything you led it toward</strong> — ask “why is X true?” and it will explain why X is true, whether or not X is true</li>
</ul>
<p>That last one catches people constantly. These tools are agreeable. If you embed a false premise in your question, you will usually get an elaborate defense of it.</p>

<h2>The two-minute habit</h2>
<p>You do not need to fact-check everything. You need to decide, up front, which category you are in:</p>
<p><strong>Is this throwaway, or does it touch money, health, law, or my reputation?</strong></p>
<p>Brainstorming, rephrasing an email, explaining a concept, outlining a plan — errors are cheap and obvious, so move fast. But if the output touches a financial decision, a medical question, a legal obligation, or something going out under your name, spend the two minutes:</p>
<ul>
<li><strong>Name-check the specifics.</strong> Every number, name, and date gets verified independently. Not by asking the AI again — it will confidently confirm its own invention.</li>
<li><strong>Open the source.</strong> If it cited something, actually click it. Fabricated citations look completely normal until you look for them.</li>
<li><strong>Ask what would make it wrong.</strong> “What are the strongest objections to this?” and “what would have to be true for this to be bad advice?” surface shaky reasoning remarkably well.</li>
<li><strong>Check it against what you know.</strong> You are the domain expert on your own life and work. If something feels off, it usually is.</li>
</ul>

<h2>The reframe that makes this easy</h2>
<p>Treat AI output as a first draft from a fast, widely-read, occasionally overconfident assistant who never says “I’m not sure.” You would not forward that person’s work to a client unread. You also would not refuse to work with them — they are enormously useful.</p>
<blockquote>Use AI freely where you can verify quickly, or where being roughly right is good enough. Slow down where being wrong is expensive.</blockquote>
<p>That is the whole discipline. It takes minutes to learn and it is the difference between people who get burned once and quit, and people who quietly get faster at their work every month.</p>
`
  }
];

export { POSTS };
