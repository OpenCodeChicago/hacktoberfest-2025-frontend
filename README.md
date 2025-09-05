# Project Template

<img align="right" src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" width="100"/>

[![GitHub last commit](https://img.shields.io/github/last-commit/OpenCodeChicago/project-template)](https://github.com/OpenCodeChicago/project-template/commits/main)
[![CI](https://github.com/OpenCodeChicago/project-template/actions/workflows/ci.yml/badge.svg?style=for-the-badge)](https://github.com/OpenCodeChicago/project-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/github/license/OpenCodeChicago/project-template)](https://github.com/OpenCodeChicago/project-template/blob/main/LICENSE)
[![Open Issues](https://img.shields.io/github/issues/OpenCodeChicago/project-template)](https://github.com/OpenCodeChicago/project-template/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/OpenCodeChicago/project-template)](https://github.com/OpenCodeChicago/project-template/pulls)
[![Contributors](https://img.shields.io/github/contributors/OpenCodeChicago/project-template)](https://github.com/OpenCodeChicago/project-template/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/OpenCodeChicago/project-template?style=for-the-badge)](https://github.com/OpenCodeChicago/project-template/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/OpenCodeChicago/project-template?style=for-the-badge)](https://github.com/OpenCodeChicago/project-template/network/members)
[![Prettier](https://img.shields.io/badge/prettier-2.8.8-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![Bash](https://img.shields.io/badge/bash-5.2-4EAA25?logo=gnubash&logoColor=white&style=for-the-badge)](https://www.gnu.org/software/bash/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue?logo=docker&style=for-the-badge)](Dockerfile)

---

## Table of Contents

- [Description](#description)
- [Who is this for?](#who-is-this-for)
- [Quick Start](#quick-start)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Feedback](#feedback)
- [Support](#support)
- [Languages and Tools](#languages-and-tools)
- [Connect with us](#connect-with-us)

---

## Description

A ready-to-use template repository for quickly starting new projects. Includes essential files, recommended structure, and documentation to streamline your workflow.

---

## Who is this for?

This template is designed for:

- **Open Code Chicago contributors** starting new community projects.
- **Open source developers** who want a clean and consistent project structure.

---

## Quick Start

1. Click the **"Use this template"** button on the repository page to create a new repo.
2. Clone your new repository:
   ```sh
   git clone https://github.com/your-username/your-new-repo.git
   cd your-new-repo
   ```
3. (Optional) Run the setup script:
   ```sh
   bash setup.sh
   ```
4. Customize your project and update documentation as needed.

See [docs/setup.md](docs/setup.md) for more details.

---

## Features

- Pre-configured documentation folder (`docs/`)
- Example setup script (`setup.sh`)
- Dockerfile and .dockerignore for containerization
- Automated CI workflow with GitHub Actions (`.github/workflows/ci.yml`)
- Code of conduct and contributing guidelines
- Sample configuration files (`.editorconfig`, `.prettierrc`)
- Starter changelog

---

## Project Structure

```bash
project-template/                     # GitHub project-template
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflow/
│   │   └── ci.yml
│   ├── CODEOWNERS
│   ├── dependabot.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/
│   ├── images/
│   ├── architecture.md
│   ├── faq.md
│   ├── setup.md
│   └── usage.md
│
├── .dockerignore
├── .gitignore
├── .prettierrc
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Dockerfile
├── LICENSE
├── README.md
└── setup.sh
```

---

## Contributing

We welcome contributions!

Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Feedback

We welcome feedback and suggestions to improve the template’s functionality and usability.

---

## Support

📧 Contact: [Email](mailto:info@opencodechicago.org).

If you find this template helpful, consider supporting us:

[![Buy Me a Coffee](https://img.shields.io/badge/buy%20me%20a%20coffee-yellow?logo=buy-me-a-coffee&style=for-the-badge)](https://www.buymeacoffee.com/alexsmagin)
[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-blue?logo=paypal&style=for-the-badge)](https://paypal.me/alexandrsmagin)

---

## Languages and Tools

<div align="center">
<a href="https://git-scm.com/" target="_blank" rel="noreferrer">
<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/></a>
<a href="https://www.gnu.org/software/bash/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/gnu_bash-icon.svg" alt="Bash" height="50" /></a>
<a href="https://www.docker.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="Docker" height="50" /></a>
</div>

---

## Connect with us

<div align="center">
<a href="https://www.youtube.com/@AlexSmaginDev" target="_blank">
<img src="https://img.shields.io/badge/youtube-%23FF0000.svg?&style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" style="margin-bottom: 5px;" />
</a>
<a href="https://discord.gg/t6MGsCqdFX" target="_blank">
    <img src="https://img.shields.io/badge/discord-%237289DA.svg?&style=for-the-badge&logo=discord&logoColor=white" alt="Discord" style="margin-bottom: 5px;" />
</a>
<a href="https://www.linkedin.com/company/open-code-chicago" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
</a>
<a href="https://www.facebook.com/profile.php?id=61580367112591" target="_blank">
<img src="https://img.shields.io/badge/facebook-%231877F2.svg?&style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" style="margin-bottom: 5px;" />
</a>

</div>
