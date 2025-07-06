# 🧠 SkillSync – Empowering Developers to Connect, Grow, and Build

[![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748?logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

**SkillSync** is an AI-powered platform that streamlines collaboration, career growth, and learning for developers. Centralize your journey of leveling up skills, discovering projects, and contributing to open-source/startup initiatives.

> **Beyond resumes – build your developer identity**

---

## 🚀 Key Use Cases

- **Upgrade Your Skill Set**: Track and showcase evolving skills with personalized project suggestions
- **Explore Projects**: Discover open-source/startup projects seeking collaborators
- **Take AI Skill Tests**: Benchmark abilities with AI-powered assessments
- **Build Portfolio**: Contribute to real-world work and showcase contributions
---

## ✨ Key Features

| Feature                 | Description                                       |
|-------------------------|---------------------------------------------------|
| **Modern Architecture** | Next.js App Router for file-based routing         |
| **Responsive UI**       | TailwindCSS + Lucide React Icons                  |                
| **AI Integration**      | LLM-powered assessments & project recommendations |
| **Dynamic Onboarding**  | Modal-driven skill/resume capture                 |
| **Data Management**     | PostgreSQL + Prisma ORM                           |
| **Authentication**      | Secure JWT-based sessions                         |


## 🛠️ Installation

### Prerequisites
- Node.js v18+
- PostgreSQL database
- HuggingFace API key (for AI features)

### Setup
1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/skillsync.git
   cd skillsync

2. **Install dependencies**
    ```bash
    npm install

3. **Configure environment**
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/skillsync"
   JWT_SECRET="your_secure_secret_here"
   HUGGINGFACE_API_KEY="your_hf_api_key"

4. **Initialize database**
    ```bash
    npx prisma migrate dev --name init

5. **Start development server**
    ```bash
    npm run dev
Visit http://localhost:3000

## 🔄 User Workflow
<img width="297" alt="image" src="https://github.com/user-attachments/assets/ae99c679-bda2-48b7-9d54-e8de26932934" />


## 🧱 Tech Stack

### Frontend
Next.js 14 (App Router)
React 18
Tailwind CSS
Lucide React Icons
Shadcn UI Components

### Backend
Next.js API Routes
Prisma ORM
PostgreSQL

### AI Services
HuggingFace Transformers
Custom recommendation algorithms

## 💡 Why This Works
- In the scattered tech landscape of 2025, SkillSync acts as a personalized growth hub for developers:
- Consolidates your growth journey across learning, project building, and skill validation.
- Makes skill-building tangible through real-world projects and AI feedback.
- Proves your credibility by tracking and showcasing active contributions and verified skills.

## 🔮 Changes for The Future

- **Team Builder**: Find collaborators with complementary skills
- **Job Matcher**: Curated opportunities from partner companies
- **Skill Badges**: Verifiable credentials for proven skills
- **Community Hub**: Developer forums and knowledge sharing
- **Analytics Dashboard**: Contribution metrics and skill growth tracking
