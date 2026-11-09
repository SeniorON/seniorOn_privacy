#!/usr/bin/env python3
"""Build index.html from privacy.md.

Usage:
    python3 -m venv .venv
    .venv/bin/pip install -r requirements.txt
    .venv/bin/python build.py
"""

from pathlib import Path
import re

import markdown

ROOT = Path(__file__).parent
SOURCE = ROOT / "privacy.md"
OUTPUT = ROOT / "index.html"

TEMPLATE = """<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="SeniorON 개인정보처리방침">
  <title>SeniorON 개인정보처리방침</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="inner">
      <a class="brand" href="index.html">SeniorON</a>
      <nav class="nav" aria-label="주요 문서">
        <a href="index.html" aria-current="page">개인정보처리방침</a>
        <a href="account-deletion.html">계정 삭제</a>
      </nav>
    </div>
  </header>

  <main>
    <article class="policy">
{content}
    </article>
  </main>

  <footer class="site-footer">
    <div class="box">
      <span>© 2026 SeniorON. All rights reserved.</span>
      <span>문의: <a href="mailto:senioron.team@gmail.com">senioron.team@gmail.com</a></span>
    </div>
  </footer>
</body>
</html>
"""


def convert(md_text: str) -> str:
    parser = markdown.Markdown(
        extensions=["tables", "toc", "sane_lists"],
        extension_configs={"toc": {"toc_depth": "2-2"}},
    )
    html = parser.convert(md_text)
    toc = parser.toc

    # Put the table of contents before the first section heading.
    if toc:
        toc = toc.replace(
            '<div class="toc">',
            '<div class="toc"><p class="toc-title">목차</p>',
            1,
        )
        html = html.replace("<h2", toc + "\n<h2", 1)

    # Make tables horizontally scrollable on small screens.
    html = re.sub(
        r"(<table>.*?</table>)",
        r'<div class="table-wrap">\1</div>',
        html,
        flags=re.DOTALL,
    )

    # Highlight explanatory notes that start with ※.
    html = re.sub(
        r"<p>※ (.*?)</p>",
        r'<p class="note">※ \1</p>',
        html,
        flags=re.DOTALL,
    )

    # Linkify bare URLs (the source markdown contains no anchors).
    html = re.sub(
        r"(?<![\"'=])(https?://[^\s<]+)",
        r'<a href="\1" target="_blank" rel="noopener noreferrer">\1</a>',
        html,
    )

    return html


def main() -> None:
    md_text = SOURCE.read_text(encoding="utf-8")
    content = convert(md_text)
    OUTPUT.write_text(TEMPLATE.format(content=content), encoding="utf-8")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
