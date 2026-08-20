# 🌌 Creative Engineering & Systems Architecture

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3174F0?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Verified_by-Playwright-2EAD33?logo=playwright&style=flat-square)](https://playwright.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-8866FF?style=flat-square)](https://greensock.com/gsap/)

A high-fidelity, mathematically verified portfolio designed to demonstrate the intersection of **Creative Engineering** and **Systems Architecture**. Built with an obsession for performance, type-safety, and verifiable reliability.

**[Explore the Production Deployment](https://my-portfolio-d7jf.vercel.app/)** 🌐

---

## 🏗️ Architectural Blueprint

This project is engineered as a high-performance single-page application (SPA) leveraging the latest concurrent features of React 19 and the next-generation Tailwind 4 engine.

### 🔬 Stack
- **Core:** React 19 (Concurrent Rendering) + TypeScript (Advanced Type Engineering)
- **Creative:** Three.js (WebGL) + GSAP (High-precision interpolation)
- **Verification:** Playwright (End-to-End Testing Suite)
- **Architecture:** Component-driven, atomic UI design based on Radix UI primitives.
- **Optimization:** ImageKit Edge delivery + GPU-accelerated animations (`will-change`, `translateZ(0)`).

---

## 🛠️ Engineering Rigor

### 🎭 End-to-End Verification (Playwright)
Unlike standard portfolios, this codebase is **mathematically verified**. I have implemented a rigorous E2E testing suite that validates:
- **Critical Path Rendering:** Verifying WebGL context initialization and R3F frameloop status.
- **Navigation Integrity:** Validating GSAP `ScrollTrigger` pin/scrub logic and routing.
- **Data Fidelity:** Ensuring the "Technical Matrix" correctly maps complex skill datasets.
- **Responsive Adaptability:** Automated testing across Chromium, Firefox, and WebKit (Safari).

### ⚡ Performance Optimization
- **R3F Lifecycle Management:** Manual control over the `frameloop` to pause WebGL rendering when elements are outside the viewport.
- **DPR Capping:** Dynamic Device Pixel Ratio management to prevent GPU thermal throttling on high-resolution displays.
- **Memoization Strategy:** Aggressive use of `React.memo`, `useMemo`, and `useCallback` to achieve a consistent 60FPS during complex scroll interpolations.

---

## 🏆 Selected Impact & Achievements

- **🥇 UDBHAV 2025 Winner:** Engineered *Apuni Sarkar*, an AI-orchestrated government services platform. 
- **💼 Creative SaaS Engineering:** Shipped high-impact features and performance audits for *Rebooked*, focusing on conversion optimization and technical debt reduction.
- **🔍 Technical Audit:** Contracted by Kumaun University to perform a comprehensive bug audit of their official infrastructure (`kunainital.ac.in`).

---

## 🧰 The Matrix

| Layer | Technologies |
| :--- | :--- |
| **Creative Front** | React 19, Three.js, GSAP, Tailwind 4, Framer Motion |
| **Systems Back** | Node.js (Microservices), Express, Python, REST/WebSocket |
| **Persistence** | MongoDB (Change Streams), PostgreSQL, Redis |
| **Intelligence** | LLM Orchestration (Gemini/GPT), Vector DBs, RAG Workflows |
| **Verification** | Playwright, ESLint (Strict), TypeScript (No-Implicit-Any) |

---

## ⚙️ Development & Verification

### Initialize Environment
```bash
git clone https://github.com/Aman-Bam/My_Portfolio.git
npm install
```

### Verification Suite
```bash
# Run full E2E test suite
npm run test:e2e

# Open interactive test runner
npm run test:e2e:ui
```

### Deployment Build
```bash
npm run build
```

---

## 📬 Protocol established.

- **GitHub:** [@Aman-Bam](https://github.com/Aman-Bam)
- **LinkedIn:** [Aman BAM](https://www.linkedin.com/in/aman-bam/)
- **Terminal:** `amanbam604@gmail.com`

---
*Engineered for the next generation of the web.*
