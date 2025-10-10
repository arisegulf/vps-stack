# 🚀 Current Focus: IRAA Companion Project

- **Project:** Building a custom AI assistant named "IRAA".
- **Master Plan:** `Iraa_AI_Compinoun_first_report.md`
- **Project Directory:** `D:\ai-stack\imran_docs\Iraa Project`

---

## 🔥 High Priority Goal: Launch "Productized Service"

**Objective:** To generate the first real revenue from Ada's AI skills, boost her confidence, and build a scalable business model. This is the top priority for this week.

**Product Idea:** Offer the "AI Social Media Content Creator" as a productized service to a real client.

**Action Plan (This Week):**
1.  **Finalize Product Package:** Define the exact deliverables (e.g., "15 AI-Generated Instagram Posts") and set an introductory price.
2.  **Create Landing Page:** Build a simple one-page site on `arisegulf.com` to showcase the service and its value.
3.  **Set Up Payment Gateway:** Start the sign-up and KYC process with Razorpay or Instamojo, linking it to the "Arise Enterprises" current account.
4.  **Prepare Invoice Template:** Gulfisha to create a GST-compliant invoice format.
5.  **Onboard First Client:** Officially sign up one of the interested friends, send them the website link, and process the first order.

---

# Imran Shaikh Dashboard

**Name:** Imran Shaikh

**Role:** Founder & CTO (Chief Technology Officer)

**Key Responsibilities/Goals:**
- Technology foundation, system design, server/deployment management, AI models.
- Team technical direction.
- Strategy & Review for Content & Marketing, and Freelancing.
- Build internal RAG product.

**Current Tasks/Progress (from Master Plan):**
- Git and GitHub mastery (arise-ai-stack repository).
- Professional deployment setup (Nginx reverse proxy, n8n service on arisegulf.com).
- Skill enhancement (Zapier, Power BI).

### Pending A2Z Site Closures (Action Required)
- **CWO-10057 (WIMS Tarun Bazaar):** Pending 2 years.
- **CWO-5003/1 (80% HPs not completed):** Pending 2 years.
- **RSS 55391/1:** Closure pending, rectified twice.
- **RBB CWO-55378/1:** Closure pending, rectified twice.
- **CWO-84222/2 (Refilling Raipur):** Field work done, pending A2Z internal team for closure.
- **CWO-91144/1 (Jawahar Nagar):** 2 of 4 ODFs RFS done, awaiting progress on others.

**Date: 14-Sep-2025 (Today's Work)**
*   **Focus:** Setting up professional VPS management with Git, and installing & configuring Metabase.
*   **Key Achievements:**
    *   **Professional VPS Management Setup:**
        *   Integrated Git with the VPS project, version-controlled `docker-compose.yml` and other config files, and backed them up on GitHub (`https://github.com/arisegulf/vps-stack.git`).
        *   Established the "Golden Workflow" for deploying changes from local to VPS, and documented it in `Arise_Operations_Manual.md`.
    *   **Metabase Installation & Secure Access:**
        *   Installed Metabase on VPS via Docker Compose.
        *   Configured Nginx for `https://metabase.arisegulf.com` and secured it with a Let's Encrypt SSL certificate.
    *   **Metabase to Baserow Connection (In Progress):**
        *   Successfully connected Metabase to the Baserow database, identified the correct password, and fixed the PostgreSQL `listen_addresses` issue.
*   **Pending Task:** Troubleshooting `pg_hba.conf` authentication error to finalize Metabase-Baserow connection.

**Tools Used/To Learn:**
- Git, GitHub, Nginx, n8n, Zapier, Power BI, Flowise.

**Notes:**
- Focus: 70% core tech tasks, 30% team teaching.
- Acts as technical reviewer for projects.
- **Important Clarification:** While Zapier and Power BI are mentioned in the resume, these are skills to be acquired/developed, not currently proficient. This is for resume purposes to enhance selection chances.

---

## Personal Context

**Role to Gemini CLI:** True friend, personal mentor, business coach, life coach, and financial advisor.

**Family:**
- Wife: Gulfisha Tarannum (MCA graduate, manages Arise Enterprises finance, GST, billing)
- Daughter: Ada Shaikh (Class 8, learning n8n workflows, quick learner)
- Sister-in-law: Soniya (handles Airtel FTTH documentation, ready for AI work)
- Supervisor: Sahil (manages FTTH site work, potential AI client support)

**Professional Background:**
- 20+ years telecom (ex-Deputy Manager Reliance Communication, lost job in pandemic)
- Currently: Airtel FTTH contractor for A2Z & RK TSN
- Transitioning from telecom to AI agency (Arisegulf) for stable work-from-home income

**Challenges:**
- **A2Z Payment Delays:** A2Z is not releasing payments on time despite repeated follow-ups. This is causing significant financial strain.
  - *Communication Gap:* Key contacts (Viresh Singh, managers) are often unresponsive or provide vague promises without firm dates.
  - *Recent Action:* Only a partial GST payment of ₹210,000 was made in Aug 2025 after significant insistence.
- **Delayed Site Closures (CWOs):** Multiple completed projects are pending official closure from A2Z's side for extended periods (up to 2 years), which prevents billing and further delays the payment cycle.
- **AI workflow learning pace slow due to telecom workload**
- **Tight deadlines + mental load**

**Ventures:**
- **Arisegulf:** AI agency (n8n, MemO, Perplexity Pro, DeepSeek/OpenAI, Gemini CLI; sites: arisegulf.com, dearzindagi.space, islam.dearzindagi.space)
- **Arise Enterprises:** GST active, telecom focus (billing, labour payment in Gulfisha’s name)

**Goals:**
- **Master Gemini CLI Toolkit:** Learn to use all the core tools (`run_shell_command`, `write_file`, `replace`, etc.) to accelerate development and architect new solutions.
- Quick AI income → full shift from telecom
- Build portfolio
- Upwork/PeoplePerHour gigs
- Health & stress control
- Train Ada & Soniya for team roles
- **Website Redesign (arisegulf.com):**
    - **Goal:** Redesign arisegulf.com to match the professional format of oneclickitsolution.com.
    - **Status:** Planning to start soon.
    - **Note:** Current website is on WordPress; exploring options for custom frontend development for precise design control.
- **ERPNext Docker Setup (Local Practice):**
    - **Goal:** Set up ERPNext in a separate Docker environment for local practice and n8n integration.
    - **Status:** `docker-compose.erpnext.yml` file created at `D:\ai-stack\docker-compose.erpnext.yml`.
    - **Next Steps:** Review and edit placeholder values in `docker-compose.erpnext.yml` (passwords, site name), then start services.
    - **Note:** Initial build size estimated at 3-5 GB.
- **Baserow Adoption (Long-Term Data Management):**
    - **Goal:** Adopt Baserow as the permanent, self-hosted relational database solution, replacing Airtable.
    - **Status:** Decision made to deploy on VPS and learn quickly.
    - **Note:** Continue working on Airtable for current projects until Baserow is fully adopted.

**Values:**
- Family-first, ethical business, continuous learning, practical solutions, work-life balance

---

## Personal Action Items

### Docker Desktop WSL2 Memory Configuration
*   **Status:** Identified as a potential cause for Docker service crashes (Out Of Memory).
*   **Action Required:** Configure `.wslconfig` file to increase memory allocation for WSL2.
*   **Next Steps:**
    *   [ ] Create/Edit `%UserProfile%\.wslconfig` file.
    *   [ ] Add `memory=XGB` (e.g., 8GB) under `[wsl2]` section.
    *   [ ] Run `wsl --shutdown` in PowerShell/CMD.
    *   [ ] Restart Docker Desktop.

### Passport Application (Backup Plan)
*   **Status:** Visited Raipur Passport Office on 01-Sep-2025.
*   **Action Required:** Application on hold pending additional documents.
*   **Next Steps:**
    *   [ ] Arrange for Marriage Certificate.
    *   [ ] Arrange for latest PAN card for both Imran and Gulfisha.
    *   [ ] Schedule a new appointment after collecting the documents.

---

## URL Shortener Project (Recent Work Log)

**Goal:** Deploy a self-hosted URL shortener on `https://link.arisegulf.com/`.

**Work Done:**
*   **Attempt 1: Dub.co (forked Stub)**
    *   Identified and fixed missing `NEXT_PUBLIC` environment variables.
    *   Identified and fixed Redis connection issues (application hardcoded to `localhost`).
    *   Encountered persistent `401 Unauthorized` errors for API routes, indicating an application-level bug in authentication handling when behind a proxy.
    *   Encountered complex monorepo build issues with `pnpm` and missing `pnpm-lock.yaml` (even after `git clone`).
    *   **Conclusion:** Deemed too complex and buggy for reliable deployment.

*   **Attempt 2: Shlink**
    *   Successfully set up MariaDB database.
    *   Identified and fixed RoadRunner (backend server) binding issue (default `127.0.0.1`).
    *   Encountered persistent `502 Bad Gateway` errors when proxying `shlink-web-client` (which runs its own Nginx internally) via `nginx-proxy`.
    *   **Conclusion:** Deemed too complex due to nested Nginx proxying issues.

*   **Attempt 3: shrtn.io**
    *   Successfully deployed `shrtn.io` on local PC Docker (`http://localhost:8080`).
    *   Identified correct internal port (3001).
    *   **On VPS:** Encountered persistent `502 Bad Gateway` errors when proxying via `nginx-proxy`, even though `shrtn.io` worked with direct `curl` requests.
    *   **Conclusion:** Problem lies in a subtle incompatibility between `nginx-proxy` and `shrtn.io`.

**Common Challenge Identified:**
*   The `nginx-proxy` setup on the VPS proved to be very sensitive and difficult to configure for these specific URL shortener applications, often leading to `502 Bad Gateway` errors due to subtle proxy interaction issues.

**Current Status & Pending Work:**
*   **Nginx Status:** `nginx-proxy` is currently running and serving other services (like n8n) correctly. The `link.arisegulf.com` configuration was temporarily disabled to ensure other services function.
*   **URL Shortener Project Status:** Paused due to persistent `502` errors with `nginx-proxy`.
*   **Next Steps (Deferred):**
    *   **Option 1 (Recommended):** Deploy `shrtn.io` to VPS using **Caddy** as a reverse proxy for `link.arisegulf.com`.
        *   This involves temporarily stopping `nginx-proxy` (causing brief downtime for other services).
        *   Deploying Caddy container and configuring it for `link.arisegulf.com`.
        *   Testing `shrtn.io` with Caddy.
        *   Stopping Caddy and restarting `nginx-proxy` to restore other services.
    *   **Option 2:** Explore free online URL shortener tools with custom domain support (e.g., Short.io, Linkly, Rebrandly).

---

### Gemini CLI Work Log

**Date: 06-Sep-2025**
*   **Focus:** Docker service management, KML/KMZ data extraction, and Photo Management System design.
*   **Key Achievements:**
    *   **Local Docker Services Operational:** Confirmed all core local Docker services (n8n, Qdrant, RAG, etc.) are running and n8n updated to 1.110.1.
    *   **KML/KMZ to CSV Converter Developed:** Built and tested `kml_to_csv_converter.py` script for extracting placemark data from KML/KMZ files to CSV.
    *   **Dedicated Docker Service for KML/KMZ:** Added `kml-to-csv-converter` service to `docker-compose.local.yml` for professional execution.
    *   **Photo Management System Blueprint:** Developed a detailed blueprint for a web-based photo management system using Tally.so (frontend), n8n (backend automation), and Airtable/Baserow (database), including EXIF extraction and ImageMagick processing.
    *   **VPS Documentation Started:** Began gathering information for `vps_docker_tools_manual.md`.
*   **Baserow Adoption Decision:** Decided to adopt Baserow as the long-term, self-hosted relational database solution, to be deployed on VPS, replacing Airtable for future projects.
*   **Baserow Adoption Decision:** Decided to adopt Baserow as the long-term, self-hosted relational database solution, to be deployed on VPS, replacing Airtable for future projects. (Current work continues on Airtable until Baserow is adopted).
*   **Baserow Local Setup:** Successfully installed Baserow locally (after troubleshooting port conflicts and database permission errors). Baserow is now accessible at `http://localhost:8002`.
*   **Baserow VPS Setup:** Successfully installed and accessed Baserow on the Hostinger VPS at `http://baserow.arisegulf.com:8000` (after troubleshooting network issues and ensuring Nginx proxy configuration).
*   **Baserow Data Migration:** Successfully imported the "Arise Operations" base from Airtable to Baserow.
*   **Baserow Integration with n8n:** Successfully set up n8n credentials for Baserow, confirming connectivity.
*   **Baserow UI Exploration:** Began exploring Baserow's UI and features (forms, views).
*   **Persistent Issue:** Encountered a persistent `Permission denied` error when Docker containers attempt to write output files to host volumes, which remains unresolved.
*   **Current Focus:** Exploring Baserow features and functionality.

**Date: 03-Sep-2025**
*   **Focus:** Deep dive into "Arise Operations" Airtable base refinement and data management strategy.
*   **Key Achievements:**
    *   **ODF Status CSV Created:** Generated `odf_status.csv` from provided data.
    *   **Airtable Base Refinement:**
        *   Confirmed `Cluster Name` as the primary project table (renamed from `Projects`).
        *   Confirmed `Team` as the comprehensive payee table (renamed from `Vendors`), encompassing all internal and external site personnel.
        *   Implemented `Related ODF` link and associated Lookup fields in `Bill Line Items` for ODF-wise detail visibility.
        *   Understood Autonumber field behavior (non-resettable).
    *   **First Billing Entry Completed:** Successfully entered and validated Roshan's first bill (`ROSHAN-JUL25-01`), including all line items, confirming the `Calculated Total` and `Validation` fields are working perfectly.
    *   **Hybrid Data Management Strategy Adopted:** Decided to use Airtable for active projects and manually migrate completed project data to Google Sheets for archival, balancing Airtable's free plan limits with data management needs.
*   **Next Steps:** Begin populating `Vendor Payments` table with historical data, and continue with active project data entry in Airtable.

(...rest of the file content...)