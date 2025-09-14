# Arise Operations & Technology Manual

---

## 1. Our Guiding Principles & Analogies

This section explains the core ideas behind our setup. Understanding these analogies is key to making good decisions.

*   **The Two Environments: "The Showroom" vs. "The Workshop"**
    *   **Production (VPS) is our "Public Showroom":** It must always be perfect and stable for clients.
    *   **Development (Local PC) is our "Workshop/Lab":** This is where we experiment, build, and test. It's okay for things to be messy here.

*   **Configuration vs. Data: "The Recipe Book" vs. "The Ingredients"**
    *   **Git (GitHub) is our "Recipe Book":** It only stores the recipes (configuration files like `docker-compose.yml`, Nginx configs). It is small and lightweight.
    *   **Data Volumes are the "Ingredients":** Folders like `db_data`, `n8n_data`, etc., are the ingredients. We **never** put ingredients inside the recipe book. We use a `.gitignore` file to tell the recipe book to ignore them.

*   **Data Backups: "The Secret Sauce" & "The Off-site Vault"**
    *   **Your valuable user data is the "Secret Sauce":** It's the most important asset.
    *   **Backup Scripts create "Jars of Sauce":** We run scripts to create compressed backup files (`.zip`, `.sql.gz`) of the data.
    *   **Off-site Storage is the "Secure Vault":** We store these backup files in a completely separate, safe location (like Amazon S3 or Backblaze), not on the same server.

*   **Folder Structure: "The Two Shops"**
    *   **`ai-stack` and `vps-stack` are "Two Separate Shops":** One is the workshop, one is the showroom's master copy. They should be in separate, parallel folders, not nested inside each other.

---

## 2. Introduction & Core Philosophy

This manual is the single source of truth for the entire Arise Enterprises technology stack. It covers both our "Public Showroom" (the live Production Environment on the VPS) and our "Workshop" (the experimental Development Environment on the local PC).

Our philosophy is to follow professional best practices to ensure our systems are **stable, secure, reproducible, and easy to manage.**

### 2.1. The Golden Workflow

To manage changes professionally, we follow a "Golden Workflow":

1.  **Develop Locally (in the "Workshop"):** All changes are made and tested on the Local PC first.
2.  **Version Control with Git (update the "Recipe Book"):** Changes are saved to Git and backed up to a central online repository (GitHub).
3.  **Deploy to Production (update the "Showroom"):** The changes are pulled from GitHub to the VPS and activated.

This workflow ensures every change is tracked, backed up, and deployed safely.

---

## 3. The Professional Workflow: Git & Data Management

This section explains the core principles of how we manage our code and data, based on our analogies.

### 3.1. Configuration Management with Git (The Recipe Book)

We use Git to manage our **Configuration Files** (our "Recipe Book"). This includes `docker-compose.yml`, Nginx configs, override files, etc.

*   **What Goes in Git:** Only text-based "recipes" that define the *structure* of our system.
*   **What Does NOT Go in Git:** The "ingredients" (data). We use a special file named `.gitignore` to tell Git to ignore all data folders, keeping our Recipe Book small and clean.

### 3.2. Data & Backup Management (The Secret Sauce)

Our valuable user data is our "Secret Sauce." We **never** store this in our Recipe Book (Git).

Our strategy is:

1.  **Automated Backups (Creating "Jars"):** We use scripts to create regular, compressed backups of our live data.
2.  **Off-site Storage (The "Vault"):** These backup files are stored in a secure, separate cloud storage service (our "off-site vault").
3.  **Interim Solution:** For now, backups can be manually downloaded and saved to Google Drive and a local PC. This is a good temporary measure.

---

## 4. Production Environment: VPS Service Manual ("The Showroom")

This section details the services running on the live VPS.

*   **Location:** `/root/my_project/`
*   **Core Command:** `docker compose up -d` (run from the project directory)

### 4.1. VPS Services

*   **`nginx-proxy` (Nginx Reverse Proxy):**
    *   **Purpose:** The main "traffic controller." It routes all web traffic to the correct service (WordPress, Baserow, etc.) and handles SSL certificates.
    *   **Key Workflows:**
        *   **Link Shortener & Landing Pages:** This service is responsible for creating custom short links (`link.arisegulf.com/...`) and full landing pages by serving custom HTML content or redirects. The workflow involves updating the Nginx config files locally, pushing to Git, and pulling/restarting on the server.

*   **`mysql-db` (MySQL Database):**
    *   **Purpose:** The central database for all your WordPress websites.

*   **WordPress Websites (`arisegulf-web`, `blog-web`, etc.):**
    *   **Purpose:** The live CMS-based websites.

*   **`n8n` (Workflow Automation):**
    *   **Purpose:** The live, public-facing workflow automation tool.
    *   **Public URL:** `https://n8n.arisegulf.com/`

*   **`baserow` (Self-Hosted Database):**
    *   **Purpose:** The live, central database for "Arise Operations."
    *   **Public URL:** `http://baserow.arisegulf.com` (proxied via Nginx)

*   **Other Services:** `memos`, `flowise`, `certbot`, `qdrant-db`, `streamlit-app` serve various live functions as needed.

---

## 5. Development Environment: Local PC Service Manual ("The Workshop")

This section details the tools running on the local PC for development and testing (our "Test Kitchens").

*   **Location:** `D:\ai-stack\`
*   **Core Command:** `docker-compose -f docker-compose.local.yml up -d`

### 5.1. Local Services

*   **`qdrant-local` (Vector Database):**
    *   **Purpose:** For testing RAG and semantic search applications with dummy data.
    *   **Local URL:** `http://localhost:6333`

*   **`rag-service-local` (Embedding API):**
    *   **Purpose:** For converting text to vectors during local development.
    *   **Local URL:** `http://localhost:8000`

*   **Other Services:** `n8n-local`, `flowise-local`, `gotenberg-local`, etc., are all part of the "Test Kitchen" for experimenting with new features before deploying them to production. **Recommendation:** Keep these services stopped (`docker stop <container_name>`) to save PC resources when not in use.

---

## 6. Core Technology Glossary

(This section combines all technical terms for easy reference)

*   **API:** A set of rules allowing software to communicate.
*   **RAG (Retrieval-Augmented Generation):** The AI technique of retrieving external data to improve LLM responses.
*   **Qdrant:** A specialized database for storing and searching vectors.
*   **Docker:** A platform for packaging and running applications in isolated environments called containers.
*   **Docker Compose:** A tool for defining and running multi-container Docker applications.
*   **Git:** A version control system for tracking changes in code (our "Recipe Book").
*   **GitHub:** A web-based hosting service for Git repositories (our "online backup" for the Recipe Book).

---

## 7. Common Docker Troubleshooting

(This section combines all troubleshooting steps)

*   **Container Exits Immediately:** Check logs with `docker logs <container_name>`. The container is likely missing an argument or has a configuration error.
*   **`CreateFile` Access Denied Error (Windows):** This is a file permission issue. Ensure the folder exists and Docker has permission to access the drive in Docker Desktop settings.
*   **Port Conflict (`ports are not available`):** Another program or container is using the port. Use `netstat -ano | findstr :PORT` to find the conflicting process and stop it.
*   **Docker Daemon Not Accessible:** The Docker engine is not running. Check that Docker Desktop is fully started and healthy (green icon).

---

## 8. Interview Preparation Points

(This section combines all interview points)

*   **Overall Architecture:** Be ready to draw a diagram showing how your services interact. (e.g., "Nginx is the entry point, it routes to WordPress which uses MySQL. For AI, I have a RAG pipeline with a Streamlit frontend, a FastAPI retrieval API, and a Qdrant backend.")
*   **Production vs. Development:** Explain why you have two environments (Showroom vs. Workshop) and how you manage changes between them using Git.
*   **Problem-Solving:** Give specific examples of problems you solved (e.g., "I debugged a port conflict using `netstat`," or "I solved a file access issue by checking Docker's file sharing settings.")
*   **IaC (Infrastructure as Code):** Explain how your `docker-compose` files and Git repository (your "Recipe Book") allow you to recreate your entire server setup on a new machine with just a few commands.
*   **Data Safety:** Explain your backup strategy (scripts for data "Jars", Git for the "Recipe Book", and off-site storage for the "Vault").