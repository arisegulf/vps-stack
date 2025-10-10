# Imran Shaikh - Master Context File
**Last Updated:** 05-Oct-2025  
**Purpose:** Single source of truth for all AI mentor conversations

---

## 🎯 Current Mission (Next 30 Days)
**PRIMARY GOAL:** Launch Whatsapp Buddy with 1 paying customer

**Success Criteria:**
- [ ] 1 confirmed paying customer (₹5,000 setup + ₹999/month)
- [ ] Product 100% stable and documented
- [ ] Can confidently demo to strangers

**Weekly Milestones:**
- **Week 1 (Oct 6-12):** Stress test + documentation + friend trial
- **Week 2 (Oct 13-19):** Landing page + payment setup + first demo
- **Week 3 (Oct 20-26):** First paying customer onboarded
- **Week 4 (Oct 27-Nov 2):** Stabilize + learnings documented

---

## 👤 Personal Context

**Name:** Imran Shaikh  
**Age:** 40+  
**Location:** Bhilai/Dewas, Madhya Pradesh (currently Bhilai, open to global relocation)  
**Background:** 20+ years telecom (ex-Senior Engineer at Essjay Ericsson, Alcatel-Lucent, Reliance)
- **Education:** MBA (IT & Marketing), 3-Year Engineering Diploma (Electronics & Telecommunication)
- **Certifications:** Google Project Management Professional (2025), Ericsson Certificate of Excellence (2017)

**Current Situation:**
- Running Arise Enterprises (telecom contractor for A2Z Infra & RK Technosmart)
- Transitioning to AI business (Arisegulf)
- **Critical Challenge:** A2Z payment delays (₹38 lakh+ pending, 2-year-old CWOs unresolved)
- **Financial Pressure:** High (survival mode)

**Family Team:**
- **Gulfisha Tarannum** (Wife): MCA, Finance Manager (GST, billing). Google IT Support cert in progress. UAE job search active.
- **Ada Shaikh** (Elder daughter, 13): Class 8, n8n apprentice. Learning only, NOT for production.
- **Alina Shaikh** (Younger daughter, 6): Class 2, learning English & Arabic.
- **Soniya** (Sister-in-law): AutoCAD/KMZ expert, transitioning to AI content work.
- **Sahil** (Supervisor): Field manager. Inconsistent performance, needs backup identified.

**Note:** For detailed family/team profiles, see `Family_Team_Context.md`

**Philosophy:**
- "Dog Feeding Approach" - Build for self first, then productize
- Focus on working solutions, not mastery
- Free/open-source tools preferred (budget constraints)

---

## 💼 Business Structure

### Arise Enterprises (Telecom)
**Status:** Active but bleeding cash  
**Clients:** 
- **A2Z Infra:** Primary client (FTTH projects for Airtel)
- **RK Technosmart (via Shristi Enterprise/Ranjeet):** Secondary client (faster payment, lower margins)

**Revenue Reality:**
- A2Z bills submitted: ₹48+ lakh
- Payments received: ₹38 lakh (total lifetime)
- Outstanding: ₹38+ lakh
- Last payment: Aug 2025 (₹2.1 lakh GST only)
- **6+ CWOs pending closure for 2 years**

**Time Investment:** 60-70% (needs to reduce)

**Pending A2Z Site Closures (Action Required):**
- CWO-10057 (WIMS Tarun Bazaar): Pending 2 years
- CWO-5003/1 (80% HPs not completed): Pending 2 years
- RSS 55391/1: Closure pending, rectified twice
- RBB CWO-55378/1: Closure pending, rectified twice
- CWO-84222/2 (Refilling Raipur): Field work done, pending A2Z internal team
- CWO-91144/1 (Jawahar Nagar): 2 of 4 ODFs RFS done

### Arisegulf (AI Agency)
**Status:** Infrastructure 90% ready, Product 10% ready  
**Revenue:** ₹0  
**Clients:** 0  
**Time Investment:** 30-40% (needs to increase)

**Domain Assets:**
- arisegulf.com (WordPress - decommissioned to save resources, planned React rebuild)
- dearzindagi.space
- islam.dearzindagi.space

**Social Media Profiles:**
- **X (Twitter):** https://x.com/ShaikhIraa51648 (Email: iraa.shaikh8@gmail.com)
- **Instagram:** https://www.instagram.com/arisegulf_tech/
- **Facebook:** https://www.facebook.com/imran.shaikh.3557440 (Email: Imran.alcatel1@gmail.com)
- **LinkedIn:** https://www.linkedin.com/in/imran-shaikh-contactme/
- **GitHub:** https://github.com/arisegulf

---

## 🛠️ Technical Infrastructure

### VPS: Hostinger Production Environment
**IP:** 193.203.161.27  
**Location:** `/root/my_project/`  
**Setup:** Professional Docker Compose environment with Git version control

**Live Services:**
- `nginx-proxy` (reverse proxy + SSL)
- `n8n` (workflow automation) - n8n.arisegulf.com
- `baserow` (database) - baserow.arisegulf.com:8000
- `evolution-api` (WhatsApp gateway) - evolution.arisegulf.com
- `postgres` (PostgreSQL for Evolution API)
- `redis` (caching for Evolution API)
- `flowise`, `memos`, `qdrant`, `streamlit-app`

**Decommissioned Services (To Save Resources):**
- All WordPress sites (arisegulf-web, blog-web, dearzindagi-web, islam-web)
- Main MySQL database
- Metabase
- shrtn (link shortener)

### Local Development Environment
**Location:** `D:\ai-stack\`  
**Core Command:** `docker-compose -f docker-compose.local.yml up -d`

**Local Services:**
- `qdrant-local` (vector database) - localhost:6333
- `rag-service-local` (embedding API) - localhost:8000
- `retrieval-api-local` - localhost:8001
- `n8n-local` - localhost:5678
- `flowise-local` - localhost:3001
- `gotenberg-local` (PDF generation) - localhost:3002
- `coqui-api-local` (TTS) - localhost:8080
- `whisper-api-local` (ASR) - localhost:9000
- `loveable-frontend-local` (Streamlit) - localhost:8501
- `memos-local` - localhost:5230
- `ngrok-local` - localhost:4040
- `ollama` - localhost:11434
- `GPT-SoVITS` - localhost:9874

**Key Documentation Files:**
- `D:\ai-stack\imran_docs\local_docker_tools_manual.md`
- `D:\ai-stack\imran_docs\vps_docker_tools_manual.md`
- `D:\ai-stack\imran_docs\Arise_Operations_Manual.md`

**Key Skills:**
- Docker, Git, n8n, Baserow, Python (FastAPI), API Integration, RAG Systems (Qdrant)
- Intermediate level - Can setup and manage, not deep troubleshooting expert

---

## 🚀 Products & Projects

### 1. Whatsapp Buddy (PRIORITY - 100% Focus)
**Current Status:** Basic version working, NOT production-ready  
**Confidence Level:** 40%

**Stack:**
- n8n (workflow orchestration)
- Evolution API (WhatsApp gateway)
- OpenAI GPT-4o-mini (AI model)
- Baserow (database)
- Perplexity AI (web search)
- Wikipedia, Calculator tools
- Memory system (conversation context)

**Current Features:**
- AI chatbot with GPT-4o-mini
- Web search via Perplexity
- Wikipedia knowledge
- Calculator
- Baserow data integration
- Conversation memory

**Target Market (Proposed):**
- Small local shops (kirana, medical, salons) in Dewas/Indore
- Use case: Order management, billing reminders, inventory alerts, customer queries (Hindi + English)

**Pricing (Proposed):**
- Setup: ₹5,000 (one-time)
- Monthly: ₹999/shop
- Target: 10 shops = ₹10,000/month recurring

**CRITICAL GAPS:**
- [ ] Not stress-tested with real users
- [ ] No setup guide documentation
- [ ] No troubleshooting procedures
- [ ] No backup/recovery procedures tested
- [ ] No demo video
- [ ] Landing page missing
- [ ] Payment integration not done

**n8n Workflow File:** `Whatsapp Buddy FREE (1).json` (attached in documents)

### 2. Project Fusion (Arise Operations Engine)
**Purpose:** Internal operations management for Arise Enterprises  
**Status:** Database structure ready in Airtable, automation pending  
**Future Vision:** Mini-SaaS for other contractors (₹2,500/month per contractor)

**Stack:** Baserow + n8n  
**Database Location:** Baserow on VPS (baserow.arisegulf.com)

**Key Features (Planned):**
- Vendor/team management
- Bill tracking (line items, automated totals)
- Payment tracking
- Project/site management
- Photo management (Tally.so + n8n + EXIF extraction + ImageMagick)
- KML/KMZ data extraction

**Win-Win Philosophy:**
- For team: Synchronized, professional, stress-free work
- For vendors: Solve their problems (billing, payments)
- For clients: Efficiency and transparency
- For brand: Case study for Arisegulf

### 3. IRAA Companion Project
**Status:** Planning/early development  
**Purpose:** Custom AI assistant with personalized knowledge base using RAG  
**Stack:** FastAPI, Qdrant, Docker  
**Project Directory:** `D:\ai-stack\imran_docs\Iraa Project`

### 4. Model Context Protocol (MCP) Server
**Status:** Architecture phase  
**Purpose:** Central "memory hub" for AI tools and agents

---

## 💰 Financial Reality & Goals

**Monthly Survival Need:** ~₹50,000  
**Current AI Revenue:** ₹0  

**90-Day Revenue Goals:**

**Month 1 (Oct 2025): Survive**
- A2Z payment 50% recovered (aggressive follow-up)
- 2 freelance projects (Upwork/Fiverr: $15-25/hour)
- Whatsapp Buddy: 3 local pilots (free/discounted)
- Target: ₹15-20k from freelance

**Month 2 (Nov 2025): Stabilize**
- ₹15-20k recurring (Whatsapp Buddy + freelance)
- Project Fusion MVP live
- 1 contractor demo for Project Fusion
- Target: ₹20-30k total

**Month 3 (Dec 2025): Scale**
- 10 Whatsapp Buddy clients = ₹10k recurring
- 3 Project Fusion contractors = ₹7.5k recurring
- Freelance = ₹10-15k
- Ada's first guaranteed client project completed
- **Target: ₹40-50k/month recurring**

---

## 📋 Current Action Items & Status

### Immediate (This Week - Oct 6-12):
- [ ] Whatsapp Buddy stress test (with Ada/Gulfisha's phones)
- [ ] Setup guide documentation (step-by-step)
- [ ] Backup/recovery procedures tested
- [ ] Friend trial (Ranjeet from RK Technosmart)
- [ ] Deliberately break the system and fix it

### Short-term (Week 2-4):
- [ ] Landing page (single page on arisegulf.com)
- [ ] Razorpay payment integration + KYC
- [ ] GST-compliant invoice template (Gulfisha)
- [ ] Demo video (2-3 minutes)
- [ ] First paying customer onboarded

### Medium-term (30-60 Days):
- [ ] Freelancing profiles setup (Upwork, Fiverr, Naukri Gulf, We Work Remotely)
- [ ] 3-5 active Whatsapp Buddy customers
- [ ] Project Fusion MVP operational
- [ ] Alternative income streams established

### Strategic (60-90 Days):
- [ ] Reduce A2Z dependency by 50%
- [ ] Establish recurring revenue base
- [ ] Team roles clarified (Ada learning, not production)
- [ ] Sahil backup identified

---

## 🎓 Skills & Tools Inventory

**Primary (Functional Level):**
- n8n (Advanced workflow automation)
- Baserow/Airtable (Database design)
- Docker & Docker Compose (Container management)
- Git/GitHub (Version control)
- Nginx (Reverse proxy configuration)
- Python/FastAPI (Basic API development)
- Evolution API (WhatsApp integration)
- OpenAI API, Perplexity API
- ClickUp (Project management)

**Secondary (Familiar/Learning):**
- Zapier, Power Automate
- Flowise (Visual AI builder)
- Qdrant (Vector database)
- RAG systems architecture
- Jira, Trello, MS Project
- Google Analytics, Power BI

**API Keys & Subscriptions:**
- OpenAI API (purchased)
- Perplexity Pro (active)
- Evolution API (self-hosted)
- Various free tier services

---

## 🚨 Critical Decisions & Constraints

**Decisions Made:**
1. **Focus:** One product (Whatsapp Buddy) for next 30 days - NO EXCEPTIONS
2. **No new infrastructure:** Use what's already built
3. **No website redesign:** Postponed (WordPress decommissioned, React rebuild later)
4. **Client approach:** Local shops, personal demos first
5. **Ada's role:** Learning only, NOT production-critical systems
6. **A2Z strategy:** Aggressive follow-up + legal notice preparation + reduce dependency
7. **Baserow adoption:** Long-term database solution (replacing Airtable eventually)

**Known Constraints:**
1. **Cash flow crisis:** A2Z payments severely delayed
2. **Resource overload:** Imran juggling multiple roles
3. **Team limitations:** Ada is 13 (student), Sahil inconsistent
4. **Tool expertise gap:** Functional but not deep knowledge
5. **Infrastructure > Implementation:** Built too much, delivered too little
6. **Spread too thin:** 5+ projects simultaneously (needs focus)

**Hard Rules:**
- Master Context File gets updated weekly
- No new projects until Whatsapp Buddy has 1 paying customer
- Infrastructure changes only if critical/blocking
- Every tool must justify its server cost with revenue potential

---

## 📊 Job Search & Freelancing Strategy

### Multi-Profile Strategy:
1. **Imran Shaikh:** AI-Driven Project Manager roles (LinkedIn, Upwork, We Work Remotely)
2. **Gulfisha Tarannum:** Finance/Accounts/Operations (UAE focus, Google IT Support cert in progress)
3. **Arise Gulf (Agency):** AI agency work, client acquisition
4. **Arise Enterprises:** Traditional telecom work
5. **Iraa Shaikh (Virtual Brand):** Social media/marketing for Arisegulf

### Recent Applications:
**Persona (Assistant Project Manager) - Applied 25 Aug 2025**
- Resume: `Imran_Shaikh_Resume_Final.pdf`
- ATS Score: 100% (Jobscan.co)
- Expected Salary: $50,000/year
- Work: Remote, Full-time, Evening/Night shift (US hours)

### Upwork/Freelancing Strategy:
**Phase 1:** Build agency profile + portfolio (2-3 pieces)
**Phase 2:** "Icebreaker offers" for first 2-3 clients (focus on reviews)
**Phase 3:** Turn one-time projects into long-term relationships

**Portfolio Ready:**
- Instagram Lead Generation workflow
- Social Media Post Creator
- (Need to document properly)

---

## 🧠 Mental Model & Working Style

**Strengths:**
- Survivor mentality (20 years telecom, survived pandemic job loss)
- Technical foundation solid (Docker, Git, n8n, VPS management)
- Family team support (unique advantage)
- Real problem-solving focus (building for self first)
- Google Certified Project Manager
- Ericsson Certificate of Excellence

**Weaknesses (Self-Identified):**
- Infrastructure > Implementation (built railway track, no train running)
- Confidence gap (not 100% sure product is production-ready)
- Spread thin (multiple projects, lack of focus)
- Tool knowledge: Functional but not expert-level
- Telecom work draining 60-70% time/energy

**Working Philosophy:**
- "Dog Feeding" approach: Build for self, then sell
- Practical solutions > perfect solutions
- Learn by doing, not by theory
- Budget-conscious (free/open-source first)
- Family-first values

**Communication Preferences:**
- Hinglish (Hindi + English mix)
- Direct and concise, no fluff
- Honest feedback (even if harsh)
- Action-oriented advice
- Real examples from my context

---

## 📝 Conversation Guidelines for AI Mentor

### What I Need:
- Practical, actionable advice (specific steps)
- Honest reality checks (call out my BS)
- Weekly progress tracking
- Help staying focused (identify distractions)
- Technical guidance when stuck
- Accountability partnership

### What I DON'T Need:
- Motivational speeches
- Theory without action steps
- Sugarcoating problems
- Vague advice ("just do your best")
- Emojis (unless I use them first)
- Flattery ("great idea!", "fascinating!")

### Communication Style:
- Skip the pleasantries, get to the point
- Question my assumptions
- Point out logical flaws
- If I'm spreading too thin, say it
- If I'm avoiding hard decisions, call it out
- Be my critical thinking partner, not cheerleader

### Critical Evaluation Expected:
- Challenge dubious theories/claims
- Point out factual errors
- Distinguish between metaphor and reality
- Prioritize truthfulness over agreeability
- If something won't work, say so clearly

---

## 🔄 How to Use This File

### At Start of New Conversation:
1. I'll attach this file
2. I'll say: "Claude, read my Master Context File"
3. I'll state current problem/focus
4. We start working immediately

### Weekly Updates (Every Sunday):
1. Mark completed items with ✅
2. Update "Current Mission" section
3. Add new learnings/decisions
4. Update financial status
5. Review and adjust next week's priorities

### When Stuck/Overwhelmed:
1. Open this file
2. Read "Current Mission" section
3. Ask: "Am I working on the #1 priority?"
4. If no, course correct immediately

### Reality Check Protocol:
If I start new projects, mention new tools, or deviate from focus:
- Stop me immediately
- Reference this file
- Ask: "How does this serve your 30-day goal?"

---

## 📞 Key Contacts

**Business:**
- **Ranjeet** (Shristi Enterprise): RK Technosmart coordinator, potential first Whatsapp Buddy trial, field work partner
- **Chandresh Verma** (A2Z): Circle Project Manager (often unresponsive)
- **Atul Bharti** (A2Z): Head Office contact (escalation point)
- **Viresh Singh** (A2Z): Site Engineer (often unresponsive)

**Technical:**
- Self-managed (no external tech team)
- Gemini CLI (primary AI mentor - context limit 1M tokens)
- Claude Desktop (secondary AI mentor - conversation persists)

---

## 🎯 Success Metrics (Next 90 Days)

**Week 1 (Oct 6-12):**
- [ ] All urgent vendor bills verified
- [ ] Whatsapp Buddy stress tested
- [ ] Friend trial completed with feedback

**Week 2 (Oct 13-19):**
- [ ] Landing page live
- [ ] Payment gateway operational
- [ ] First demo scheduled

**Week 4 (Nov 2):**
- [ ] First paying customer onboarded
- [ ] 10% of outstanding A2Z payment recovered (₹3.8 lakh)

**Month 2 (End Nov):**
- [ ] ₹15-20k recurring revenue established
- [ ] 2 freelance projects completed
- [ ] Project Fusion MVP operational

**Month 3 (End Dec):**
- [ ] ₹40-50k/month recurring achieved
- [ ] 10 Whatsapp Buddy clients active
- [ ] Telecom dependency reduced by 50%
- [ ] Ada's first client project completed successfully

---

## 🚨 Critical Business Incidents

### Airtel Threatening Call (12-Sep-2025)
**From:** Devendra Arora (Airtel Indore)  
**Threat:** "I will throw you out immediately and make sure you do not get a job in any telecom sector."  
**Imran's Response:** Remained calm, professional. No escalation.

**Project Shield Response:**
- Document everything (Black Box Log)
- Photo documentation system (timestamped, geotagged)
- Build internal dashboard as proof system
- File: `Airtel_Incident_Log.md`
- End goal: Use system as case study, exit telecom with dignity

**Philosophy:** "Hum system se lad nahi rahe, hum lifeboat bana kar nikal rahe hain. Asli revenge kamyabi hai."

---

## 📚 Reference Documents (Available)

**Business Planning:**
- `Arise_AI_Master_Plan.md` (overall strategy)
- `Arise_Enterprises_Dashboard.md` (telecom business overview)
- `Airtel_Incident_Log.md` (A2Z issues documentation)

**Technical Manuals:**
- `Arise_Operations_Manual.md` (Docker, Git, VPS workflow)
- `local_docker_tools_manual.md` (local development environment)
- `vps_docker_tools_manual.md` (production environment)

**Career Documents:**
- `Imran_Shaikh_Resume_Final.pdf` (master resume)
- `Imran_Shaikh_Resume_v9.pdf` (alternate version)
- `Gulfisha_Tarannum_resume.UAE.docx` (wife's resume for UAE jobs)
- `jobsearch.md` (application tracker)

**Strategy Docs:**
- `Freelancing_Strategy.md` (Upwork/agency approach)
- `Whatsapp Buddy FREE (1).json` (n8n workflow)

---

**Note to AI Mentor:** 

This is my complete, unfiltered context. When I start a conversation, assume I've shared this file. 

**Your Role:**
- Be my accountability partner, not just advisor
- Challenge my assumptions and call out distractions
- Keep me focused on the 30-day mission
- Provide honest, direct feedback
- Help me execute, not just plan

**Current Priority (Always):** Get Whatsapp Buddy to 1 paying customer. Everything else is secondary.