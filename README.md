# Veronica Singh, portfolio

A plain static website. Six HTML pages, one stylesheet, one small script.
No framework, no build step, nothing to install.

**Everything is edited on github.com in a browser.** You do not need this
computer, a terminal, or any particular app. Any device you can log into
GitHub from will do.

## The six pages

| File | What it is |
|---|---|
| `index.html` | Home |
| `about.html` | About |
| `projects.html` | Case study index |
| `project-esop-repository.html` | Case 01, ESOP Loan Repository |
| `project-financing-os.html` | Case 02, Employee Financing Process OS |
| `contact.html` | Get in Touch |
| `styles.css` | The whole look. Colours, type, spacing, layout. |
| `main.js` | Mobile menu and the fade-in on scroll |
| `img/` | Portrait and product screenshots |

## How to change something

1. Go to your repository on **github.com**.
2. Click the file you want to change.
3. Click the **pencil** icon, top right of the file.
4. Edit the text.
5. Scroll down, click **Commit changes**.

The live site updates about a minute later. That is the entire process.

### Editing several files at once

On the repository's main page, press the **`.`** key. A full code editor
opens in your browser. Change as many files as you like, then use the
Source Control panel on the left to commit them all together.

### Replacing a screenshot

**Add file** then **Upload files**, and drag the new image in using the
**same filename** as the one it replaces. Blur any loan IDs, rupee
amounts, names or internal filenames first.

## Things that live on every page

The top menu, the footer and the Get in Touch block are repeated in all six
HTML files. Changing one of those means making the same edit six times.
Everything else is unique to its page.

## House rules the writing follows

- No em dashes anywhere.
- FinZ, always capitalised that way.
- No number appears on the site that cannot survive a follow-up question
  in an interview.

## What is not published

`v2/` is an alternative, punchier version of the same site, kept for
reference. `BRIEF.md` is the original working spec. Both are listed in
`.gitignore` and never reach the live site.

## _source/build.py

How the six pages were first generated. **Do not run it.** It overwrites
all six HTML files and would destroy any edit made since. It is kept only
as a record.
