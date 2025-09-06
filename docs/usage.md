# Usage Guide

This guide will help you run the project locally and understand the basic workflow.

---

## Prerequisites
- Install [Node.js](https://nodejs.org/) (LTS version recommended).  
- Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js).  
- (Optional) Install [Git](https://git-scm.com/) if you want to clone the repository directly.

---

## Running the Project Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/OpenCodeChicago/hacktoberfest-2025-frontend.git
   cd hacktoberfest-2025-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to the URL printed in the terminal**

   (usually `http://localhost:5173`)

---

## Available Scripts

- `npm run dev` → Run the app in development mode
- `npm run build` → Build the app for production
- `npm run preview` → Preview the production build locally
- `npm run lint` → Run the linter to check code style

---

## Workflow for Contributing

1. Fork this repository
2. Create a new branch for your feature or fix
3. Commit your changes
4. Open a Pull Request (PR) with a clear description of what you did

For more details, see [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## Troubleshooting

- If you see an error like **command not found: npm**, make sure **Node.js** and **npm** are installed.
- If the dev server doesn’t start, try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
- Still stuck? Ask in [main Hacktoberfest Discussion](https://github.com/orgs/OpenCodeChicago/discussions/2) or on [Discord](https://discord.gg/t6MGsCqdFX)
