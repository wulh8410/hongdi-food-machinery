from __future__ import annotations

import functools
import http.server
import os
import socketserver
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
LOG = ROOT / "static-preview.log"
PORT = 3000


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def main() -> None:
    os.chdir(ROOT)
    LOG.parent.mkdir(parents=True, exist_ok=True)
    log = LOG.open("a", encoding="utf-8")
    sys.stdout = log
    sys.stderr = log
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(OUT))
    with ReusableTCPServer(("", PORT), handler) as httpd:
        print(f"Serving {OUT} at http://localhost:{PORT}", flush=True)
        httpd.serve_forever()


if __name__ == "__main__":
    main()
