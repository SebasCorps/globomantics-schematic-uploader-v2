# Globomantics Schematic Uploader v2

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern, secure uploader for Globomantics schematic assets. Built for speed, reliability, and developer delight.

## Features

- File upload (schematic/diagnostic files)
- Structured logging with Winston
- Intentional fake secrets (see below)
- Informative results page for teaching
- Modern Globomantics branding

## Fake Secrets for Demo Purposes

This repository intentionally includes a small number of fake secrets to help you demo GitHub push protection and secret scanning. **Do not use real secrets!**

**Current fake secrets:**

- `index.js`: A fake GitHub Personal Access Token (PAT)
- `index.js`: A fake cloud API key
- `.env.example`: `DEMO_SECRET=ghp_FAKEDEMOSECRET1234567890`

You can add or remove these as needed for your demos. After testing, be sure to scrub any secrets before production use.

## Getting Started

1. Clone this repo.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and adjust as needed.
4. Start the app:
   ```bash
   npm start
   ```
5. Visit [http://localhost:3002](http://localhost:3002)

## Demo: Secret Scanning

- This repo contains fake secrets in:
  - `index.js` (GitHub PAT, cloud API key)
  - `.env.example` (DEMO_SECRET)
  - App logs (see `app.log` after uploading a file)
- Use GitHub Advanced Security (GHAS) or the GitHub web UI to scan for secrets.
- Try leaking a secret in a commit, then use `git filter-repo` or `BFG` to scrub it and re-scan.

## Teaching Tips

- Show learners the results page after upload. Point out the note about intentional secrets.
- Open `index.js` and `.env.example` to show how secrets can be exposed in code and config.
- Tail the `app.log` file to show how secrets can leak into logs.

## Security Notice

**Do not use real secrets in this demo app!** All secrets are fake and for educational purposes only.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct
See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Security Policy
See [SECURITY.md](SECURITY.md).

---

© 2024 Timothy Warner. MIT License.

Happy scanning! 🚦
