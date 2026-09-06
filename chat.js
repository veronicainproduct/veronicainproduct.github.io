/* ============================================================
   Veronica Singh | conversational portfolio

   Retrieval, not generation. Every answer below is written by
   hand from what is already on this site or on the resume it
   links to. There is no model behind this page and no API key
   in it, so nothing here can invent a figure.

   What makes it feel like an assistant is the matcher, not a
   model: queries are tokenised, stopped, weighted by inverse
   document frequency and matched with prefix and edit-distance
   tolerance, so "are you open for remot" finds the same answer
   as "do you work remotely". When nothing scores well enough it
   says so and offers the nearest three topics rather than
   guessing.

   No browser storage APIs are used anywhere.
   ============================================================ */
(function () {
  'use strict';

  var EMAIL = 'veronica.singh2525@gmail.com';
  var TEL = '+919555914534';
  var TELSHOW = '+91 95559 14534';
  var LI = 'https://www.linkedin.com/in/veronicasingh250803';
  var WA = 'https://wa.me/919555914534';
  var CV = 'assets/Veronica-Singh-Resume.pdf';

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

  function bolt() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
           '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>';
  }

  function pull(t) { return '<p class="pull">' + t + '</p>'; }

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg>';

  function proj(o) {
    var body = '<div class="proj-body">';
    if (o.badge) body += '<span class="badge">' + o.badge + '</span>';
    body += '<p class="kicker">' + o.kicker + '</p>' +
            '<h2>' + o.name + '</h2><p class="proj-sub">' + o.sub + '</p>';
    if (o.figs) body += figs(o.figs);
    body += '<a class="go" href="' + o.href + '">Read the case study ' + ARROW + '</a></div>';
    var art = o.shot
      ? '<div class="proj-art"><img src="' + o.shot + '" alt="' + o.alt +
        '" width="' + o.w + '" height="' + o.h + '" loading="lazy"></div>'
      : '<div class="proj-note">' + o.note + '</div>';
    return '<div class="proj">' + body + art + '</div>';
  }

  var MAIL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2.5 7 9.5 6 9.5-6"/></svg>';
  var IN_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.55-3.7 8.25-8.25 8.25a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.24-8.24Zm-2.9 4.06c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.03 3.1 4.93 4.23 2.41.95 2.9.76 3.43.71.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.27-.2-.56-.34-.29-.15-1.68-.83-1.94-.93-.26-.09-.45-.14-.64.15-.19.29-.73.93-.9 1.12-.16.2-.33.22-.61.08-.29-.15-1.21-.45-2.31-1.42-.85-.76-1.43-1.7-1.6-1.98-.16-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.49.1-.19.05-.37-.02-.51-.07-.15-.63-1.54-.88-2.1-.21-.5-.43-.5-.61-.51h-.53Z"/></svg>';
  var DL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>';

  var REACH =
    '<div class="reach">' +
    '<a class="primary" href="mailto:' + EMAIL + '">' + MAIL_SVG + 'Email Veronica</a>' +
    '<a href="' + LI + '" rel="me noopener" target="_blank">' + IN_SVG + 'LinkedIn</a>' +
    '<a href="' + WA + '" rel="noopener" target="_blank">' + WA_SVG + 'WhatsApp</a>' +
    '<a href="' + CV + '" download>' + DL_SVG + 'Resume</a>' +
    '</div>';

  var VCARD =
    '<div class="vcard"><h2>Veronica Singh</h2>' +
    '<p>Product Strategy, Employee Financing at FinZ. Delhi NCR.</p>' + REACH + '</div>';

  var ESOP_CARD = proj({
    shot: 'img/esop-repository.png', w: 1280, h: 557,
    alt: 'The ESOP Loan Repository, showing 304 loans, 239 closed and 65 active',
    kicker: 'System of record &middot; AI-directed build',
    name: 'ESOP Loan Repository',
    sub: 'Live in production. Eleven spreadsheets, replaced with one system of record.',
    figs: [['300', 'Loans'], ['11', 'Spreadsheets'], ['108', 'Deployments']],
    href: 'project-esop-repository.html'
  });

  var EFOS_CARD = proj({
    badge: 'In build',
    kicker: 'Process design &middot; Audit trail',
    name: 'Employee Financing Process OS',
    sub: 'The monthly deduction, invoicing and payment cycle for two lenders.',
    figs: [['2,886', 'Employees'], ['220', 'Tests'], ['2', 'Lenders']],
    note: 'No screenshot here on purpose. It is built and validated against real ' +
          'production data, but it has not run a live month end, so anything I showed ' +
          'you would be an empty state dressed up as a product.',
    href: 'project-financing-os.html'
  });

  /* ============================================================
     THE CORPUS
     terms: free text the matcher indexes. Write the ways people
     actually ask, not a tidy keyword list.
     boost: exact phrases that should decide the topic outright.
     ============================================================ */

  var A = {

    whois: {
      q: 'Who is Veronica?',
      label: 'Who is Veronica',
      terms: 'who is veronica singh who are you introduce yourself tell me about yourself ' +
             'your background summary profile bio about you overview elevator pitch',
      boost: ['who is veronica', 'who are you'],
      html:
        '<p>I run product strategy for employee lending at FinZ, the fintech arm of PhysicsWallah. I own two products, ESOP Financing and Employee Financing, and more to the point I own the parts nobody puts on a slide: who qualifies, what it costs, how it gets repaid, and what happens the month payroll takes less than it was asked to.</p>' +
        '<p>I wrote the CIBIL based credit policy underneath it, then built two internal systems to keep the book honest. One is live. One is in build. I pointed AI at the code for both and then read all of it, which is the step most people skip.</p>' +
        '<p>Computer science at the University of Delhi. Based in Delhi NCR. Open to remote.</p>',
      chips: ['work', 'why', 'timeline', 'contact']
    },

    about: {
      q: 'Tell me about yourself',
      label: 'About Veronica',
      terms: 'about veronica about me your story how did you get into product background ' +
             'journey path career story what do you do',
      boost: ['about me', 'about veronica', 'your story'],
      html:
        '<p>I did not get here through a product title. I got here by being handed a lending book and discovering that nobody had written down who was allowed to borrow from it.</p>' +
        '<p>Twenty odd months later there are eligibility rules, pricing, a repayment schedule that fits a payroll cycle, and a process for the awkward month when a deduction comes back short. I designed all four, then built the systems that stop anyone quietly editing them afterwards.</p>' +
        '<p>Today that is two products. <b>ESOP Financing</b> lends against pledged ESOP shares so employees can pay the exercise tax before the shares turn into anything spendable. <b>Employee Financing</b> is salary advance and top-up loans, recovered from monthly pay.</p>' +
        '<p>What I want next is a product role where being right counts for more than being quick. Fintech, internal platforms, or anywhere the expensive mistakes are the quiet ones.</p>',
      chips: ['principles', 'work', 'timeline', 'contact']
    },

    dayjob: {
      q: 'What do you actually do day to day?',
      label: 'Day to day',
      terms: 'day to day daily what do you actually do responsibilities role scope ' +
             'own ownership what are you responsible for typical day job description',
      boost: ['day to day', 'what do you actually do', 'actually do'],
      html:
        '<p>Three things, and they keep handing work to each other.</p>' +
        '<p><b>The book.</b> Who can borrow, how much, at what price, on what schedule, and what happens when the deduction comes back short. I wrote those rules and I rewrite them when the collection rate tells me to.</p>' +
        '<p><b>The product.</b> The journey an employee actually walks, reworked against their feedback rather than against a roadmap. When footfall sagged I added coupons and waived the processing fee, which sounds like small change until you watch what it did to the number.</p>' +
        '<p><b>The systems underneath.</b> A lending product that cannot prove what it did is a liability with good typography.</p>',
      chips: ['credit', 'work', 'numbers']
    },

    best: {
      q: 'What is your best project?',
      label: 'Best project',
      terms: 'best project best work proudest strongest best case study ' +
             'which is your best highlight',
      boost: ['best project', 'best work', 'most proud', 'proudest', 'favourite project', 'favorite project'],
      html:
        '<p>The ESOP Loan Repository. Not the prettiest thing I have built, but the only one that changed a decision rather than a screen.</p>' +
        '<p>Around 300 loans, one lifecycle, eleven spreadsheets, five teams, and no agreement about which file was right. The brief everyone expected was a better calculator. The maths was never the problem. Five versions of the truth was the problem.</p>' +
        '<p>My favourite fix is the one nobody notices. Releasing pledged shares cannot be undone, and the old process released them whenever a spreadsheet cell said Closed. A cell any human could type into was authorising an irreversible transfer of collateral. I keyed the release queue on evidence that the cash had actually landed instead, and I accepted the cost: a loan repaid through some unrecorded channel now waits until the payment is logged.</p>' +
        pull('Failing to release on time is a support ticket. Releasing collateral wrongly is not.') +
        ESOP_CARD,
      chips: ['esop', 'efos', 'ai', 'limits']
    },

    work: {
      q: 'Show me everything you have built',
      label: 'The work',
      terms: 'your work the work projects case studies portfolio what have you built ' +
             'what did you build show me everything all projects things you made shipped',
      boost: ['your work', 'case studies', 'all projects', 'everything you have built'],
      html:
        '<p>Two case studies, one habit: take a process living in eleven spreadsheets and turn it into a single system of record. Both were built for a book that moves real money, which is a brisk way to find out whether your product works. One is live. One is in build.</p>' +
        ESOP_CARD + EFOS_CARD,
      chips: ['esop', 'efos', 'best']
    },

    esop: {
      q: 'Tell me about the ESOP Loan Repository',
      label: 'ESOP Repository',
      terms: 'esop loan repository case 01 first case pledged shares unpledge collateral ' +
             'compliance designated person insider trading release reconciliation interest accrual',
      boost: ['esop loan repository', 'case 01', 'designated person'],
      html:
        '<p><b>The problem.</b> PhysicsWallah grants ESOP. Exercising it triggers a tax bill straight away, long before the shares are worth anything you can spend, which is a rude surprise for the person holding them. FinZ lends against the pledged shares to cover it. Around 300 loans, and the whole lifecycle lived in eleven spreadsheets owned by five different teams.</p>' +
        '<p><b>Who it is for.</b> The operations team, who field questions about individual loans all day, and the compliance officer, who has to approve every release for a Designated Person before it happens.</p>' +
        '<p><b>The reframe.</b> Everyone expected a better calculator. The real problem was five teams holding five versions of the truth and no way to settle which one was right.</p>' +
        pull('A Designated Person is a person, not a loan.') +
        '<p>That sentence is the whole compliance fix. Designated Persons may only have shares released with explicit approval, and the original gate matched on Loan ID, so their other loans sailed through as though unregulated. I re-gated on identity, matching by BO ID and Employee Code, and added two fail safes: if the compliance list cannot be read, block every release rather than quietly waving them past, and if a loan carries no identifier to check, hold it.</p>' +
        ESOP_CARD,
      chips: ['ai', 'limits', 'efos']
    },

    efos: {
      q: 'Tell me about the Employee Financing Process OS',
      label: 'Financing OS',
      terms: 'employee financing os process os case 02 second case invoice invoicing lender ' +
             'lenders month end audit trail in build upload staging rollback prest',
      boost: ['financing os', 'process os', 'case 02', 'audit trail'],
      html:
        '<p>In build, not launched. Every month around 2,886 PhysicsWallah employees repay a loan out of their salary, and before a rupee moves somebody builds the deduction summary by hand, waits for payroll to confirm what was actually taken, works out what each of the two lenders is owed, raises the invoices, chases the approvals, records the payment, and maps it back to individual loans. All of it in spreadsheets and email threads.</p>' +
        '<p>Three things went wrong on repeat, and none of them had the decency to announce themselves. A mis-keyed figure becomes a wrong invoice, and nothing in the process can notice. There is no audit trail, so an error that surfaces in month N+2 comes down to who can remember month N. And loan IDs collide across the two lenders, so the same number means two different loans depending on who you ask.</p>' +
        pull('It removes a whole class of error by construction rather than by care, and care is exactly what runs out at the end of a long month.') +
        '<p>Three decisions carry most of the weight in what I specified. Every key is a pair, always (lender, loan_id), never a bare loan ID. Uploads are staged rather than applied, checked against the previous batch, versioned and rollable back, so an unusually large change has to wait for a human to look at it. And every change lands in an append only audit log, with the tables checksummed.</p>' +
        '<p>The monthly scheduler exists and is switched off on purpose, pending a go live decision.</p>' +
        EFOS_CARD,
      chips: ['limits', 'esop', 'principles']
    },

    ai: {
      q: 'How did you build it without engineers?',
      label: 'AI experience',
      terms: 'ai artificial intelligence claude chatgpt llm prompt engineering no engineers ' +
             'without engineers how did you build engineering layer code coding technical ' +
             'vibe coding ai tools ai native how do you use ai solo alone a team',
      boost: ['without engineers', 'use ai', 'ai experience', 'engineering layer'],
      html:
        '<p>There was no engineering team. There was a specification, a clear idea of what correct looked like, and AI doing the typing. That produced <b>108 production deployments in four months</b>, alongside the day job.</p>' +
        '<p>The interesting part is where the difficulty actually sat. Almost none of it was the money maths, which is deterministic and frankly dull. It was reading the source data without being lied to by it.</p>' +
        '<ul>' +
        '<li>A column called Confiscation Value held share quantities, not rupees.</li>' +
        '<li>Dates stored day first as text were being misread, quietly deleting payments from schedules.</li>' +
        '<li>133 of 333 confiscations sat against cancelled orders, invisible to anything that only loaded completed ones.</li>' +
        '</ul>' +
        '<p>None of those crash. That is the whole problem. They produce a confident wrong answer, which is the expensive kind, and the only kind that survives a demo.</p>' +
        pull('Directing AI is what made the building fast. Knowing what to check is what made it correct.'),
      chips: ['esop', 'limits', 'skills']
    },

    credit: {
      q: 'What does the credit policy do?',
      label: 'Credit policy',
      terms: 'credit policy cibil bureau underwriting eligibility risk who qualifies ' +
             'approval limits pricing rules decisioning score decide decides ' +
             'who gets a loan approve reject declined',
      boost: ['credit policy', 'cibil'],
      html:
        '<p>A payroll deducted loan only looks safe.</p>' +
        pull('Employment tells you someone gets paid. It does not tell you who else is already collecting.') +
        '<p>Closing that gap is the entire job of the credit policy. I wrote it against bureau data, so the decision to lend and the size of the limit happen before the money leaves, rather than in a meeting three months later about why it did not come back. It also replaced manual review with rules, which is what made instant approval possible and cut the wait on a disbursal.</p>' +
        '<p>It exists to move exactly one number, the collection rate, by declining the wrong loans early instead of chasing them later.</p>',
      chips: ['collections', 'numbers', 'products']
    },

    collections: {
      q: 'How do collections work?',
      label: 'Collections',
      terms: 'collections collection rate defaults default rate delinquency npa recovery ' +
             'repayment payroll deduction salary deduction what if someone does not pay dpd',
      boost: ['collections', 'default rate', 'defaults'],
      html:
        '<p>Repayment is designed rather than chased. The money leaves through payroll before the borrower has to decide anything about it, which removes most of the drama. Together with the credit policy, that has held <b>defaults at 1.5 to 2%</b>.</p>' +
        '<p>The interesting part is the exception. A deduction does not always recover the full amount, and when it does not, someone has to decide what happens next. There was no process for that when I started. Designing one was most of the work, and it is why the second system exists at all: month end is where exceptions either get caught or quietly become February&rsquo;s problem.</p>',
      chips: ['credit', 'efos', 'numbers']
    },

    products: {
      q: 'What are the products exactly?',
      label: 'The products',
      terms: 'products what products salary advance top up topup loan products two products ' +
             'esop financing employee financing what do you sell offering lending products',
      boost: ['salary advance', 'two products', 'what products'],
      html:
        '<p>Two, both for PhysicsWallah employees.</p>' +
        '<p><b>Employee Financing.</b> Salary Advance and Salary Top-up. Short duration credit recovered from monthly pay through payroll deduction. I own eligibility, pricing, the repayment flow and the collections design end to end.</p>' +
        '<p><b>ESOP Financing.</b> Lending against pledged ESOP shares, so an employee can pay the exercise tax before the shares become anything they can actually spend. I own the operations end to end: onboarding, credit checks, the pledge, disbursement and closure, across credit, an NBFC and a depository, none of whom share a system with each other.</p>',
      chips: ['credit', 'esop', 'work']
    },

    research: {
      q: 'How do you do user research?',
      label: 'User research',
      terms: 'user research interviews surveys users customers talked to employees discovery ' +
             'feedback validation what users want acquisition funnel',
      boost: ['user research', 'interviews', 'surveys'],
      html:
        '<p>By talking to the people the deduction actually happens to. Interviews and surveys across <b>5,000+ employees</b>, and the work that came out of it contributed to a <b>12% lift in acquisition</b>.</p>' +
        '<p>The most useful finding was not a feature request. People dropped out at the point where the cost stopped being legible. So I added coupons, waived the processing fee, and rebuilt the flow around what was actually stopping people rather than around what everyone had assumed was stopping them.</p>',
      chips: ['dayjob', 'numbers', 'principles']
    },

    numbers: {
      q: 'Show me the numbers',
      label: 'The numbers',
      terms: 'numbers metrics impact results how much how many disbursal disbursed loan book ' +
             'scale stats figures achievements growth revenue size volume aum',
      boost: ['the numbers', 'metrics', 'loan book'],
      html:
        figs([
          ['&#8377;3 Cr+', 'Disbursed monthly'],
          ['&#8377;34 Cr', 'Active loan book'],
          ['4,500+', 'Employees served'],
          ['1.5 to 2%', 'Default rate']
        ]) +
        '<p>From the two systems: around 300 ESOP loans that ran on eleven spreadsheets owned by five teams, 108 production deployments over four months, and a bank reconciliation that parses to &#8377;64,05,97,403 and agrees with the bank&rsquo;s own summary. On the Financing OS, 2,886 employees repaying through payroll in a month, 220 automated tests and 86 commits over three and a half weeks.</p>' +
        '<p>Every figure here survives a follow-up question, which is a lower bar than it sounds and one a surprising number of portfolios fail. Where there is no number, the case studies say so out loud.</p>',
      chips: ['limits', 'esop', 'efos']
    },

    principles: {
      q: 'How do you think about product?',
      label: 'How I think',
      terms: 'principles philosophy how do you think approach process beliefs values ' +
             'design principles opinions product sense judgement how do you prioritise tradeoffs',
      boost: ['principles', 'philosophy', 'how do you think'],
      html:
        '<p>Five, all of them learned the expensive way.</p>' +
        '<ul>' +
        '<li><b>Irreversibility drives the design.</b> Releasing collateral and paying money out cannot be undone, so those paths get the strictest gates and fail safe defaults.</li>' +
        '<li><b>Evidence over declaration.</b> Prefer the cash arrived over someone ticked Closed.</li>' +
        '<li><b>Business exceptions belong to the business.</b> Encoded as data the operations team owns, not as rules buried in code they will never see.</li>' +
        '<li><b>Silence is the enemy.</b> Fail soft, but never fail quietly. A financial tool that degrades without mentioning it is worse than one that stops.</li>' +
        '<li><b>Signal over completeness.</b> A report nobody trusts because it flags &#8377;3 discrepancies is worse than no report at all. Choosing what not to show is a product decision.</li>' +
        '</ul>',
      chips: ['esop', 'why', 'about']
    },

    limits: {
      q: 'What did not work?',
      label: 'What did not work',
      terms: 'limitations what did not work went wrong failure failed mistake mistakes ' +
             'weakness weaknesses honest caveat gaps regrets what would you do differently ' +
             'criticism shortcomings',
      boost: ['did not work', 'limitations', 'went wrong', 'weakness', 'go wrong', 'do differently'],
      html:
        pull('Both case studies carry a section I did not have to write. It is the section worth reading first.') +
        '<p><b>ESOP Loan Repository.</b> I never instrumented the manual baseline, so I can show what the system catches but not a clean time saved figure. Refresh is slow on the largest sheets. The tool mirrors upstream data it does not control, which is precisely why the reconciliation views exist. And one person built it, so it needs a documented handover before that person takes a holiday.</p>' +
        '<p><b>Employee Financing Process OS.</b> Not in daily production use. The live updates work is only half done, with polling still running alongside it on purpose. Imports are file based because no reliable LMS API was available to integrate against. Until it survives a real month end, the time it saves is an estimate wearing the clothes of a measurement.</p>',
      chips: ['esop', 'efos', 'principles']
    },

    timeline: {
      q: 'Give me your experience timeline',
      label: 'Experience timeline',
      terms: 'timeline experience history career when did you start how long years ' +
             'previous jobs internship edumentor employment work history cv path progression',
      boost: ['timeline', 'experience', 'how long have you'],
      html:
        '<p><b>FinZ (PhysicsWallah), Noida. December 2024 to now.</b> Product strategy on Employee Financing. Launched the vertical from concept and scaled it to &#8377;3 Cr+ in monthly disbursal. Designed two loan products end to end, wrote the CIBIL based credit policy, and own ESOP Financing operations across credit, NBFC and depository stakeholders. Built the two systems on this site along the way, which was not in the job description.</p>' +
        '<p><b>Edumentor Educational Services. April to June 2023.</b> Zonal Manager intern. Scoped and delivered a one month student engagement programme, and ran a 20 to 25 member team executing daily operations for a multi-centre activation.</p>' +
        '<p><b>University of Delhi. 2021 to 2024.</b> BSc (Hons) Computer Science, minor in Mathematics.</p>',
      chips: ['education', 'work', 'resume']
    },

    skills: {
      q: 'What are your skills?',
      label: 'Skills and tools',
      terms: 'skills tools stack technical abilities sql python power bi excel figma ' +
             'what can you do capabilities competencies prd prds analytics data',
      boost: ['your skills', 'what tools', 'tech stack', 'her skills'],
      html:
        '<p><b>Product.</b> 0 to 1 launches, PRDs, pricing constructs, user research, funnel metrics.</p>' +
        '<p><b>Product operations.</b> Process automation, SOP design, reconciliation, exception handling, turnaround time reporting.</p>' +
        '<p><b>AI and data.</b> Claude API, LLM prompt engineering, evaluation design, SQL, Python, Power BI.</p>' +
        '<p><b>Domain.</b> Consumer lending, underwriting, collections, compliance workflows, payroll integrations.</p>' +
        '<p>The computer science degree is why the AI-directed build worked. I can read what it writes, which is the whole difference between directing a build and hoping about one.</p>',
      chips: ['ai', 'certs', 'education']
    },

    certs: {
      q: 'What certifications do you have?',
      label: 'Certifications',
      terms: 'certifications certificates courses coursera google hackerrank pwc credentials qualifications',
      boost: ['certifications', 'certificates'],
      html:
        '<p>Google Data Analytics (Coursera). Data Analysis and Presentation Skills, a five course specialisation (PwC). SQL (HackerRank).</p>' +
        '<p>None of them taught me as much as being responsible for a live loan book did, but they are real, they are on the resume, and I finished them.</p>',
      chips: ['skills', 'education', 'resume']
    },

    education: {
      q: 'What did you study?',
      label: 'Education',
      terms: 'education college degree university studied study studies graduate graduation ' +
             'class 10 class 12 marks school academics delhi aryabhatta computer science',
      boost: ['did you study', 'education', 'your degree', 'class 12', 'class 10'],
      html:
        '<p>BSc (Hons) Computer Science with a minor in Mathematics, Aryabhatta College, University of Delhi, 2021 to 2024. Coursework included machine learning, artificial intelligence, data structures and algorithms, SQL and DBMS, and Python data analysis.</p>' +
        figs([['96%', 'Class 12'], ['97%', 'Class 10']]) +
        '<p>Schooling at RLB Group of Schools, Lucknow.</p>',
      chips: ['skills', 'timeline', 'why']
    },

    why: {
      q: 'Why should we hire you?',
      label: 'Why hire you',
      terms: 'why should we hire you why you what are you looking for next role ' +
             'what do you want strengths good fit sell yourself pitch value add ' +
             'why are you a good candidate convince me',
      boost: ['should we hire', 'hire you', 'hire her', 'looking for', 'why you'],
      html:
        '<p>Three claims, all of them checkable on this site, which is more than most portfolios offer.</p>' +
        '<p><b>I own outcomes, not screens.</b> The credit policy exists to move the collection rate by declining the wrong loans early. Defaults sit at 1.5 to 2%. That is a business decision wearing a product costume.</p>' +
        '<p><b>I ship.</b> 108 production deployments in four months on the ESOP Repository, solo, alongside the day job. 220 automated tests and 86 commits in three and a half weeks on the Financing OS.</p>' +
        '<p><b>I tell you what went wrong.</b> Both case studies list their own limitations, including the ones that make the numbers less flattering. A portfolio containing nothing but triumphs is asking you to take the lot on trust.</p>' +
        '<p>What I want is a product role where the correctness bar is part of the job. AI-enabled products, fintech, internal platforms, or anywhere the expensive mistakes are the quiet ones.</p>',
      chips: ['limits', 'numbers', 'contact']
    },

    switch: {
      q: 'Why product and not engineering?',
      label: 'Why product',
      terms: 'why product not engineering switch move career change why did you choose ' +
             'computer science developer coder why not software',
      boost: ['why product', 'not engineering', 'not be an engineer', 'switch from'],
      html:
        '<p>I read computer science, so engineering was the obvious road. I did not take it because the decisions I found interesting were not in the code.</p>' +
        '<p>Whether to lend someone money, how much, and what to do when the repayment falls short is not an engineering question. It is a product question with a balance sheet attached. The degree still earns its keep every week: it is why I can point AI at a system and then catch the three data bugs that would otherwise have shipped a confident wrong answer to people counting on it.</p>',
      chips: ['ai', 'about', 'why']
    },

    stakeholders: {
      q: 'Who do you work with?',
      label: 'Stakeholders',
      terms: 'stakeholders teams who do you work with collaborate cross functional ' +
             'engineering design operations compliance nbfc depository payroll lenders partners',
      boost: ['stakeholders', 'who do you work with'],
      html:
        '<p>More external than most product roles. ESOP Financing runs across credit, an NBFC and a depository, and none of them share a system with FinZ or with each other, which is exactly why the reconciliation views in the first case study exist.</p>' +
        '<p>Internally: the operations team, who field questions about individual loans all day and are the real users of both systems. Payroll, who confirm what was actually deducted, which is never quite what was requested. And a compliance officer who has to approve every share release for a Designated Person before it happens.</p>',
      chips: ['esop', 'efos', 'dayjob']
    },

    logistics: {
      q: 'Are you open to remote roles?',
      label: 'Remote, notice and pay',
      terms: 'remote remotely work from home wfh hybrid onsite relocate relocation ' +
             'notice period joining start date availability salary compensation ctc pay ' +
             'expected package expectation expectations negotiable when can you join ' +
             'how much do you want budget band offer',
      boost: ['open to remote', 'notice period', 'expected salary', 'salary expectation', 'compensation', 'work from home'],
      html:
        '<p><b>Remote.</b> Yes. I have spent twenty odd months building a lending product whose users sit in a different city, so proximity was never the thing holding it together.</p>' +
        '<p><b>Notice period.</b> 20 to 30 days.</p>' +
        '<p><b>Pay.</b> Worth a call. It is the one number on this site I would rather not publish, and unlike the others it is negotiable.</p>' +
        REACH,
      chips: ['contact', 'why', 'work']
    },

    location: {
      q: 'Where are you based?',
      label: 'Location',
      terms: 'where are you based location city live delhi ncr noida india timezone',
      boost: ['where are you based', 'which city', 'where is she'],
      html:
        '<p>Delhi NCR, with the FinZ office in Noida. Open to remote, and well practised at it.</p>',
      chips: ['logistics', 'contact']
    },

    contact: {
      q: 'How do I get in touch?',
      label: 'Get in touch',
      terms: 'contact email reach get in touch linkedin phone whatsapp call talk connect ' +
             'hire me message speak dm how do i contact you',
      boost: ['get in touch', 'contact you', 'reach you', 'contact her'],
      html:
        '<p>I would like that. I am open to conversations about AI-enabled product roles, fintech and internal platform teams. Email gets read. WhatsApp gets read faster.</p>' + VCARD,
      chips: ['why', 'work', 'logistics']
    },

    resume: {
      q: 'Can I see your resume?',
      label: 'Resume',
      terms: 'resume cv download pdf one pager curriculum vitae send me your resume',
      boost: ['your resume', 'your cv', 'download resume', 'her resume'],
      html:
        '<p>Here it is. One page: FinZ, the lending vertical, the two systems, and the skills behind them. The case studies go considerably further, mainly because they are not fighting for space on a single sheet.</p>' +
        '<div class="vcard"><h2>Veronica Singh, resume</h2>' +
        '<p>PDF, one page. Product Strategy, Employee Financing at FinZ.</p>' +
        '<div class="reach"><a class="primary" href="' + CV + '" download>' + DL_SVG + 'Download resume (PDF)</a>' +
        '<a href="' + LI + '" rel="me noopener" target="_blank">' + IN_SVG + 'LinkedIn</a></div></div>',
      chips: ['timeline', 'why', 'contact']
    },

    recruiter: {
      q: 'Give me the 90 second version',
      label: 'The 90 second version',
      terms: 'recruiter mode 90 second ninety second summary summarise summarize quick version ' +
             'tldr tl dr overview scan brief short version give me the gist fast',
      boost: ['recruiter mode', '90 second', 'tldr', 'summary', 'the gist'],
      html:
        '<p>No fluff. The scan-friendly version.</p>' +
        '<div class="scan">' +
        '<h2>' + bolt() + 'Veronica in 90 seconds</h2>' +
        '<ul>' +
        '<li>Product Strategy, Employee Financing at FinZ, the fintech vertical at PhysicsWallah. Delhi NCR, open to remote.</li>' +
        '<li>20+ months building an employee lending product from scratch: eligibility, pricing, repayment and collections.</li>' +
        '<li>&#8377;3 Cr+ disbursed monthly, &#8377;34 Cr active loan book, 4,500+ employees served, defaults held at 1.5 to 2%.</li>' +
        '<li>Wrote the CIBIL based credit policy that decides who qualifies and at what limit, replacing manual review with rules.</li>' +
        '<li>Owns two products: ESOP Financing and Employee Financing.</li>' +
        '<li>ESOP Loan Repository, live: eleven spreadsheets across five teams replaced with one system of record. 108 production deployments in four months, built solo.</li>' +
        '<li>Employee Financing Process OS, in build: the monthly cycle for 2,886 employees and two lenders. 220 automated tests, 86 commits, three and a half weeks.</li>' +
        '<li>Directs AI as the engineering layer, and reads every line of it.</li>' +
        '<li>BSc (Hons) Computer Science, minor in Mathematics, University of Delhi. Class 12 96%, Class 10 97%.</li>' +
        '<li>Every case study lists its own limitations. No figure on this site falls apart under a follow-up question.</li>' +
        '</ul>' +
        '</div>',
      chips: ['why', 'numbers', 'limits', 'contact']
    },

    hello: {
      q: 'Hello',
      label: 'Say hello',
      terms: 'hi hello hey good morning good evening namaste thanks thank you cheers ' +
             'nice to meet you sup yo greetings',
      boost: ['hello', 'thank you'],
      html:
        '<p>Hello. Ask me about the lending product I own, the two systems I built for it, the numbers behind them, or the parts that did not work.</p>' +
        '<p>If you are recruiting and short on time, the 90 second version is the quickest way in.</p>',
      chips: ['recruiter', 'best', 'numbers', 'contact']
    },

    capabilities: {
      q: 'What can I ask you?',
      label: 'What can I ask?',
      terms: 'what can i ask help topics options how does this work are you an ai ' +
             'are you a bot are you a real person is this real human chatgpt',
      boost: ['can i ask', 'are you an ai', 'are you a bot', 'real person', 'how does this work'],
      html:
        '<p>The lending book and how it is priced and collected. The two systems I built. The numbers, and where the numbers run out. How I use AI to build things. My background, and the practical questions: remote, notice period, pay.</p>' +
        '<p>Ask in your own words. If it is outside my range I will say so rather than improvise, which is a low bar that a surprising amount of writing about product fails to clear.</p>',
      chips: ['recruiter', 'work', 'numbers', 'contact']
    }
  };

  /* ============================================================
     RETRIEVAL
     ============================================================ */

  var STOP = ('a an the and or but if is are was were be been being do does did doing ' +
    'to of in on at for with about into over after by from up down out so than then ' +
    'that this these those it its i me my you your yours we us our he she they them ' +
    'his her their have has had can could would should will shall may might must ' +
    'what which who whom whose when where why how any some all more most other such ' +
    'no nor not only own same too very just also as tell show give me please').split(' ');
  var STOPSET = {};
  for (var si = 0; si < STOP.length; si++) STOPSET[STOP[si]] = 1;

  function norm(s) {
    return String(s).toLowerCase()
      .replace(/[‘’]/g, "'")
      .replace(/[^a-z0-9%+.\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function tokenise(s, keepStop) {
    var raw = norm(s).split(' '), out = [];
    for (var i = 0; i < raw.length; i++) {
      var t = raw[i].replace(/\.$/, '');
      if (!t) continue;
      if (!keepStop && STOPSET[t]) continue;
      out.push(t);
    }
    return out;
  }

  /* true when a and b differ by at most one edit, counting a swap of two
     neighbouring letters as one: "recuriter" is one slip, not two. */
  function near(a, b) {
    if (a.length === b.length) {
      var d = [];
      for (var x = 0; x < a.length; x++) if (a.charAt(x) !== b.charAt(x)) d.push(x);
      if (d.length === 2 && d[1] === d[0] + 1 &&
          a.charAt(d[0]) === b.charAt(d[1]) && a.charAt(d[1]) === b.charAt(d[0])) return true;
    }
    return near1(a, b);
  }

  function near1(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, edits = 0;
    while (i < la && j < lb) {
      if (a.charAt(i) === b.charAt(j)) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
    }
    if (i < la || j < lb) edits++;
    return edits <= 1;
  }

  var IDS = [], DF = {}, INDEX = {};
  for (var id in A) {
    if (!Object.prototype.hasOwnProperty.call(A, id)) continue;
    IDS.push(id);
    var toks = tokenise(A[id].terms + ' ' + A[id].q + ' ' + A[id].label);
    var seen = {};
    for (var k = 0; k < toks.length; k++) seen[toks[k]] = 1;
    INDEX[id] = seen;
    for (var t in seen) DF[t] = (DF[t] || 0) + 1;
  }
  var N = IDS.length;
  function idf(t) {
    var df = DF[t];
    if (!df) return 0;
    return Math.log(1 + N / df);
  }

  function rank(query) {
    var qn = norm(query);
    var qt = tokenise(query);
    if (!qt.length) qt = tokenise(query, true);
    var scored = [];
    for (var i = 0; i < IDS.length; i++) {
      var id = IDS[i], set = INDEX[id], s = 0;
      for (var j = 0; j < qt.length; j++) {
        var q = qt[j], best = 0;
        for (var tt in set) {
          var v = 0;
          if (tt === q) v = 1;
          else if (q.length >= 4 && tt.length >= 4 &&
                   (tt.indexOf(q) === 0 || q.indexOf(tt) === 0)) v = 0.82;
          else if (q.length >= 5 && tt.length >= 5 && near(q, tt)) v = 0.62;
          /* The weight is the matched term's rarity, not the typed token's.
             A typo is by definition absent from the index, so weighting by
             the query token scored every misspelling at zero. */
          if (v) { var sc = v * idf(tt); if (sc > best) best = sc; }
        }
        s += best;
      }
      var boosts = A[id].boost || [];
      for (var b = 0; b < boosts.length; b++) {
        if (qn.indexOf(boosts[b]) !== -1) s += 3.2;
      }
      scored.push([id, s]);
    }
    scored.sort(function (x, y) { return y[1] - x[1]; });
    return scored;
  }

  function match(query) {
    var r = rank(query);
    return (r[0] && r[0][1] >= 1.15) ? r[0][0] : null;
  }

  /* ---- rendering -------------------------------------------- */

  var thread = document.getElementById('thread');
  var scroll = document.getElementById('scroll');
  var form = document.getElementById('composer');
  var input = document.getElementById('q');

  function toBottom() { scroll.scrollTop = scroll.scrollHeight; }

  function anchor(el) {
    if (!el) { toBottom(); return; }
    scroll.scrollTop += el.getBoundingClientRect().top -
                        scroll.getBoundingClientRect().top - 12;
  }

  /* Blocks inside a long answer arrive as you reach them. Scoped to the
     conversation's scroller, not the page, because the page never scrolls. */
  var io = ('IntersectionObserver' in window && !reduce)
    ? new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('is-in');
            io.unobserve(entries[i].target);
          }
        }
      }, { root: scroll, rootMargin: '0px 0px -6% 0px', threshold: 0.05 })
    : null;

  if (io) document.documentElement.className += ' js';

  if (io) {
  /* Fail-safe. .rise starts at opacity 0, so if the observer never fires
     the page would be blank. Body is always intersecting, so this probe
     must run; if it does not, drop .js and everything shows unanimated. */
  var alive = false;
  var probe = new IntersectionObserver(function () { alive = true; probe.disconnect(); });
  probe.observe(document.body);
  window.setTimeout(function () {
    if (!alive) {
      document.documentElement.className =
        document.documentElement.className.replace(' js', '');
    }
  }, 2500);
  }

  var RISE = '.proj, .scan, .vcard, .pull, .numset > .num, .reach, .asks';
  var STEP = 16;      /* ms between words */
  var STEP_CAP = 90;  /* after this many, the rest land together */

  /* Wrap every word in its own span so the answer arrives left to right.
     Only text nodes are touched, so links and bold inside a sentence
     survive intact. Cards are left whole; a case study fading in word by
     word would be silly. */
  function stream(root) {
    if (reduce) return 0;
    var blocks = root.querySelectorAll('p, li');
    var i = 0;
    for (var b = 0; b < blocks.length; b++) {
      var el = blocks[b];
      if (el.closest && el.closest('.proj, .scan, .vcard')) continue;
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      var nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      for (var k = 0; k < nodes.length; k++) {
        var node = nodes[k];
        var parts = node.nodeValue.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        for (var q = 0; q < parts.length; q++) {
          if (!parts[q]) continue;
          if (/^\s+$/.test(parts[q])) { frag.appendChild(document.createTextNode(parts[q])); continue; }
          var sp = document.createElement('span');
          sp.className = 'w';
          sp.style.setProperty('--i', String(Math.min(i, STEP_CAP)));
          sp.appendChild(document.createTextNode(parts[q]));
          frag.appendChild(sp);
          i++;
        }
        node.parentNode.replaceChild(frag, node);
      }
    }
    if (i) root.className += ' streaming';
    return Math.min(i, STEP_CAP);
  }

  function reveal(container, after) {
    if (!io) return;
    var els = container.querySelectorAll(RISE);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add('rise');
      els[i].style.setProperty('--d', (after + Math.min(i, 5) * 70) + 'ms');
      io.observe(els[i]);
    }
  }

  function chipRow(ids) {
    if (!ids || !ids.length) return '';
    var out = '<div class="asks">';
    for (var i = 0; i < ids.length; i++) {
      if (!A[ids[i]]) continue;
      out += '<button class="askchip" type="button" data-ask="' + ids[i] + '">' +
             A[ids[i]].label + '</button>';
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

  /* What the engine is actually doing, in the order it does it. */
  var STAGES = ['Thinking', 'Writing'];
  var PAINT_MIN = 1500;   /* floor, so short answers still register */
  var PAINT_MAX = 3000;   /* ceiling, so long ones do not test patience */
  var PAINT_AT_REDUCED = 700;

  /* The run used to be a fixed 2.4s, which made the progress bar a
     decoration measuring nothing. Answer length is the one quantity known
     up front, so the bar now tracks that. */
  function runFor(html) {
    var words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).length;
    return Math.max(PAINT_MIN, Math.min(PAINT_MAX, 900 + words * 9));
  }

  var SPARK = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12 2.6 13.9 9a3.2 3.2 0 0 0 2.1 2.1l6.4 1.9-6.4 1.9A3.2 3.2 0 0 0 13.9 17' +
    'L12 23.4 10.1 17A3.2 3.2 0 0 0 8 14.9L1.6 13 8 11.1A3.2 3.2 0 0 0 10.1 9z"/></svg>';

  function shell() {
    var wrap = document.createElement('div');
    wrap.className = 'msg';
    wrap.innerHTML =
      '<img class="face" src="img/avatar.jpg" alt="" width="320" height="320">' +
      '<div class="said">' +
      '<div class="body">' +
        '<div class="thinking" role="status">' +
          '<div class="think-row">' +
            '<span class="think-spark">' + SPARK + '</span>' +
            '<span class="think-label">' + (reduce ? 'Thinking' : STAGES[0]) + '</span>' +
            '<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '</div>' +
          '<span class="think-track" aria-hidden="true"><span class="think-bar"></span></span>' +
        '</div>' +
      '</div></div>';
    thread.appendChild(wrap);
    toBottom();
    return wrap.querySelector('.body');
  }

  /* Nothing scored well enough. Say so, and offer the nearest topics
     rather than inventing an answer to a question nobody wrote. */
  function fallback(query) {
    var r = rank(query);
    /* Only call them "closest" when something actually scored. On a query
       with no overlap at all, the top of a flat ranking is arbitrary, and
       presenting it as related would be its own small lie. */
    var related = r[0] && r[0][1] >= 0.45;
    var ids = related
      ? r.slice(0, 3).map(function (x) { return x[0]; })
      : ['best', 'work', 'numbers', 'why', 'contact'];
    return '<p>I do not have that one. I could guess, but guessing around numbers is how lending books come apart, so no.</p>' +
           '<p>' + (related ? 'Closest things to it:' : 'What I can cover:') + '</p>' +
           chipRow(ids) +
           '<p style="margin-top:1rem">Or ask me directly and I will answer properly.</p>' + REACH;
  }

  function answer(id, from, query) {
    var body = shell();
    var html = A[id] ? A[id].html + chipRow(A[id].chips) : fallback(query || '');
    var total = reduce ? PAINT_AT_REDUCED : runFor(html);
    var timers = [];

    if (!reduce) {
      var bar = body.querySelector('.think-bar');
      /* one source of truth for how long this takes */
      if (bar) bar.style.animationDuration = total + 'ms';
      var label = body.querySelector('.think-label');
      for (var st = 1; st < STAGES.length; st++) {
        timers.push(window.setTimeout(function (text) {
          return function () { if (label) label.textContent = text; };
        }(STAGES[st]), total * 0.52 * st));
      }
    }

    timers.push(window.setTimeout(function () {
      var fresh = document.createElement('div');
      fresh.className = 'body';
      fresh.innerHTML = html;
      body.parentNode.replaceChild(fresh, body);
      anchor(from);
      var words = stream(fresh);
      reveal(fresh, words * STEP);
      /* Words are held at opacity 0 by .streaming until their animation
         runs. If one never runs, that text is invisible for good, so the
         class comes off on a timer and every span reverts to normal. */
      if (words) {
        window.setTimeout(function () { fresh.className = 'body'; },
                          words * STEP + 600);
      }
    }, total));
  }

  function markRail(id) {
    var links = document.querySelectorAll('.side-link[data-ask]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('data-ask') === id) {
        links[i].setAttribute('aria-current', 'true');
      } else {
        links[i].removeAttribute('aria-current');
      }
    }
  }

  function ask(id, spoken) {
    if (id === 'reset') { reset(); return; }
    markRail(id);
    answer(id, youSaid(spoken || (A[id] && A[id].q) || id));
  }

  function send(text) {
    text = text.replace(/\s+/g, ' ').trim();
    if (!text) return;
    var hit = match(text);
    markRail(hit);
    answer(hit, youSaid(text), text);
  }

  /* ---- wiring ------------------------------------------------ */

  var greeting = thread.firstElementChild;

  function reset() {
    while (thread.lastElementChild && thread.lastElementChild !== greeting) {
      thread.removeChild(thread.lastElementChild);
    }
    scroll.scrollTop = 0;
    markRail(null);
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

  var rec = document.getElementById('rec');
  rec.addEventListener('change', function () {
    if (rec.checked) ask('recruiter', 'Recruiter mode');
  });

  /* night mode. White is the default in every browser; the moon
     switches it for this visit. Persisting the choice would need
     localStorage, which this site does not use. */
  var themeBtn = document.getElementById('theme-toggle');
  var root = document.documentElement;

  function isDark() { return root.getAttribute('data-theme') === 'dark'; }
  function syncThemeBtn() {
    themeBtn.setAttribute('aria-pressed', String(isDark()));
    themeBtn.setAttribute('aria-label', isDark() ? 'Switch to day mode' : 'Switch to night mode');
  }
  themeBtn.addEventListener('click', function () {
    root.setAttribute('data-theme', isDark() ? 'light' : 'dark');
    syncThemeBtn();
  });
  syncThemeBtn();


  /* Same backstop as the classic pages, against the conversation's scroller. */
  function sweep() {
    if (!io) return;
    var box = scroll.getBoundingClientRect();
    var pending = thread.querySelectorAll('.rise:not(.is-in)');
    for (var i = 0; i < pending.length; i++) {
      var r = pending[i].getBoundingClientRect();
      if (r.top < box.bottom - box.height * 0.06 && r.bottom > box.top) {
        pending[i].classList.add('is-in');
      }
    }
  }
  var sweeping = false;
  scroll.addEventListener('scroll', function () {
    if (sweeping) return;
    sweeping = true;
    window.requestAnimationFrame(function () { sweeping = false; sweep(); });
  }, { passive: true });

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

  if (window.matchMedia && window.matchMedia('(min-width: 60em) and (pointer: fine)').matches) {
    input.focus();
  }

  toggle.addEventListener('click', function () {
    if (side.classList.contains('open')) closeDrawer(); else openDrawer();
  });
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });
})();
