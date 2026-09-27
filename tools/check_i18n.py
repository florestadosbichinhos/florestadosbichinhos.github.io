#!/usr/bin/env python3
"""Confere que todo texto do site existe em todos os idiomas.

Lê as chaves usadas nas páginas (data-i18n, data-i18n-alt, data-i18n-aria) e o objeto
STRINGS de js/strings.js (JSON depois de `window.STRINGS =`). Falha se uma chave usada
faltar em algum idioma, se os idiomas tiverem chaves diferentes ou se algum texto
estiver vazio.

Uso: python3 tools/check_i18n.py [--strings js/strings.js] [pagina.html ...]
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEY_ATTR = re.compile(r'data-i18n(?:-alt|-aria)?="([^"]+)"')


def load_strings(path):
    source = Path(path).read_text(encoding="utf-8")
    start = source.index("window.STRINGS =") + len("window.STRINGS =")
    return json.loads(source[start:].strip().rstrip(";"))


def used_keys(pages):
    keys = set()
    for page in pages:
        keys.update(KEY_ATTR.findall(Path(page).read_text(encoding="utf-8")))
    return keys


def problems(strings, keys):
    found = []
    all_keys = set().union(*(set(table) for table in strings.values()))
    for lang, table in strings.items():
        for key in sorted((keys | all_keys) - set(table)):
            found.append(f"FAIL {lang}: falta '{key}'")
        for key, text in table.items():
            if not str(text).strip():
                found.append(f"FAIL {lang}: '{key}' vazio")
    return found


def main(argv):
    strings_path = ROOT / "js/strings.js"
    pages = []
    args = iter(argv)
    for arg in args:
        if arg == "--strings":
            strings_path = Path(next(args))
            continue
        pages.append(Path(arg))
    if not pages:
        pages = sorted(ROOT.glob("*.html"))
    found = problems(load_strings(strings_path), used_keys(pages))
    for line in found:
        print(line)
    print(f"FAILURES: {len(found)}")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
