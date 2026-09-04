/* ============================================================
   Veronica Singh | conversational portfolio

   The answers below are written by hand. There is no model
   behind this page and no API key in it. Every figure appears
   somewhere else on this site and can be walked through in an
   interview. If a question is not covered, the page says so
   rather than guessing.

   No browser storage APIs are used anywhere.
   ============================================================ */
(function () {
  'use strict';

  var EMAIL = 'veronica.singh2525@gmail.com';
  var TEL = '+919555914534';
  var TELSHOW = '+91 95559 14534';
  var LI = 'https://www.linkedin.com/in/veronicasingh250803';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- small builders --------------------------------------- */

  function figs(rows) {
    var out = '<div class="numset">';
    for (var i = 0; i < rows.length; i++) {
      out += '<div class="num"><b>' + rows[i][0] + '</b><span>' + rows[i][1] + '</span></div>';
    }
    return out + '</div>';
  }

  function proj(o) {
    var out = '<div class="proj">';
    if (o.shot) {
      out += '<img class="proj-shot" src="' + o.shot + '" alt="' + o.alt + '" loading="lazy">';
    }
    out += '<div class="proj-body">';
    if (o.badge) out += '<span class="badge">' + o.badge + '</span>';
    out += '<h3>' + o.name + '</h3><p class="proj-sub">' + o.sub + '</p>';
    if (o.figs) {
      out += '<ul class="proj-figs">';
      for (var i = 0; i < o.figs.length; i++) out += '<li>' + o.figs[i] + '</li>';
      out += '</ul>';
    }
    return out + '<a class="go" href="' + o.href + '">Read the case study</a></div></div>';
  }

  var MAIL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2.5 7 9.5 6 9.5-6"/></svg>';
  var IN_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';
  var TEL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';

  var REACH =
    '<div class="reach">' +
    '<a href="' + LI + '" rel="me noopener" target="_blank">' + IN_SVG + 'LinkedIn</a>' +
    '<a href="mailto:' + EMAIL + '">' + MAIL_SVG + EMAIL + '</a>' +
    '<a href="tel:' + TEL + '">' + TEL_SVG + TELSHOW + '</a>' +
    '</div>';

  /* ---- the answers ------------------------------------------ */

  var ESOP_CARD = proj({
    shot: 'img/esop-repository.png',
    alt: 'The ESOP Loan Repository, showing repayment schedules joined across eleven sources',
    name: 'ESOP Loan Repository',
    sub: 'Eleven spreadsheets owned by five teams, replaced with one system of record',
    figs: ['Live in production', 'Around 300 loans', '11 spreadsheets, 5 teams', '108 deployments in 4 months'],
    href: 'project-esop-repository.html'
  });

  var EFOS_CARD = proj({
    shot: 'img/ef-os-overview.png',
    alt: 'The Employee Financing Process OS business overview screen',
    name: 'Employee Financing Process OS',
    sub: 'The monthly deduction, invoicing and payment cycle for two lenders',
    badge: 'In build',
    figs: ['2,886 employees a month', 'Two lenders', '220 automated tests', '86 commits in 3.5 weeks'],
    href: 'project-financing-os.html'
  });

  var A = {

    about: {
      keys: ['about you', 'about veronica', 'who are you', 'who is veronica', 'your background',
             'your story', 'introduce', 'yourself', 'bio'],
      html:
        '<p>I did not arrive at product through a product title. I arrived by owning a lending book: its eligibility rules, its pricing, its repayment mechanics and its collections. Then I built the systems that keep it honest.</p>' +
        '<p>Today I am an aspiring product manager at FinZ, the fintech vertical at PhysicsWallah, responsible for two products. <b>ESOP Financing</b> lends against pledged ESOP shares so employees can pay the exercise tax before the shares turn into cash. <b>Employee Financing</b> is salary advance and top-up loans, recovered from monthly pay through payroll deduction.</p>' +
        '<p>What I am working towards is a product role where the correctness bar is part of the job. Fintech, internal platforms, or anywhere the expensive mistakes are the quiet ones.</p>',
      chips: ['principles', 'work', 'education', 'contact']
    },

    best: {
      keys: ['best project', 'best work', 'proudest', 'favourite project', 'favorite project',
             'strongest', 'best thing', 'most proud', 'best case'],
      html:
        '<p>The ESOP Loan Repository. It is live in production, I built it solo, and it changed a decision rather than just a screen.</p>' +
        '<p>Around 300 loans, and the entire lifecycle ran on eleven spreadsheets owned by five different teams. The obvious brief was a better calculator. The money maths is deterministic and easy. The real problem was five teams holding five versions of the truth with no way to prove which was right, which makes it a system of record, not a calculator.</p>' +
        '<p>The decision I would defend hardest: releasing pledged shares cannot be undone, and in the original process a loan qualified for release if a spreadsheet field said Closed. A human editable cell was authorising an irreversible transfer of collateral. I removed that path and keyed the release queue on evidence that cash actually arrived. The tradeoff I accepted is that a loan genuinely repaid through an unrecorded channel waits until the payment is logged. Failing to release on time is a support ticket. Releasing collateral wrongly is not.</p>' +
        ESOP_CARD,
      chips: ['esop', 'efos', 'ai', 'limits']
    },

    work: {
      keys: ['your work', 'the work', 'projects', 'case study', 'case studies', 'portfolio',
             'what have you built', 'what did you build', 'show me your work', 'everything'],
      html:
        '<p>Two internal systems, both built for a book that moves real money. One is live, one is in build.</p>' +
        ESOP_CARD + EFOS_CARD,
      chips: ['esop', 'efos', 'best']
    },

    esop: {
      keys: ['esop', 'repository', 'case 01', 'case one', 'first case', 'pledged', 'unpledge',
             'collateral', 'compliance', 'designated person', 'insider'],
      html:
        '<p><b>The problem.</b> PhysicsWallah grants ESOP. Exercising it triggers a tax bill immediately, long before the shares are worth anything spendable, so FinZ lends against the pledged shares. Around 300 loans, and the entire lifecycle ran on eleven spreadsheets owned by five different teams.</p>' +
        '<p><b>Who it is for.</b> The FinZ operations team, who answer questions about individual loans daily, and the compliance officer, who has to approve every release for a Designated Person before it happens.</p>' +
        '<p><b>The reframe.</b> The obvious brief was a better calculator. The real problem was five teams holding five versions of the truth with no way to prove which was right.</p>' +
        '<p>The gate I am most glad I moved was the compliance one. Designated Persons under insider trading rules may only have shares released with explicit approval, and the original gate matched on Loan ID. A Designated Person is a person, not a loan, so their other loans passed through as though unregulated. I re-gated on identity, matching by BO ID and Employee Code, and added two fail safes: if the compliance list cannot be read, block every release rather than silently letting them through, and if a loan carries no identifier to check, hold it.</p>' +
        ESOP_CARD,
      chips: ['ai', 'limits', 'efos']
    },

    efos: {
      keys: ['financing os', 'process os', 'case 02', 'case two', 'second case', 'invoice',
             'lender', 'lenders', 'month end', 'audit trail', 'in build'],
      html:
        '<p>In build, not yet launched. Every month around 2,886 PhysicsWallah employees repay a loan out of their salary, and before any of that money moves somebody builds the deduction summary by hand, waits for payroll to confirm what was actually deducted, works out what each of the two lenders is owed, raises the invoices, chases the approvals, records the payment and maps it back to individual loans. All of it lives in spreadsheets and email threads.</p>' +
        '<p>Three things went wrong repeatedly, and none of them announced themselves. A mis-keyed figure becomes a wrong invoice, and nothing in the process is capable of noticing. There is no audit trail, so an error surfacing in month N+2 cannot be traced back to who changed what in month N. And loan IDs collide across the two lenders, so the same number means two different loans depending on who you ask.</p>' +
        '<p>Three decisions do most of the work in what I specified. Every key is a pair, always (lender, loan_id) and never a bare loan ID, which removes a whole class of error by construction rather than by care, and care is exactly what runs out at the end of a long month. Uploads are staged rather than applied, checked against the previous batch, versioned and rollable back, so an unusually large change waits for a human to confirm it. And every change is written to an append only audit log, with the tables checksummed.</p>' +
        '<p>The monthly scheduler exists but is deliberately switched off, pending a go live decision.</p>' +
        EFOS_CARD,
      chips: ['limits', 'esop', 'principles']
    },

    ai: {
      keys: ['ai', 'artificial intelligence', 'claude', 'chatgpt', 'llm', 'no engineers',
             'without engineers', 'how did you build', 'how was it built', 'engineering layer',
             'engineer', 'engineers', 'a team', 'solo', 'by yourself', 'alone',
             'code', 'coding', 'technical'],
      html:
        '<p>I did not have an engineering team. I had a specification and a clear idea of what correct looked like, so I directed AI as the engineering layer and reviewed every step it took. That produced <b>108 production deployments over four months</b>, built alongside my regular work.</p>' +
        '<p>The part worth knowing is where the difficulty actually sat. Almost none of it was in the money maths, which is deterministic and easy. It was in reading the source data correctly.</p>' +
        '<ul>' +
        '<li>A column labelled Confiscation Value turned out to hold share quantities, not rupees.</li>' +
        '<li>Dates stored day first as text were being misread, which quietly made payments vanish from schedules.</li>' +
        '<li>133 of 333 confiscations sat against cancelled orders, invisible to anything that only loaded completed ones.</li>' +
        '</ul>' +
        '<p>None of those crash. They produce a confident wrong answer, which is far more dangerous in a system people trust with money. Directing AI is what made the building fast. Knowing what to check is what made it correct.</p>',
      chips: ['esop', 'limits', 'principles']
    },

    credit: {
      keys: ['credit policy', 'cibil', 'bureau', 'collection', 'collections', 'eligibility',
             'underwriting', 'risk', 'who qualifies', 'default', 'repayment'],
      html:
        '<p>A payroll deducted loan only looks safe. Employment tells you someone is paid. It does not tell you whether they are already over borrowed somewhere else.</p>' +
        '<p>That gap is what the credit policy closes. I drafted it against bureau data, so the decision to lend and the limit attached to it are made before the money leaves, rather than argued about after it does not come back.</p>' +
        '<p>It exists to move one number, the collection rate, by declining the wrong loans early rather than chasing them later.</p>',
      chips: ['numbers', 'principles', 'work']
    },

    numbers: {
      keys: ['numbers', 'metrics', 'impact', 'results', 'how much', 'how many', 'disbursal',
             'disbursed', 'loan book', 'scale', 'stats', 'figures', 'achievements'],
      html:
        figs([
          ['20+ months', 'Building the product'],
          ['&#8377;3 Cr+', 'Disbursed monthly'],
          ['&#8377;34 Cr', 'Active loan book'],
          ['4,500+', 'Employees served']
        ]) +
        '<p>From the two systems: around 300 ESOP loans that ran on eleven spreadsheets owned by five teams, 108 production deployments over four months, and a bank reconciliation that parses to &#8377;64,05,97,403 and matches the bank’s own summary. On the Financing OS, 2,886 employees repaying through payroll in a month, 220 automated tests and 86 commits over three and a half weeks.</p>' +
        '<p>Every figure here is one I can walk through in an interview. Where I do not have a number, I say so, and the case studies list those places explicitly.</p>',
      chips: ['limits', 'esop', 'efos']
    },

    principles: {
      keys: ['principle', 'principles', 'philosophy', 'how do you think', 'how you think',
             'approach', 'process', 'beliefs', 'opinions', 'design principles', 'values'],
      html:
        '<p>Five, and all of them come out of the same job.</p>' +
        '<ul>' +
        '<li><b>Irreversibility drives the design.</b> Releasing collateral and paying money out cannot be undone, so those paths get the strictest gates and fail safe defaults.</li>' +
        '<li><b>Evidence over declaration.</b> Prefer the cash arrived over someone ticked Closed.</li>' +
        '<li><b>Business exceptions belong to the business.</b> Encoded as data the operations team owns, not as rules buried in code they cannot see.</li>' +
        '<li><b>Silence is the enemy.</b> Fail soft, but never fail quietly. A financial tool that degrades without saying so is worse than one that stops.</li>' +
        '<li><b>Signal over completeness.</b> A report nobody trusts because it flags &#8377;3 discrepancies is worse than no report at all. Choosing what not to show is a product decision.</li>' +
        '</ul>',
      chips: ['esop', 'why', 'about']
    },

    limits: {
      keys: ['limitation', 'limitations', 'what did not work', 'went wrong', 'failure', 'failed',
             'mistake', 'mistakes', 'weakness', 'weaknesses', 'honest', 'caveat', 'gaps'],
      html:
        '<p>Both case studies carry a section I did not have to write.</p>' +
        '<p><b>ESOP Loan Repository.</b> I never instrumented the manual baseline, so I can show what the system catches but not a clean time saved figure. Refresh is slow on the largest sheets. The tool mirrors upstream data it does not control, which is precisely why the reconciliation views exist. And one person built it, so it needs a documented handover.</p>' +
        '<p><b>Employee Financing Process OS.</b> Not yet in daily production use. The live updates work is only partly done, with polling still running in parallel on purpose. Imports are file based because no reliable LMS API was available to integrate against. Until it runs a real month end, the time it saves is an estimate rather than a measurement.</p>',
      chips: ['esop', 'efos', 'principles']
    },

    education: {
      keys: ['education', 'college', 'degree', 'university', 'class 10', 'class 12', 'marks',
             'academics', 'studied', 'study', 'studies', 'graduated', 'qualification', 'school'],
      html:
        '<p>BSc (Hons) Computer Science with a minor in Mathematics, Aryabhatta College, University of Delhi.</p>' +
        figs([['96%', 'Class 12'], ['97%', 'Class 10']]),
      chips: ['about', 'why', 'work']
    },

    why: {
      keys: ['why hire', 'why should', 'why you', 'what are you looking for', 'next role',
             'what do you want', 'strengths', 'good fit', 'sell yourself', 'pitch'],
      html:
        '<p>Three things, and you can check all of them on this site.</p>' +
        '<p><b>I own outcomes, not screens.</b> The credit policy I drafted exists to move one number, the collection rate, by declining the wrong loans early rather than chasing them later. That is a business decision expressed as a product.</p>' +
        '<p><b>I ship.</b> 108 production deployments over four months on the ESOP Repository, built solo and alongside my regular work. 220 automated tests and 86 commits over three and a half weeks on the Financing OS.</p>' +
        '<p><b>I am honest about what I do not know.</b> Both case studies list their limitations, including the ones that make the numbers less impressive. I would rather be trusted on the figures I do give.</p>' +
        '<p>What I want is a product role where the correctness bar is part of the job. Fintech, internal platforms, or anywhere the expensive mistakes are the quiet ones.</p>',
      chips: ['limits', 'numbers', 'contact']
    },

    contact: {
      keys: ['contact', 'email', 'reach', 'get in touch', 'linkedin', 'phone', 'call', 'talk',
             'connect', 'hire me', 'where are you', 'based', 'location', 'delhi', 'city'],
      html:
        '<p>Open to conversations about product roles in fintech, AI-native product work and internal platform teams. Based in Delhi NCR.</p>' +
        REACH,
      chips: ['why', 'work', 'unstated']
    },

    unstated: {
      keys: ['notice period', 'salary', 'compensation', 'ctc', 'expected', 'remote', 'relocate',
             'relocation', 'availability', 'when can you start', 'visa', 'references'],
      html:
        '<p>This site does not say, and I would rather not put a number here that I cannot stand behind in the same way as the others.</p>' +
        '<p>Notice period, compensation, location flexibility and start dates are all best asked directly, and I will answer them straight.</p>' +
        REACH,
      chips: ['contact', 'why']
    },

    resume: {
      keys: ['resume', 'cv', 'download', 'pdf', 'one pager'],
      html:
        '<p>There is no PDF on this site yet. The two case studies go a good deal further than a resume would, and LinkedIn carries the conventional version.</p>' +
        REACH,
      chips: ['work', 'why', 'contact']
    },

    recruiter: {
      keys: ['recruiter', '90 second', 'ninety second', 'summary', 'summarise', 'summarize',
             'quick version', 'tldr', 'overview', 'scan', 'brief', 'short version'],
      html:
        '<p>No fluff. Here is the scannable version.</p>' +
        '<div class="scan">' +
        '<h3>Veronica in 90 seconds</h3>' +
        '<ul>' +
        '<li>Aspiring Product Manager at FinZ, the fintech vertical at PhysicsWallah. Delhi NCR.</li>' +
        '<li>20+ months building an employee lending product from scratch: eligibility, pricing, repayment and collections.</li>' +
        '<li>&#8377;3 Cr+ disbursed monthly, &#8377;34 Cr active loan book, 4,500+ employees served.</li>' +
        '<li>Drafted the CIBIL based credit policy that decides who qualifies and at what limit.</li>' +
        '<li>Owns two products: ESOP Financing and Employee Financing.</li>' +
        '<li>ESOP Loan Repository, live: eleven spreadsheets across five teams replaced with one system of record. 108 production deployments in four months, built solo.</li>' +
        '<li>Employee Financing Process OS, in build: the monthly cycle for 2,886 employees and two lenders. 220 automated tests, 86 commits, three and a half weeks.</li>' +
        '<li>Directs AI as the engineering layer, and reviews every step of what it produces.</li>' +
        '<li>BSc (Hons) Computer Science, minor in Mathematics, University of Delhi. Class 12 96%, Class 10 97%.</li>' +
        '<li>Every case study lists its own limitations. No figure on this site is one that cannot survive a follow-up question.</li>' +
        '</ul>' +
        '</div>',
      chips: ['why', 'numbers', 'limits', 'contact']
    }
  };

  var LABEL = {
    about: 'About Veronica', best: 'Best project', work: 'The work',
    esop: 'ESOP Repository', efos: 'Financing OS', ai: 'How you use AI',
    credit: 'Credit policy', numbers: 'The numbers', principles: 'How you think',
    limits: 'What did not work', education: 'Education', why: 'Why hire you',
    contact: 'Get in touch', unstated: 'Notice period and pay', resume: 'Resume',
    recruiter: 'The 90 second version'
  };

  var ASKED = {
    about: 'Tell me about yourself', best: 'What is your best project?',
    work: 'Show me your work', esop: 'Tell me about the ESOP Loan Repository',
    efos: 'Tell me about the Employee Financing Process OS',
    ai: 'How did you build it without engineers?',
    credit: 'What does the credit policy do?', numbers: 'Show me the numbers',
    principles: 'How do you think about product?', limits: 'What did not work?',
    education: 'What did you study?', why: 'Why should we hire you?',
    contact: 'How do I get in touch?', unstated: 'What about notice period and pay?',
    resume: 'Can I see your resume?', recruiter: 'Give me the 90 second version'
  };

  /* ---- matching --------------------------------------------- */

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  var COMPILED = [];
  for (var id in A) {
    if (!Object.prototype.hasOwnProperty.call(A, id)) continue;
    var res = [];
    for (var k = 0; k < A[id].keys.length; k++) {
      var key = A[id].keys[k];
      res.push({ re: new RegExp('\\b' + esc(key) + '\\b', 'i'), weight: key.length });
    }
    COMPILED.push({ id: id, res: res });
  }

  function match(text) {
    var bestId = null, bestScore = 0;
    for (var i = 0; i < COMPILED.length; i++) {
      var score = 0;
      for (var j = 0; j < COMPILED[i].res.length; j++) {
        if (COMPILED[i].res[j].re.test(text)) score += COMPILED[i].res[j].weight;
      }
      if (score > bestScore) { bestScore = score; bestId = COMPILED[i].id; }
    }
    return bestScore > 0 ? bestId : null;
  }

  /* ---- rendering -------------------------------------------- */

  var thread = document.getElementById('thread');
  var scroll = document.getElementById('scroll');
  var form = document.getElementById('composer');
  var input = document.getElementById('q');

  function toBottom() { scroll.scrollTop = scroll.scrollHeight; }

  /* Put the question the visitor just asked at the top of the view, so a long
     answer is read from its first line rather than from its last. */
  function anchor(el) {
    if (!el) { toBottom(); return; }
    scroll.scrollTop += el.getBoundingClientRect().top -
                        scroll.getBoundingClientRect().top - 12;
  }

  function chipRow(ids) {
    if (!ids || !ids.length) return '';
    var out = '<div class="asks">';
    for (var i = 0; i < ids.length; i++) {
      if (!LABEL[ids[i]]) continue;
      out += '<button class="askchip" type="button" data-ask="' + ids[i] + '">' + LABEL[ids[i]] + '</button>';
    }
    return out + '</div>';
  }

  function youSaid(text) {
    var wrap = document.createElement('div');
    wrap.className = 'msg msg-you';
    var b = document.createElement('div');
    b.className = 'bubble-you';
    b.textContent = text;
    wrap.appendChild(b);
    thread.appendChild(wrap);
    toBottom();
    return wrap;
  }

  function shell() {
    var wrap = document.createElement('div');
    wrap.className = 'msg';
    wrap.innerHTML =
      '<img class="face" src="img/avatar.jpg" alt="" width="320" height="320">' +
      '<div class="said"><p class="who">Veronica</p>' +
      '<div class="body"><span class="dots" role="status"><span class="sr">Thinking</span>' +
      '<i></i><i></i><i></i></span></div></div>';
    thread.appendChild(wrap);
    toBottom();
    return wrap.querySelector('.body');
  }

  var FALLBACK =
    '<p>That is not something I have a written answer for, and this page does not guess. It only says what is already documented on the site.</p>' +
    '<p>Try one of these, or ask me directly and I will answer properly.</p>' +
    REACH;

  function answer(id, from) {
    var body = shell();
    var html = A[id] ? A[id].html + chipRow(A[id].chips)
                     : FALLBACK + chipRow(['best', 'work', 'numbers', 'why', 'contact']);
    var paint = function () { body.innerHTML = html; anchor(from); };
    if (reduce) paint(); else window.setTimeout(paint, 420);
  }

  function ask(id, spoken) {
    if (id === 'reset') { reset(); return; }
    answer(id, youSaid(spoken || ASKED[id] || LABEL[id] || id));
  }

  function send(text) {
    text = text.replace(/\s+/g, ' ').trim();
    if (!text) return;
    answer(match(text.toLowerCase()), youSaid(text));
  }

  /* ---- wiring ------------------------------------------------ */

  var greeting = thread.firstElementChild;

  function reset() {
    while (thread.lastElementChild && thread.lastElementChild !== greeting) {
      thread.removeChild(thread.lastElementChild);
    }
    scroll.scrollTop = 0;
    input.focus();
  }

  thread.setAttribute('aria-live', 'polite');
  thread.setAttribute('aria-label', 'Conversation');

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-ask]') : null;
    if (!btn || btn.tagName === 'A') return;
    e.preventDefault();
    ask(btn.getAttribute('data-ask'));
    closeDrawer();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    send(v);
  });

  /* recruiter mode */
  var rec = document.getElementById('rec');
  var tryList = document.getElementById('try-list');

  var TRY_NORMAL = ['best', 'ai', 'credit', 'numbers', 'limits'];
  var TRY_REC = ['recruiter', 'why', 'numbers', 'unstated', 'contact'];

  function fillTry(ids) {
    var out = '';
    for (var i = 0; i < ids.length; i++) {
      out += '<li><button class="try" type="button" data-ask="' + ids[i] + '">' +
             (ASKED[ids[i]] || LABEL[ids[i]]) + '</button></li>';
    }
    tryList.innerHTML = out;
  }

  rec.addEventListener('change', function () {
    if (rec.checked) {
      fillTry(TRY_REC);
      ask('recruiter', 'Recruiter mode');
    } else {
      fillTry(TRY_NORMAL);
    }
  });

  /* mobile drawer */
  var side = document.getElementById('side');
  var toggle = document.getElementById('drawer-toggle');
  var backdrop = document.getElementById('backdrop');

  function closeDrawer() {
    side.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
  }
  function openDrawer() {
    side.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
  }
  toggle.addEventListener('click', function () {
    if (side.classList.contains('open')) closeDrawer(); else openDrawer();
  });
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });
})();
