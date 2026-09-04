# Veronica Singh, portfolio

A plain static website. Six HTML pages, one stylesheet, one small script.
No framework, no build step, nothing to install.

**Everything is edited on github.com in a browser.** You do not need this
computer, a terminal, or any particular app. Any device you can log into
GitHub from will do.

## The six pages

| File | What it is |
|---|---|
| `index.html` | Home. The chat. Shell only, no answers. |
| `chat.js` | **Every answer the chat gives.** This is the file to edit. |
| `chat.css` | The look of the chat screen only |
| `home.html` | The full page version, linked from the chat |
| `about.html` | About |
| `projects.html` | Case study index |
| `project-esop-repository.html` | Case 01, ESOP Loan Repository |
| `project-financing-os.html` | Case 02, Employee Financing Process OS |
| `contact.html` | Get in Touch |
| `styles.css` | Colours, type and spacing, shared by every page |
| `main.js` | Mobile menu on the non-chat pages |
| `img/` | Portrait, avatar and product screenshots |

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

## Changing what the chat says

Open **`chat.js`**. Near the top is a block called `var A = {`. Each entry in
it is one answer:

```js
credit: {
  keys: ['credit policy', 'cibil', 'bureau', 'collection'],
  html: '<p>A payroll deducted loan only looks safe...</p>',
  chips: ['numbers', 'principles', 'work']
},
```

- `keys` are the words that send a visitor to this answer. Whole words only,
  so `ai` does not match `email`. When several answers match, the longest
  matching phrase wins.
- `html` is what gets said. Wrap each paragraph in `<p>...</p>`.
- `chips` are the suggested follow-up buttons, named by their entry id.

To add a new answer, copy an existing entry, give it a new id, and add that
id to `LABEL` and `ASKED` further down so its button has words on it.

There is no model behind this page and no API key in it. If a question does
not match anything, the chat says so and offers to be emailed, rather than
guessing. Keep it that way: every figure on this site is one you can be
asked to walk through.

The five prompts in the left sidebar are in `index.html`. The recruiter mode
prompts are the `TRY_REC` list in `chat.js`.

## Things that live on every page

The top menu, the footer and the Get in Touch block are repeated in the six
non-chat HTML files. Changing one of those means making the same edit six
times. Everything else is unique to its page.

The chat page does not share that furniture. It has its own sidebar.

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
