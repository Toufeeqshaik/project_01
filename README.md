# PulseAI - Altrix Labs Edition | AI Health Copilot

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20Tailwind-blue)](http://localhost:5173)
[![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20Node.js-green)](http://localhost:3001)
[![AI](https://img.shields.io/badge/AI-Groq%20LLM%20%2B%20PubMed-emerald)](https://groq.com)

**PulseAI** is a clinical-grade health copilot web application.
- 🌙 **Dark Jet-Black (#0A0A0A) & Kinetic Emerald (#00D26A)** aesthetic design
- 📊 **Interactive Bento Grid Dashboard** with live vitals, clinical metrics, anomaly tracking & appointments
- 🤖 **Floating AI Copilot** powered by high-speed Groq LLM inference with automated fallback models and PubMed research lookup
- 💊 **Medication & Drug Intelligence** backed by RxNorm and FDA APIs
- 🗄️ **Supabase Integration** ready for persistent health logs and records

---

## 🖥️ How the Application Works & How to View

| Component | Port | Description |
|---|---|---|
| **Frontend UI (Dashboard & Chat)** | `http://localhost:5173` | 👉 **Open this in your browser** to view the full visual dashboard and interact with the AI copilot! |
| **Backend API Server** | `http://localhost:3001` | Express REST API handling Groq AI inference, PubMed, and medical endpoints. |

> 💡 **Notice:** `http://localhost:3001` is the backend REST API server (visiting it will show the API status page). To view and interact with the visual web interface, navigate to **`http://localhost:5173`**.

---

## 🔑 API Keys Configuration

**Backend `.env` File Location**: `health-copilot/backend/.env`

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=gsk_your_groq_api_key
GROQ_BASE_URL=https://api.groq.com/openai/v1
PORT=3001
NODE_ENV=development
```

✅ **Verification**: Backend tested and running successfully

---

## 🚀 How to Run

### Start Backend
```bash
cd d:\HACXLERATE_01\health-copilot\backend
npm start
```

### Start Frontend (Development)
```bash
cd d:\HACXLERATE_01\health-copilot
npm run dev
```

### Build for Production
```bash
npm run build
# Output: dist/ folder ready for Vercel
```

---

## 📂 Key Files Created/Updated

- ✅ `backend/.env` - API keys configured
- ✅ `backend/server.js` - Express server
- ✅ `backend/supabase.js` - Supabase client
- ✅ `backend/routes/chat.js` - Groq + PubMed integration
- ✅ `backend/routes/health.js` - Dashboard metrics
- ✅ `backend/routes/medications.js` - RxNorm + FDA
- ✅ `src/components/DashboardBento.tsx` - UI grid layout
- ✅ `src/components/CopilotFloating.tsx` - AI chat
- ✅ `dist/` - Production build ready for deployment

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | API Server Status & Frontend Link |
| `/api/health/metrics` | GET | Dashboard vitals & clinical metrics |
| `/api/health/records` | GET | Lab reports & medical records |
| `/api/chat` | POST | Groq AI clinical chat + PubMed lookup |
| `/api/chat/send` | POST | Alias for `/api/chat` |
| `/api/medications` | GET | Drug info (RxNorm / FDA) |

---

## 📊 Build Status

**Frontend**: ✅ Built successfully (React 18, TypeScript, Tailwind)
**Backend**: ✅ Running on http://localhost:3001
**TypeScript**: ✅ 0 errors

---

## 🌐 Free APIs Integrated

- **Groq AI** - Ultra-fast LLM inference (`openai/gpt-oss-120b`, `qwen/qwen3.8-27b`, `openai/gpt-oss-20b`)
- **PubMed** - Medical research & clinical paper references
- **RxNorm** - Drug information database
- **FDA** - Drug safety data
- **Supabase** - PostgreSQL database

---

## 🎯 Deployment & Cloud Hosting

### Live Serverless Deployment on Vercel
The project is configured for **1-Click Fullstack Deployment on Vercel** using native ESM Serverless Functions located in the `/api` directory:
- `api/chat.js` &rarr; `POST /api/chat` (Groq LLM AI inference with PubMed research enrichment)
- `api/health/metrics.js` &rarr; `GET /api/health/metrics` (Vitals & clinical analysis)
- `api/medications.js` &rarr; `GET /api/medications` (RxNorm & FDA live safety feeds)
- `api/index.js` &rarr; `GET /api` (Serverless health status)

#### Open Public Testing on Vercel:
1. Under **Settings &rarr; Deployment Protection**, set **Vercel Authentication** to **Disabled** to make all test links publicly accessible without login.
2. Under **Settings &rarr; Environment Variables**, add `GROQ_API_KEY` for live AI chat inference.
3. Link your GitHub repository (`Toufeeqshaik/project_01`) under **Settings &rarr; Git** for automatic deployments on push.

---

## 📱 Multi-Device & Mobile LAN Testing
The application uses relative `/api` paths and Vite proxy routing. Any device on the same local network can test the full app:
```bash
npm run dev -- --host 0.0.0.0
# Access from mobile: http://<YOUR_LOCAL_IP>:5173
```
