# 🚀 TaskFlow - Modern Kanban Board

TaskFlow is a high-performance, visually stunning Kanban board application built with **Next.js 15 (App Router)**, **React**, and **TypeScript**. It leverages a feature-driven architecture to deliver a seamless, state-of-the-art task management experience inspired by tools like Linear and Trello.

---

## ✨ Key Features

- **Advanced Drag and Drop:** Smooth, accessible animations powered by `@dnd-kit/core` and `@dnd-kit/sortable` with persistent `DragOverlay`.
- **Combinatorial Filtering:** Real-time task filtering via text search and priority status (`URGENT`, `HIGH`, `MEDIUM`, `LOW`) executed concurrently without lag.
- **Robust State Management:** Lightweight, decoupled, and fast client-side state using **Zustand** with automated `localStorage` state persistence.
- **Form Validation:** Strict, type-safe schema validation for task creation and editing via **React Hook Form** and **Zod**.
- **Modern UI/UX:** Modular, atomic interfaces styled with **Tailwind CSS** and customized **Shadcn/UI** design tokens, rendering the beautiful **Geist** font.
- **Next-Level Optimization:** Zero server-client mismatch errors through dynamic client-side splitting using Next.js `Suspense`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **State Manager:** Zustand (with Persist Middleware)
- **Drag & Drop:** `@dnd-kit`
- **Forms & Validation:** React Hook Form + Zod Resolver
- **Styling & UI:** Tailwind CSS, Shadcn/UI, Lucide React
- **Language:** TypeScript

---

## 📂 Project Architecture

The project follows a scalable **Feature-Driven Architecture**, isolating the task board's core business logic from global configurations:

```text
src/
├── app/                  # Next.js App Router (Routing & Group Layouts)
│   ├── (dashboard)/      # Protected workspace layout group
│   └── globals.css       # Global styles & Tailwind layers
├── components/           # Shared UI atoms (Shadcn/UI primitives)
│   └── ui/               # Button, Badge, Card, etc.
├── features/             # Feature-based modular structure
│   └── tasks/            # Isolated Task Board domain
│       ├── components/   # TaskBoard, TaskColumn, TaskCard, TaskSidebar
│       ├── schema/       # Zod validation schemas
│       ├── store/        # Zustand state definitions
│       └── types/        # TypeScript interfaces
└── lib/                  # Shared utility functions (cn, etc.)

```

🚀 Getting Started
Follow these steps to run the project locally:

1. Clone the repository
Bash
git clone [https://github.com/your-username/pro-task.git](https://github.com/your-username/pro-task.git)
cd pro-task
2. Install dependencies
Bash
npm install
3. Run the development server
Bash
npm run dev
Open http://localhost:3000 in your browser to see the live application.
