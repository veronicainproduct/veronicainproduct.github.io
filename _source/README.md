# Page source

The site is plain static HTML and needs no build step to host. This script is
how the six pages are generated, so the shared nav, footer and contact block
stay identical everywhere.

    python _source/build.py

Run it from the project root. It overwrites the .html files.

## Editing

- Copy lives in `build.py` as plain HTML strings. Edit it there, not in the
  generated .html files, or your changes will be overwritten on the next run.
- Contact details, nav items and the stat strip are constants at the top.
- House style: no em dashes anywhere, and FinZ is always capitalised that way.

## Adding the third case study

1. In `projects.html` and `index.html` the third card is already written and
   commented out. Uncomment it in `build.py` (search for CASE3)
   and fill in the title, blurb and tags.
2. Copy the `c1 = """..."""` block in `build.py` as a template for the new
   page and add a matching `page(...)` call.
3. Re-run the script.

## Theme

Palette, type and components come from thaisafernandes.com:
Space Grotesk (headings and body) with Space Mono for meta lines,
warm bone ground #f9f3e7, ink #2e241f, and four pastels
(blue #abd6e3, pink #dca3ac, lavender #e0d3ee, tan #e6d5bc).
Everything is built from 4px ink borders with hard offset shadows.

## Images

`img/` holds the portrait and the product screenshots. The screenshots have
had loan IDs, rupee amounts, the uploader name and internal filenames blurred
before publishing. If you replace any of them, blur the equivalent regions
first. Two empty slots remain on the ESOP page for further screenshots; each
has a comment above it naming the file to drop in.
