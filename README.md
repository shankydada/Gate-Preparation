# Gate-Preparation
Repo for the students want to Convert their struggle into opportunity for all. For Gate 2027 students.

# 🏆 GATE 2027 Mastery

<div align="center">

![GATE 2027 Mastery](https://img.shields.io/badge/GATE-2027-blue?style=for-the-badge&logo=graduation-cap)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**The Ultimate Gamified Learning Platform for GATE CSE 2027 Preparation**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Free Hosting Guide](#-free-hosting-guide)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 About

**GATE 2027 Mastery** is a comprehensive, open-source web application designed to help Computer Science Engineering students prepare for GATE 2027. Built with modern web technologies, it offers a gamified learning experience with structured roadmaps, curated resources, interactive quizzes, and progress tracking.

### Why GATE 2027 Mastery?

- 📚 **Comprehensive Coverage** - All 11 GATE CSE subjects with 200+ topics
- 🎮 **Gamified Learning** - XP, levels, badges, daily challenges, and leaderboards
- 📊 **Progress Tracking** - Visual dashboards and achievement systems
- 🔗 **Curated Resources** - 400+ handpicked video lectures, practice links, and books
- 🆓 **100% Free** - Open source and free to use forever

---

## ✨ Features

### 📚 Learning System
| Feature | Description |
|---------|-------------|
| 📖 **11 Subjects** | Complete GATE CSE syllabus coverage |
| 🗺️ **18-Month Roadmap** | Structured 5-phase preparation plan |
| 📝 **200+ Topics** | Detailed breakdown with subtopics |
| 🔗 **400+ Resources** | Curated videos, articles, and tools |
| ✅ **Topic Tracking** | Mark topics as complete |
| 🔖 **Bookmarks** | Save important topics |

### 🎮 Gamification
| Feature | Description |
|---------|-------------|
| ⭐ **XP System** | Earn experience points for activities |
| 📈 **Level Up** | Progress through levels (500 XP each) |
| 🏅 **10 Badges** | Unlock achievements |
| 🔥 **Daily Streaks** | Track consecutive study days |
| 💰 **Coin Currency** | Earn and spend coins |
| ⚡ **Power-Ups** | Hints, Skips, and 2x XP |
| 🎯 **Daily Challenges** | Daily missions with bonus rewards |
| 🏆 **Leaderboard** | Compete with other aspirants |
| 🔢 **Combo System** | Consecutive correct answers multiply rewards |

### 📝 Practice System
| Feature | Description |
|---------|-------------|
| ❓ **90+ Questions** | Topic-wise quiz questions |
| ⏱️ **Timed Quizzes** | Build exam temperament |
| 📊 **Score Tracking** | Performance history |
| 💡 **Explanations** | Detailed answer explanations |
| 🎯 **Difficulty Levels** | Easy, Medium, Hard questions |

### 🎨 UI/UX
| Feature | Description |
|---------|-------------|
| 🌙 **Dark/Light Mode** | Eye-friendly themes |
| 📱 **Responsive Design** | Works on all devices |
| ✨ **Smooth Animations** | Framer Motion animations |
| 🎉 **Confetti Effects** | Celebration animations |
| 🔔 **Toast Notifications** | Real-time feedback |
| 🔍 **Search & Filter** | Find resources quickly |

### 🔧 Technical
| Feature | Description |
|---------|-------------|
| 💾 **Persistent Storage** | Progress saved locally |
| 🛡️ **Error Boundary** | Graceful error handling |
| 🔒 **Type Safety** | Full TypeScript |
| 🌐 **SEO Optimized** | Meta tags and Schema.org |

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | Animations |
| ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=react&logoColor=white) | State Management |
| ![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=flat-square&logo=lucide&logoColor=white) | Icons |

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ or **yarn** 1.22+ or **pnpm** 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gate-2027-mastery.git
   cd gate-2027-mastery
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
gate-2027-mastery/
├── 📁 public/
│   └── favicon.svg
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ErrorBoundary/
│   │   │   └── ErrorBoundary.tsx
│   │   ├── 📁 Gamification/
│   │   │   ├── CoinDisplay.tsx
│   │   │   ├── DailyChallenge.tsx
│   │   │   └── Leaderboard.tsx
│   │   ├── 📁 Home/
│   │   │   └── HeroSection.tsx
│   │   ├── 📁 Layout/
│   │   │   └── Navbar.tsx
│   │   ├── 📁 Progress/
│   │   │   └── ProgressView.tsx
│   │   ├── 📁 Quiz/
│   │   │   └── QuizView.tsx
│   │   ├── 📁 Resources/
│   │   │   └── ResourcesView.tsx
│   │   ├── 📁 Roadmap/
│   │   │   └── RoadmapView.tsx
│   │   ├── 📁 Subjects/
│   │   │   └── SubjectsView.tsx
│   │   ├── 📁 Toast/
│   │   │   └── ToastProvider.tsx
│   │   └── 📁 Welcome/
│   │       └── WelcomeModal.tsx
│   ├── 📁 data/
│   │   └── gateData.ts          # All subjects, topics, quizzes, resources
│   ├── 📁 store/
│   │   └── useStore.ts          # Zustand state management
│   ├── App.tsx                   # Main application
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🌐 Free Hosting Guide

You can host this application for **FREE** on several platforms. Here are step-by-step guides:

---

### 🔺 Option 1: Vercel (Recommended)

**Best for:** Fastest deployment, automatic HTTPS, global CDN

<details>
<summary>📖 Click to expand Vercel deployment guide</summary>

#### Method A: Deploy via GitHub (Easiest)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/gate-2027-mastery.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **"Sign Up"** → Sign in with GitHub
   - Click **"Add New Project"**
   - Import your `gate-2027-mastery` repository
   - Click **"Deploy"**

3. **Done!** 🎉
   - Your site is live at: `https://gate-2027-mastery.vercel.app`
   - Every push to `main` auto-deploys

#### Method B: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

</details>

---

### 🔷 Option 2: Netlify

**Best for:** Easy drag-and-drop, form handling, serverless functions

<details>
<summary>📖 Click to expand Netlify deployment guide</summary>

#### Method A: Deploy via GitHub

1. **Push code to GitHub** (same as Vercel step 1)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click **"Sign Up"** → Sign in with GitHub
   - Click **"Add new site"** → **"Import an existing project"**
   - Select your repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click **"Deploy site"**

3. **Done!** 🎉
   - Your site is live at: `https://random-name.netlify.app`
   - Click **"Domain settings"** to customize URL

#### Method B: Drag and Drop

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Drag and drop**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag your `dist` folder to the drop zone

3. **Done!** 🎉

#### Method C: Deploy via CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

</details>

---

### 🟠 Option 3: Cloudflare Pages

**Best for:** Fastest global CDN, unlimited bandwidth, DDoS protection

<details>
<summary>📖 Click to expand Cloudflare Pages deployment guide</summary>

#### Deploy via GitHub

1. **Push code to GitHub** (same as above)

2. **Connect to Cloudflare Pages**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click **"Sign Up"** → Create account or sign in
   - Click **"Create a project"** → **"Connect to Git"**
   - Select your repository
   - Configure build settings:
     - **Framework preset:** `Vite`
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
   - Click **"Save and Deploy"**

3. **Done!** 🎉
   - Your site is live at: `https://gate-2027-mastery.pages.dev`

#### Deploy via CLI

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

</details>

---

### ⬛ Option 4: GitHub Pages

**Best for:** Hosting directly from GitHub repository

<details>
<summary>📖 Click to expand GitHub Pages deployment guide</summary>

#### Setup GitHub Pages

1. **Update `vite.config.ts`**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/gate-2027-mastery/', // Your repo name
   })
   ```

2. **Create GitHub Action**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: ['main']

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Setup Pages
           uses: actions/configure-pages@v4
           
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"**

4. **Push changes**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push
   ```

5. **Done!** 🎉
   - Your site is live at: `https://yourusername.github.io/gate-2027-mastery/`

</details>

---

### 🚂 Option 5: Railway

**Best for:** Backend-ready hosting with database support

<details>
<summary>📖 Click to expand Railway deployment guide</summary>

1. **Go to Railway**
   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create new project**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your repository

3. **Configure settings**
   - Railway auto-detects Vite
   - Build command: `npm run build`
   - Start command: `npx serve dist`

4. **Generate domain**
   - Go to **Settings** → **Generate Domain**

5. **Done!** 🎉

</details>

---

### 📊 Hosting Comparison

| Platform | Free Tier | Bandwidth | Build Minutes | Custom Domain | SSL |
|----------|-----------|-----------|---------------|---------------|-----|
| **Vercel** | ✅ Unlimited sites | 100 GB/month | 6000/month | ✅ Free | ✅ Auto |
| **Netlify** | ✅ Unlimited sites | 100 GB/month | 300/month | ✅ Free | ✅ Auto |
| **Cloudflare** | ✅ Unlimited sites | Unlimited | 500/month | ✅ Free | ✅ Auto |
| **GitHub Pages** | ✅ Unlimited | 100 GB/month | 2000/month | ✅ Free | ✅ Auto |
| **Railway** | $5 credit | 100 GB | Unlimited | ✅ Free | ✅ Auto |

### 🏆 Recommendation

For this project, I recommend **Vercel** or **Cloudflare Pages** because:
- ⚡ Fastest global CDN
- 🔄 Automatic deployments on git push
- 🔒 Free SSL certificates
- 🌍 Edge network for low latency
- 📊 Built-in analytics
- 💰 Generous free tier

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/gate-2027-mastery.git
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make your changes**
   ```bash
   # Edit files, add features, fix bugs
   ```

5. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Go to your fork on GitHub
   - Click **"Compare & pull request"**
   - Describe your changes
   - Submit the PR

### Contribution Ideas

- 📝 Add more quiz questions
- 🔗 Add more resource links
- 🌍 Add language translations
- 🐛 Fix bugs
- 📱 Improve mobile experience
- ♿ Improve accessibility
- 📊 Add analytics dashboard
- 🔔 Add notification features
- 📚 Add more subjects/topics

### Code Style

- Follow existing code patterns
- Use TypeScript strictly
- Write meaningful commit messages
- Test your changes locally
- Ensure build passes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 GATE 2027 Mastery

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 💖 Support

If you find this project helpful, please consider:

- ⭐ **Star this repository** - It helps others discover the project
- 🍴 **Fork and contribute** - Add features or fix bugs
- 📢 **Share with friends** - Help fellow GATE aspirants
- 🐛 **Report bugs** - Help us improve
- 💡 **Suggest features** - We'd love to hear your ideas

### Connect

- 📧 Email: [your-email@example.com](mailto:your-email@example.com)
- 🐦 Twitter: [@yourusername](https://twitter.com/yourusername)
- 💼 LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

---

## 🙏 Acknowledgments

- [Gate Smashers](https://www.youtube.com/@GateSmashers) - Video lectures
- [GATE Overflow](https://gateoverflow.in) - Previous year questions
- [GeeksforGeeks](https://www.geeksforgeeks.org) - Practice problems
- [Abdul Bari](https://www.youtube.com/@abdul_bari) - Algorithm tutorials
- [Neso Academy](https://www.youtube.com/@nesoacademy) - Concept videos
- All the amazing educators making GATE preparation accessible

---

<div align="center">

### Made with ❤️ for the GATE Community

**Your journey to AIR 1 starts here! 🚀**

⭐ Star this repo if you find it helpful! ⭐

</div>

