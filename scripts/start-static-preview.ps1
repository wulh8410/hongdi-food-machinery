$ErrorActionPreference = 'Stop'
Set-Location (Resolve-Path (Join-Path $PSScriptRoot '..'))
& 'C:\Users\xiang\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 3000 --directory out
