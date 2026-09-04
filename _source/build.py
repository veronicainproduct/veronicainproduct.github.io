# ============================================================
#  STOP AND READ.
#
#  This script REGENERATES all six .html files from scratch and
#  OVERWRITES them. The website is now edited directly in the
#  .html files, usually through github.com in a browser.
#
#  If you run this, every hand edit made since the last run is
#  destroyed. Only run it if you know that is what you want.
#
#  Kept here as a record of how the pages were first generated.
# ============================================================

# Builds the static HTML pages. Output is plain HTML; no build step
# is needed to host the site. Run from the project root:
#     python _source/build.py
import os

OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EMAIL   = "veronica.singh2525@gmail.com"
WA_INTL = "919555914534"
WA_SHOW = "+91 95559 14534"
TEL_INTL = "+919555914534"
TEL_SHOW = "+91 95559 14534"
LI_URL  = "https://www.linkedin.com/in/veronicasingh250803"
LI_SHOW = "linkedin.com/in/veronicasingh250803"

NAV = [("index.html","Home"),("about.html","About"),
       ("projects.html","Work"),("contact.html","Get in Touch")]

ICONS = {
 "growth": '<path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/>',
 "shield": '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 3.5-3.5"/>',
 "layers": '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
 "cpu":    '<rect x="6" y="6" width="12" height="12" rx="1"/><rect x="10" y="10" width="4" height="4"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
}

def icon(name):
    return ('<span class="icon-box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" '
            'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
            + ICONS[name] + '</svg></span>')

def nav(current):
    items = ""
    for href, label in NAV:
        cur = ' aria-current="page"' if href == current else ''
        items += '        <li><a class="nav-link" href="%s"%s>%s</a></li>\n' % (href, cur, label)
    return """<header class="site-nav">
  <div class="nav-inner">
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>
    <nav aria-label="Primary">
      <ul class="nav-links" id="nav-links">
%s      </ul>
    </nav>
  </div>
</header>""" % items

FOOTER = """<footer class="site-footer">
  <div class="wrap">
    <div class="footer-inner">
      <p class="colophon">&copy; 2026 Veronica Singh. Aspiring Product Manager, Delhi NCR.</p>
      <a class="to-top" href="#main">Back to top</a>
    </div>
  </div>
</footer>"""

LOGO_IN = ('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
  '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05'
  'c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13z'
  'M7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72'
  'V1.72C24 .77 23.2 0 22.22 0z"/></svg>')

LOGO_MAIL = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
  '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2.5 7 9.5 6 9.5-6"/></svg>')

LOGO_PHONE = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
  '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3'
  'a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>')

CONTACT = """<section class="contact" id="contact">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">Get in Touch</h2>
      <p class="sec-intro">Open to conversations about product roles in fintech, AI-native product work and internal platform teams.</p>
    </div>
    <ul class="contact-actions">
      <li>
        <a class="action action--in" href="%(li)s" rel="me noopener" target="_blank">
          <span class="action-icon">%(logo_in)s</span>
          <span class="action-label">Connect on LinkedIn</span>
        </a>
      </li>
      <li>
        <a class="action" href="mailto:%(email)s">
          <span class="action-icon">%(logo_mail)s</span>
          <span class="action-label">Email</span>
        </a>
      </li>
      <li>
        <details class="action-details">
          <summary class="action">
            <span class="action-icon">%(logo_phone)s</span>
            <span class="action-label">Phone number</span>
          </summary>
          <a class="action-value" href="tel:%(tel)s">%(telshow)s</a>
        </details>
      </li>
    </ul>
  </div>
</section>""" % dict(email=EMAIL, li=LI_URL, tel=TEL_INTL, telshow=TEL_SHOW,
                     logo_in=LOGO_IN, logo_mail=LOGO_MAIL, logo_phone=LOGO_PHONE)


def page(fname, title, desc, current, body):
    html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<meta name="author" content="Veronica Singh">
<meta property="og:type" content="website">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:site_name" content="Veronica Singh">
<meta property="og:locale" content="en_IN">
<!-- Set og:url and og:image once the site is hosted. -->
<!-- <meta property="og:url" content="https://YOUR-DOMAIN-HERE/%(fname)s"> -->
<!-- <meta property="og:image" content="https://YOUR-DOMAIN-HERE/og-image.png"> 1200x630px -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="%(title)s">
<meta name="twitter:description" content="%(desc)s">
<meta name="theme-color" content="#f9f3e7">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
%(nav)s
<main id="main">
%(body)s
</main>
%(footer)s
<script src="main.js"></script>
</body>
</html>
""" % dict(title=title, desc=desc, fname=fname, nav=nav(current), body=body, footer=FOOTER)
    open(os.path.join(OUT, fname), "w", encoding="utf-8").write(html)


# ============================================================
# shared blocks
# ============================================================
STATS = [("20+ months","Building the product"),
         ("&#8377;3 Cr+","Disbursed monthly"),
         ("&#8377;34 Cr","Active loan book"),
         ("4,500+","Employees served")]

def stats():
    lis = "".join('      <li class="stat-box"><span class="stat-figure">%s</span>'
                  '<span class="stat-label">%s</span></li>\n' % (f, l) for f, l in STATS)
    return """<section class="tight">
  <div class="wrap">
    <ul class="stat-list">
%s    </ul>
  </div>
</section>""" % lis

CASES = [
  dict(n="Case 01", href="project-esop-repository.html", cls="case--1", ic="shield",
       title="ESOP Loan Repository",
       blurb="Eleven spreadsheets owned by five teams, replaced with one system of record. Built by directing AI as the engineering layer.",
       chips=["System of record","Compliance","AI-directed build"], status=None),
  dict(n="Case 02", href="project-financing-os.html", cls="case--2", ic="layers",
       title="Employee Financing Process OS",
       blurb="The monthly deduction, invoicing and payment cycle for two lenders, taken off spreadsheets and email threads.",
       chips=["Process design","Data safety","Audit trail"], status="In build"),
]

def case_cards():
    out = ""
    for c in CASES:
        chips = "".join('<li class="chip">%s</li>' % t for t in c["chips"])
        status = '<span class="status">%s</span>' % c["status"] if c["status"] else ""
        out += """    <li><a class="case-card %(cls)s" href="%(href)s">
      <span class="case-head">
        %(icon)s
      </span>
      <span class="case-body">
        %(status)s
        <h3>%(title)s</h3>
        <p>%(blurb)s</p>
        <ul class="chips">%(chips)s</ul>
        <span class="card-more">View case study</span>
      </span>
    </a></li>
""" % dict(cls=c["cls"], href=c["href"], icon=icon(c["ic"]), status=status,
           title=c["title"], blurb=c["blurb"], chips=chips)
    return out

CASE3 = """    <!-- THIRD CASE STUDY, NOT YET WRITTEN.
         Uncomment this block and fill it in to add the third case study,
         then create project-lending-product.html using either existing
         case-study page as the template. Nothing else needs changing.

    <li><a class="case-card case--3" href="project-lending-product.html">
      <span class="case-head">
        <span class="icon-box"></span>
      </span>
      <span class="case-body">
        <h3>TITLE</h3>
        <p>ONE OR TWO SENTENCES.</p>
        <ul class="chips"><li class="chip">TAG</li></ul>
        <span class="card-more">View case study</span>
      </span>
    </a></li>
    -->
"""

FACTS = """      <div class="fact-col card card--blue">
        <h3>Education</h3>
        <ul>
          <li>BSc (Hons) Computer Science, minor in Mathematics<span>Aryabhatta College, University of Delhi</span></li>
          <li>Class 12<span>96%</span></li>
          <li>Class 10<span>97%</span></li>
        </ul>
      </div>
      <div class="fact-col card card--pink">
        <h3>Domain</h3>
        <ul>
          <li>Consumer lending</li>
          <li>User experience</li>
          <li>Product strategy</li>
          <li>Credit policies</li>
        </ul>
      </div>
      <div class="fact-col card card--tan">
        <h3>Currently</h3>
        <ul>
          <li>FinZ, the fintech vertical at PhysicsWallah<span>Responsible for two products</span></li>
          <li>ESOP Financing<span>Lending against pledged ESOP shares so employees can pay the exercise tax before the shares turn into cash</span></li>
          <li>Employee Financing<span>Salary advance and top-up loans, recovered from monthly pay through payroll deduction</span></li>
          <li>Delhi NCR</li>
        </ul>
      </div>"""

def shot(src, alt):
    return """      <figure>
        <div class="shot"><img src="%s" alt="%s" loading="lazy" width="1600" height="760"></div>
      </figure>
""" % (src, alt)

def slot(sid, num, cap):
    return """      <figure>
        <!-- Drop a screenshot in here: replace this div with
             <div class="shot"><img src="img/%s.png" alt="%s" loading="lazy"></div> -->
        <div class="fig-frame" role="img" aria-label="Screenshot placeholder. %s.">
          <span class="fig-slot">%s</span>
          <span class="fig-dims">1600 x 760px</span>
        </div>
      </figure>
""" % (sid, cap, cap, sid, num, cap)


# ============================================================
# HOME
# ============================================================
hero = """<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <ul class="hero-pills" aria-label="Focus areas">
        <li class="pill">Fintech</li>
        <li class="pill pill--tan">Product strategy</li>
      </ul>
      <h1 class="name">Veronica Singh</h1>
      <p class="role">Aspiring Product Manager<br>Employee Financing, FinZ</p>
      <p class="hero-sub">More than twenty months building a lending product from scratch. We started with no book, no eligibility rules and no definite collections process. The product now disburses &#8377;3 Cr+ a month to PhysicsWallah employees, and I drafted the credit policy that made those collections work.</p>
      <div class="hero-cta">
        <a class="btn" href="projects.html">View the work</a>
        <a class="btn btn--pink" href="contact.html">Get in touch</a>
      </div>
    </div>
    <div class="photo-stack">
      <div class="photo-frame"><img src="img/portrait.jpg" alt="Veronica Singh" width="800" height="800"></div>
    </div>
  </div>
</section>"""

capabilities = """<section>
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">Three things I own end to end</h2>
    </div>
    <div class="grid grid--3">
      <article class="card card--blue">
        """ + icon("shield") + """
        <h3>Credit policy</h3>
        <p>I drafted the CIBIL based credit policy that decides who qualifies and at what limit. It exists to move one number, the collection rate, by declining the wrong loans early rather than chasing them later.</p>
      </article>
      <article class="card card--pink">
        """ + icon("layers") + """
        <h3>Systems of record</h3>
        <p>When five teams hold five versions of the truth, the product is not a calculator. It is an audit trail. I build the system that makes disagreements visible instead of silent.</p>
      </article>
      <article class="card card--tan">
        """ + icon("growth") + """
        <h3>The product itself</h3>
        <p>I own the Employee Financing product and have reworked its user flows again and again over twenty months, each round against real feedback from the employees using it. When footfall needed lifting, I introduced coupons and a waiver on the processing fee, and rebuilt the journey around what actually got people through it.</p>
      </article>
    </div>
  </div>
</section>"""

about_preview = """<section class="tight">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">About Veronica</h2>
      <p class="sec-intro">Aspiring Product Manager at FinZ, the fintech vertical at PhysicsWallah. Responsible for two products: ESOP Financing and Employee Financing.</p>
    </div>
    <div class="grid grid--3">
""" + FACTS + """
    </div>
    <p style="text-align:center;margin-top:clamp(2rem,4vw,2.75rem)">
      <a class="btn btn--lav" href="about.html">More about me</a>
    </p>
  </div>
</section>"""

work_preview = """<section>
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">Featured Work</h2>
      <p class="sec-intro">Two internal systems built for a book that moves real money.</p>
    </div>
    <ul class="case-list">
""" + case_cards() + CASE3 + """    </ul>
  </div>
</section>"""

page("index.html",
     "Veronica Singh | Aspiring Product Manager, Employee Financing",
     "More than twenty months building a lending product from scratch at FinZ, the fintech vertical at PhysicsWallah. Now disbursing Rs 3 Cr+ a month to PhysicsWallah employees.",
     "index.html",
     hero + "\n" + stats() + "\n" + capabilities + "\n"
     + about_preview + "\n" + work_preview + "\n" + CONTACT)


# ============================================================
# ABOUT
# ============================================================
about = """<section>
  <div class="wrap">
    <a class="back-link" href="index.html">Back to home</a>
    <div class="page-head">
      <h1>About Veronica</h1>
      <p class="lede">Aspiring Product Manager at FinZ, the fintech vertical at PhysicsWallah. Responsible for two products: ESOP Financing and Employee Financing. Based in Delhi NCR.</p>
    </div>

    <div class="prose">
      <h3>Who I am</h3>
      <p>I did not arrive at product through a product title. I arrived by owning a lending book: its eligibility rules, its pricing, its repayment mechanics and its collections. Then I built the systems that keep it honest.</p>

      <h3>More than twenty months, from nothing</h3>
      <p>I have spent more than twenty months building a financial product from scratch. When I started there was no book. There were no rules for who could borrow, no pricing, no repayment schedule that fit a payroll cycle, and no process for what happens when a deduction does not recover the full amount. I designed all four.</p>
      <p>The product now disburses &#8377;3 Cr+ every month to PhysicsWallah employees through payroll deduction.</p>
      <blockquote><p>A payroll deducted loan only looks safe. Employment tells you someone is paid. It does not tell you whether they are already over borrowed somewhere else.</p></blockquote>
      <p>That gap is what the credit policy closes. I drafted it against bureau data so the decision to lend, and the limit attached to it, is made before the money leaves rather than argued about after it does not come back.</p>

      <h3>What came out of it</h3>
      <p>Two internal systems, both on this site. The first replaced eleven spreadsheets with a single system of record for the ESOP loan book. The second is replacing a manual monthly cycle that currently runs on spreadsheets and email threads. I specified both and directed AI as the engineering layer to build them.</p>

      <h3>What I am working towards</h3>
      <p>A product role where the correctness bar is part of the job. Fintech, internal platforms, or anywhere the expensive mistakes are the quiet ones.</p>
    </div>
  </div>
</section>


<section class="tight">
  <div class="wrap">
    <ol class="principles">
      <li><div class="p-text"><span class="p-lead">Irreversibility drives the design.</span> Releasing collateral and paying money out cannot be undone, so those paths get the strictest gates and fail safe defaults.</div></li>
      <li><div class="p-text"><span class="p-lead">Evidence over declaration.</span> Prefer &ldquo;the cash arrived&rdquo; over &ldquo;someone ticked Closed&rdquo;.</div></li>
      <li><div class="p-text"><span class="p-lead">Business exceptions belong to the business.</span> Encoded as data the operations team owns, not as rules buried in code they cannot see.</div></li>
      <li><div class="p-text"><span class="p-lead">Silence is the enemy.</span> Fail soft, but never fail quietly. A financial tool that degrades without saying so is worse than one that stops.</div></li>
      <li><div class="p-text"><span class="p-lead">Signal over completeness.</span> A report nobody trusts because it flags &#8377;3 discrepancies is worse than no report at all. Choosing what not to show is a product decision.</div></li>
    </ol>
  </div>
</section>


<section class="tight">
  <div class="wrap">
    <div class="grid grid--3">
""" + FACTS + """
    </div>
  </div>
</section>
""" + CONTACT

page("about.html", "About | Veronica Singh",
     "More than twenty months building a lending product from scratch at FinZ, the fintech vertical at PhysicsWallah: eligibility, pricing, repayment, collections and the CIBIL based credit policy behind them.",
     "about.html", about)


# ============================================================
# WORK INDEX
# ============================================================
work = """<section>
  <div class="wrap">
    <a class="back-link" href="index.html">Back to home</a>
    <div class="page-head page-head--pink">
      <h1>Case Studies</h1>
      <p class="lede">Two internal systems built for the employee financing book at FinZ. Every figure here is one I can walk through in an interview.</p>
    </div>
    <ul class="case-list">
""" + case_cards() + CASE3 + """    </ul>
  </div>
</section>
""" + CONTACT

page("projects.html", "Work | Veronica Singh",
     "Two case studies: the ESOP Loan Repository, and the Employee Financing Process OS currently in build.",
     "projects.html", work)


# ============================================================
# CASE 01
# ============================================================
def step(src, alt, heading, story):
    return """    <article class="case-step">
      <figure>
        <div class="shot"><img src="%s" alt="%s" loading="lazy"></div>
      </figure>
      <div class="step-body">
        <h3>%s</h3>
        %s
      </div>
    </article>
""" % (src, alt, heading, story)


c1 = ("""<section>
  <div class="wrap">
    <a class="back-link" href="projects.html">All work</a>
    <div class="page-head">
      <span class="kicker">Case 01</span>
      <h1>ESOP Loan Repository</h1>
      <p class="meta">Live in production at FinZ and PhysicsWallah. Built solo.</p>
    </div>

    <div class="case-intro">
      <p><strong>The problem.</strong> PhysicsWallah grants ESOP. Exercising it triggers a tax bill immediately, long before the shares are worth anything spendable, so FinZ lends against the pledged shares. Around 300 loans, and the entire lifecycle ran on eleven spreadsheets owned by five different teams.</p>
      <p><strong>Who it is for.</strong> The FinZ operations team, who answer questions about individual loans daily, and the compliance officer, who has to approve every release for a Designated Person before it happens.</p>
      <p><strong>The reframe.</strong> The obvious brief was a better calculator. The money maths is deterministic and easy. The real problem was five teams holding five versions of the truth with no way to prove which was right, which makes this a system of record, not a calculator.</p>
    </div>

    <div class="case-steps">
""" + step("img/esop-repository.png",
      "The ESOP Loan Repository dashboard showing loan counts, the working tabs and the repayment schedule",
      "Eleven spreadsheets became one system of record",
      """<p>Interest accrual, share sales, repayment, surplus refunds and share release each lived in a different file owned by a different team. Nobody could answer what a borrower owed today without opening several of them and reconciling by hand.</p>
        <p>This screen computes every repayment schedule from a single canonical formula, joined across eleven live sources. The tab bar is the point: one working surface for each real job, rather than one spreadsheet per team. Bank reconciliation parses to &#8377;64,05,97,403 and matches the bank&rsquo;s own summary.</p>""")

+ step("img/esop-unpledge.png",
      "Shares to Unpledge tab showing the count of loans cleared for release and the total shares to be unpledged",
      "Collateral is released on evidence, never on a status flag",
      """<p>Releasing pledged shares cannot be undone. In the original process a loan qualified for release if a spreadsheet field said Closed, which meant a human editable cell was authorising an irreversible transfer of collateral.</p>
        <p>I removed that path. This queue keys only on evidence that cash was actually recovered, so a loan appears here because the money arrived, not because somebody ticked a box. The tradeoff I accepted: a loan genuinely repaid through an unrecorded channel waits until the payment is logged. Failing to release on time is a support ticket. Releasing collateral wrongly is not.</p>""")

+ step("img/esop-refunds.png",
      "Refunds tab showing loans with refunds pending, total refund amount, refund paid and refund outstanding",
      "Surplus owed back, tracked to the rupee",
      """<p>When the proceeds of a share sale exceed what a borrower owes, the surplus has to go back to them. Who was owed a refund, how much, and whether it had actually been paid was spread across the same eleven files, which is exactly the kind of thing that goes unnoticed until someone asks.</p>
        <p>This view holds all of it in one place: refunds pending, the total owed, what has been paid and what is still outstanding. The reconciliation behind it is what surfaces the case nobody wants to find, a refund paid where none was owed.</p>""") + """    </div>

    <article class="prose">
      <h3>How it was built</h3>
      <p>I did not have an engineering team. I had a specification and a clear idea of what correct looked like, so I directed AI as the engineering layer and reviewed every step it took. That produced 108 production deployments over four months, built alongside my regular work.</p>
      <p>The part worth knowing is where the difficulty actually sat. Almost none of it was in the money maths, which is deterministic and easy. It was in reading the source data correctly.</p>
      <ol class="steps">
        <li>A column labelled Confiscation Value turned out to hold share quantities, not rupees.</li>
        <li>Dates stored day first as text were being misread, which quietly made payments vanish from schedules.</li>
        <li>133 of 333 confiscations sat against cancelled orders, invisible to anything that only loaded completed ones.</li>
      </ol>
      <p>None of those crash. They produce a confident wrong answer, which is far more dangerous in a system people trust with money. Directing AI is what made the building fast. Knowing what to check is what made it correct.</p>

      <h3>Compliance gates on the person, not the loan</h3>
      <p>Designated Persons under insider trading rules may only have shares released with explicit approval. The original gate matched on Loan ID, but a Designated Person is a person, not a loan, so their other loans passed through as though unregulated. I re-gated on identity, matching by BO ID and Employee Code, and added two fail safes. If the compliance list cannot be read, block every release rather than silently letting them through. If a loan carries no identifier to check, hold it.</p>

      <div class="limits">
        <h3>Honest limitations</h3>
        <p>I never instrumented the manual baseline, so I can show what the system catches but not a clean time saved figure. Refresh is slow on the largest sheets. The tool mirrors upstream data it does not control, which is precisely why the reconciliation views exist. And one person built it, so it needs a documented handover.</p>
      </div>
    </article>

    <nav class="pager" aria-label="More work">
      <span></span>
      <a class="next" href="project-financing-os.html"><span class="pager-dir">Next case</span><span class="pager-title">Employee Financing Process OS</span></a>
    </nav>
  </div>
</section>
""" + CONTACT)

page("project-esop-repository.html", "ESOP Loan Repository | Veronica Singh",
     "Eleven spreadsheets owned by five teams replaced with one system of record for the PhysicsWallah ESOP loan book, built by directing AI as the engineering layer.",
     "projects.html", c1)


# ============================================================
# CASE 02
# ============================================================
c2 = """<section>
  <div class="wrap">
    <a class="back-link" href="projects.html">All work</a>
    <div class="page-head page-head--pink">
      <span class="kicker">Case 02</span>
      <h1>Employee Financing Process OS</h1>
      <p class="meta">FinZ and PhysicsWallah. Three and a half weeks from PRD to working system.</p>
      <span class="status">In build, not yet launched</span>
    </div>

    <article class="prose">
      <h3>The month, as it works today</h3>
      <p>Every month around 2,886 PhysicsWallah employees repay a loan out of their salary. Before any of that money moves, somebody has to do all of this by hand.</p>
      <ol class="steps">
        <li>Build the deduction summary for the month.</li>
        <li>Send it to payroll and wait for confirmation of what was actually deducted, which is never quite what was requested.</li>
        <li>Work out what each of the two lenders is owed.</li>
        <li>Raise the invoices and chase the approvals.</li>
        <li>Record the payment when it lands.</li>
        <li>Map that payment back to individual loans so the book is right.</li>
      </ol>
      <p>Every step of it lives in spreadsheets and email threads.</p>

      <h3>Where it goes wrong</h3>
      <p>Three things went wrong repeatedly, and none of them announced themselves.</p>
      <p><strong>A mis-keyed figure becomes a wrong invoice.</strong> Nothing in the process is capable of noticing. The number is simply wrong from that point on, and it is wrong in a document that has already been sent to another company.</p>
      <p><strong>There is no audit trail.</strong> An error that surfaces in month N+2 cannot be traced back to who changed what in month N. The answer is always somebody trying to remember.</p>
      <p><strong>Loan IDs collide across lenders.</strong> FinZ and Prest each maintain their own ID space, so the same number means two different loans depending on who you ask. That is how a payment gets applied to the wrong loan on the wrong system, and it is very hard to spot afterwards.</p>

      <h3>What I specified</h3>
      <p>One system for the whole cycle, with three decisions doing most of the work.</p>
      <ol class="decisions">
        <li>
          <span class="dec-lead">Every key is a pair, never a bare loan ID.</span>
          <p>Nothing in the system is keyed on <code>loan_id</code> alone. It is always <code>(lender, loan_id)</code>. That removes an entire class of error by construction rather than by care, which matters because care is exactly what runs out at the end of a long month.</p>
        </li>
        <li>
          <span class="dec-lead">Uploads are staged, not applied.</span>
          <p>Each lender&rsquo;s export is checked against the previous batch before it goes live. An unusually large change waits for a human to confirm it rather than overwriting the book quietly. Every upload is versioned and can be rolled back.</p>
        </li>
        <li>
          <span class="dec-lead">Every change is written down.</span>
          <p>An append only audit log records what changed and who changed it, and the tables are checksummed so that &ldquo;I did not mean to change that&rdquo; is detectable rather than hoped for.</p>
        </li>
      </ol>

      <h3>Where it stands</h3>
      <p>This is a work in progress and it is not yet launched. It has been built and validated against real production data locally, with 220 automated tests and 86 commits over three and a half weeks. The monthly scheduler exists but is deliberately switched off, pending a go live decision.</p>

      <div class="limits">
        <h3>Honest limitations</h3>
        <p>Not yet in daily production use. The live updates work is only partly done, with polling still running in parallel on purpose. Imports are file based because no reliable LMS API was available to integrate against. Until it runs a real month end, the time it saves is an estimate rather than a measurement.</p>
      </div>
    </article>

    <div class="figs">
""" + shot("img/ef-os-overview.png",
           "Business Overview screen showing loan count, loan volume and a breakdown by product",
) + shot("img/ef-os-imports.png",
           "Imports screen listing each lender's LMS export with row counts and version history",
) + shot("img/ef-os-login.png",
           "Sign in screen for the Employee Financing Portal, access limited to company domains",
) + """    </div>

    <nav class="pager" aria-label="More work">
      <a class="prev" href="project-esop-repository.html"><span class="pager-dir">Previous case</span><span class="pager-title">ESOP Loan Repository</span></a>
      <span></span>
    </nav>
  </div>
</section>
""" + CONTACT

page("project-financing-os.html", "Employee Financing Process OS | Veronica Singh",
     "A monthly deduction, invoicing and payment cycle for two lenders, taken off spreadsheets and rebuilt as one system with staged uploads and an audit trail. In build.",
     "projects.html", c2)


# ============================================================
# CONTACT
# ============================================================
contact = """<section class="tight">
  <div class="wrap">
    <a class="back-link" href="index.html">Back to home</a>
    <div class="page-head page-head--lav">
      <h1>Get in Touch</h1>
      <p class="lede">Open to conversations about product roles in fintech, AI-native product work and internal platform teams. The fastest way to reach me is LinkedIn or email.</p>
    </div>
  </div>
</section>
""" + CONTACT + """
<section class="tight">
  <div class="wrap">
    <p style="max-width:44ch">Based in Delhi NCR. There is no contact form on this site, because forms break silently and nobody tests them.</p>
  </div>
</section>"""

page("contact.html", "Get in Touch | Veronica Singh",
     "LinkedIn, email or WhatsApp. Open to product roles in fintech, AI-native product work and internal platform teams.",
     "contact.html", contact)

print("built 6 pages")
