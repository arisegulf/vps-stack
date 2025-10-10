# VPS Docker Tools Manual & Operations Guide

This document serves as a comprehensive guide to the Dockerized services running on your Hostinger VPS. It explains their purpose, how to interact with them, and provides key points for discussing them in technical interviews, focusing on a production environment.

---

## 1. Docker Basics on VPS

Your VPS uses Docker Compose to manage multiple services. The main configuration file is `docker-compose.yml`, located in `~/my_project/`.

*   **`docker-compose.yml` location:** `~/my_project/docker-compose.yml`
*   **Modern Command:** Note that modern Docker versions use `docker compose` (with a space) instead of the older `docker-compose` (with a hyphen). This manual will use the modern syntax.

### 1.1. Basic Docker Compose Commands

These commands are executed from within the directory containing your `docker-compose.yml` file (e.g., `~/my_project/` or `~/baserow-vps/`).

*   **To Start All Services (in detached mode):**
    ```bash
    docker compose up -d
    ```
    *   `up`: Creates and starts the services.
    *   `d`: Runs services in "detached" mode (in the background).

*   **To Stop All Services:**
    ```bash
    docker compose down
    ```
    *   `down`: Stops and removes containers, networks, and potentially volumes.

*   **To View Logs for a Specific Service:**
    ```bash
    docker compose logs -f <service_name>
    ```
    *   `-f`: Follows the log output in real-time.

*   **To List Running Docker Containers for the Project:**
    ```bash
    docker compose ps
    ```

*   **To Pull Latest Images:**
    ```bash
    docker compose pull <service_name> # For a specific service
    docker compose pull # For all services in the compose file
    ```

*   **To Recreate a Specific Service (e.g., after an upgrade or config change):**
    ```bash
    docker compose up -d --force-recreate <service_name>
    ```

---

## 2. Core Concepts & Terminology

(This section will be similar to your local manual, adapted for a VPS context. We can refine it later.)

---

## 3. Detailed Service Documentation: Your VPS Services

Here's a breakdown of the core services currently running on the VPS.

### 3.1. `nginx-proxy` (Nginx Reverse Proxy)
*   **Purpose:** Acts as the traffic controller for your VPS. It routes incoming web requests (HTTP/HTTPS) to the correct internal service (n8n, Baserow, etc.). It also handles SSL termination using certificates from Let's Encrypt.
*   **Key Operations:** This service is critical. Any new subdomain or web service needs a corresponding `.conf` file in `./nginx/conf.d/` and a restart of this container to take effect.

### 3.2. `n8n` (Workflow Automation)
*   **Purpose:** Your powerful workflow automation tool, connecting various apps and services.
*   **Public URL:** `https://n8n.arisegulf.com/`

### 3.3. `memos` (Personal Note-taking)
*   **Purpose:** Your self-hosted, open-source, lightweight note-taking service.

### 3.4. `flowise` (Visual AI Chatbot Builder)
*   **Purpose:** A low-code tool for building and deploying AI chatbots and LLM applications visually.
*   **Public URL:** `https://flowise.arisegulf.com/`

### 3.5. `certbot` (SSL Certificate Management)
*   **Purpose:** Automates the process of obtaining and renewing free SSL/TLS certificates from Let's Encrypt.
*   **Key Operation:**
    ```bash
    docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d your-new-domain.com
    ```

### 3.6. `qdrant` (Vector Database)
*   **Purpose:** Your specialized vector database for storing and searching embeddings, crucial for RAG applications.

### 3.7. `streamlit-app` (Streamlit Frontend Application)
*   **Purpose:** A Python web application serving as a frontend for some of your AI services.

### 3.8. `baserow` (Self-Hosted Relational Database)
*   **Purpose:** Your self-hosted, open-source alternative to Airtable, serving as the central database for your "Arise Operations" system.
*   **Image:** `baserow/baserow:1.35.2`
*   **Key Operations:**
    *   **Access UI:** `http://baserow.arisegulf.com:8000` (or your configured IP/domain:port)
    *   **Check Logs:** `docker compose logs baserow` (from `~/baserow-vps/`)
*   **Note:** The Baserow service runs from its own `docker-compose.yml` in the `~/baserow-vps/` directory.

### 3.9. `n8n-mcp` (Model Context Protocol Server)
*   **Purpose:** A specialized server that integrates with n8n for managing and serving n8n node documentation.

### 3.10. `arun-dashboard` (React Frontend for Baserow Data)
*   **Purpose:** A custom-built React web application to provide a modern dashboard for team members.

### 3.11. `evolution-api` (WhatsApp API Gateway)
*   **Purpose:** A self-hosted, open-source API that acts as a gateway to WhatsApp for sending and receiving messages. This powers the "Whatsapp Buddy" workflow in n8n.
*   **Image:** `atendai/evolution-api`
*   **Database:** Requires a **PostgreSQL** database.
*   **Public URL:** `https://evolution.arisegulf.com`
*   **Manager UI:** `https://evolution.arisegulf.com/manager`

### 3.12. `postgres` (PostgreSQL Database for Evolution API)
*   **Purpose:** A dedicated PostgreSQL database instance required by the `evolution-api` service.
*   **Image:** `postgres:15`
*   **Volumes:** `postgres_data` (for persistent database storage).

---

## 4. Future Roadmap

### 4.1. `arisegulf.com` Website
*   **Status:** The previous WordPress-based website has been decommissioned to conserve server resources.
*   **Plan:** The main website, `arisegulf.com`, is planned to be rebuilt from the ground up as a modern, high-performance web application using **React** and **Tailwind CSS**.
*   **Backend Strategy:** To manage content dynamically, the new React frontend will likely connect to a headless CMS. **Baserow** is the primary candidate for this role, allowing for easy content updates via its API without needing to redeploy the frontend application.

---

## 5. Decommissioned Services

The following services were previously running but have been permanently disabled to streamline the server and free up resources. Their configurations have been removed from `docker-compose.yml` and Nginx.

*   **WordPress Sites:** `arisegulf-web`, `blog-web`, `dearzindagi-web`, `islam-web`.
*   **Main MySQL Database:** The `db` container that served the WordPress sites.
*   **Metabase:** The business intelligence tool.
*   **shrtn:** The `cordlesswool/shrtn` link shortener service.

---

## 6. Standard Operating Procedures (SOPs)

### 6.1. How to Upgrade a Service (Example: Baserow)

This procedure documents the successful upgrade of Baserow from `1.24.0` to `1.35.2`. It should be adapted for other services.

**Step 1: Identify the Correct Data Volume & Take a Backup**
*   **Problem:** A service's `docker-compose.yml` might name a volume `service_data`, but Docker often creates it on the host as `project-name_service_data`. Backing up the wrong volume can lead to data loss.
*   **Solution:**
    1.  List all Docker volumes: `docker volume ls`
    2.  Identify the correct volume, which is usually prefixed with the project directory name (e.g., `baserow-vps_baserow_data`).
    3.  Create a compressed backup of the correct volume.
        ```bash
        # Example for Baserow
        docker run --rm -v baserow-vps_baserow_data:/dbdata -v $(pwd):/backup ubuntu tar cvf /backup/baserow_backup_$(date +%Y%m%d).tar /dbdata
        ```
    4.  Verify the backup file size is reasonable (i.e., not a few kilobytes).

**Step 2: Update the Image Tag**
1.  Navigate to the service's directory (e.g., `cd ~/baserow-vps/`).
2.  Open the `docker-compose.yml` file with a text editor (`nano docker-compose.yml`).
3.  Find the `image:` line for the service and update the version tag to the desired new version.
    *   **Old:** `image: baserow/baserow:1.24.0`
    *   **New:** `image: baserow/baserow:1.35.2`

**Step 3: Pull the New Image and Restart the Service**
1.  From the service's directory, run the following command. This downloads the new version and then gracefully restarts the container with the new image, connecting it to the existing data volume.
    ```bash
    docker compose pull && docker compose up -d
    ```

**Step 4: Verify the Upgrade**
1.  Check the service logs for any errors: `docker compose logs -f <service_name>`.
2.  Access the service's UI and check the settings/admin page to confirm the new version number.

### 6.2. Troubleshooting SSL Certificate (Certbot) Failures

When creating a new subdomain, you must issue an SSL certificate for it. If the `certbot` command fails, follow these steps.

**Error 1: `Name or service not known` (or `NXDOMAIN`)**
*   **Meaning:** The domain name you are trying to certify does not exist on the internet.
*   **Causes:**
    *   You have not created the `A` record in Cloudflare yet.
    *   You have a typo in the domain name.
*   **Solution:**
    1.  Log in to Cloudflare and verify an `A` record exists for your subdomain, pointing to the correct VPS IP address.
    2.  Double-check your spelling of the domain in the `certbot` command.
    3.  Ensure the Cloudflare proxy status is **DNS only (grey cloud)** for the initial creation.
    4.  You can test from the VPS with `ping your-domain.com` to see if the server can find it.

**Error 2: `Connection refused`**
*   **Meaning:** Let's Encrypt found your server's IP but was blocked from connecting on port 80.
*   **Causes:**
    *   A firewall on your VPS provider (Hostinger) is blocking traffic on port 80.
    *   A temporary network glitch between Let's Encrypt and your VPS.
*   **Solution:**
    1.  First, confirm other sites on the same IP are working. If they are, it is likely not a permanent firewall block.
    2.  The most likely cause is a temporary DNS propagation delay. Wait 5-10 minutes after creating the DNS record and try again.
    3.  If it still fails, log into your Hostinger panel and explicitly check that the firewall allows incoming traffic on **Port 80** and **Port 443**.

**Error 3: `too many failed authorizations`**
*   **Meaning:** You have tried and failed to get a certificate too many times (usually 5 times in one hour).
*   **Cause:** This is a rate limit from Let's Encrypt to prevent abuse.
*   **Solution:**
    1.  **STOP.** Do not try the command again immediately.
    2.  Focus on fixing the underlying issue (using the solutions for Error 1 or 2).
    3.  You **must wait for one hour** from the time of the last failed attempt.
    4.  After waiting one hour, and after you are confident the underlying issue is fixed, run the `certbot` command again.

**Error 4: `Database provider mongodb invalid`**
*   **Meaning:** The application is configured to use a database that it does not support.
*   **Root Cause:** The current version of Evolution API (v2+) does **not** support MongoDB. It requires PostgreSQL or MySQL.
*   **Solution:** Do not use MongoDB. You must configure the service to use a PostgreSQL database. Refer to the service documentation for the correct `docker-compose.yml` and environment variable setup.

### 6.3. Troubleshooting Evolution API (WhatsApp API Gateway)

**Problem:** Initial setup and subsequent instance recreation of the `evolution-api` service led to persistent `ERROR [Redis] redis disconnected` messages in the `evolution-api` logs, `502 Bad Gateway` errors from Nginx, and the inability to generate QR codes in the Evolution Manager UI.

**Root Causes Identified & Solutions Implemented:**

1.  **Incorrect Redis Environment Variables:**
    *   **Issue:** The `evolution-api` v2 expects `CACHE_REDIS_ENABLED` and `CACHE_REDIS_URI` for Redis caching, not `REDIS_ENABLED`, `REDIS_HOST`, or `REDIS_PORT`.
    *   **Solution:** Updated `docker-compose.yml` to use `CACHE_REDIS_ENABLED=true` and `CACHE_REDIS_URI=redis://evolution-redis:6379/0` in the `evolution-api` service's environment block. Removed redundant Redis variables.

2.  **Redis RDB Format Version Mismatch:**
    *   **Issue:** Switching from `redis:latest` (likely Redis 7.x) to `redis:6-alpine` (Redis 6.x) caused the older Redis version to fail loading an RDB file created by the newer version, leading to continuous Redis container restarts (`Can't handle RDB format version 12`).
    *   **Solution:** Performed a complete cleanup of the `redis_data` volume (`docker volume rm my_project_redis_data`) to ensure a fresh start for the `redis:6-alpine` container.

3.  **Nginx Hostname Resolution Failure:**
    *   **Issue:** Nginx was unable to resolve the hostname `arisegulf-web` (and potentially other service names) within the Docker network, leading to `nginx: [emerg] host not found in upstream "arisegulf-web"` errors and preventing Nginx from starting correctly. This indirectly caused `502 Bad Gateway` for `evolution.arisegulf.com`.
    *   **Solution:** Added `resolver 127.0.0.11 valid=30s;` to the `server` block in `/etc/nginx/conf.d/arisegulf.com.conf` to explicitly configure Nginx to use Docker's internal DNS resolver.

4.  **Evolution API Healthcheck Failure:**
    *   **Issue:** The initial healthcheck for `evolution-api` used `curl`, which was not installed in the container, causing the healthcheck to fail and the container to be marked `unhealthy`.
    *   **Solution:** Changed the `healthcheck` command in `docker-compose.yml` for `evolution-api` to use `nc -z localhost 8080`, which checks if the port is open and is typically available in minimal container images.

**Outcome:** The `evolution-api` service is now running stably, connected to both PostgreSQL and Redis, and is accessible via Nginx at `https://evolution.arisegulf.com/manager`. QR code generation and WhatsApp connectivity are fully functional.

**Key Learnings:**
*   Always verify application-specific environment variable names (e.g., `CACHE_REDIS_URI` vs. `REDIS_URI`).
*   Be mindful of data volume compatibility when downgrading database/cache versions.
*   Explicitly configure Nginx resolvers for Docker internal DNS to prevent hostname resolution issues.
*   Ensure healthcheck commands use tools available within the container image.

### 6.4. Troubleshooting a React SPA (Single Page Application) Deployment

**Problem:** The `arun.arisegulf.com` dashboard, a React-based Single Page Application (SPA), was showing a "404 Not Found" error from Nginx, even though the DNS and SSL certificates were correctly configured.

**Root Cause Analysis:**

The investigation followed several steps to diagnose the problem:

1.  **Initial Nginx Configuration Check:** The Nginx configuration file for `arun.arisegulf.com` (`arun.arisegulf.com.conf`) was reviewed. It correctly defined the `root` directory and used `try_files` to handle SPA routing.

2.  **`docker-compose.yml` Volume Mounts:** The `docker-compose.yml` file was inspected to ensure the React application's build files were correctly mounted into the `nginx-proxy` container. An initial error was found where the wrong directory was being mounted.

3.  **Conflicting Nginx Configurations:** All files in the `nginx/conf.d` directory were reviewed. A conflicting `location` block for `/arun_dashboard/` was discovered in the `link.arisegulf.com.conf` file and was removed.

4.  **Verifying the Build Artifacts:** After the above fixes, the issue persisted. The crucial diagnostic step was to check the contents of the mounted directory *inside* the `nginx-proxy` container.
    *   **Command:** `docker exec nginx-proxy ls -l /var/www/html/arun_dashboard`
    *   **Result:** The output was `total 0`, indicating the directory was empty.

5.  **The Final Root Cause:** The `arun-dashboard/build` directory, which contains the compiled React application, is included in the project's `.gitignore` file. This is standard practice, as build artifacts are not typically committed to version control. The deployment process involved pulling the latest code from the Git repository on the server, but since the `build` directory was never committed, it was never created on the server. The volume mount in `docker-compose.yml` was pointing to a non-existent or empty directory on the host, which resulted in an empty directory inside the container.

**Solution:**

The solution was to build the React application directly on the server before starting the Docker containers.

1.  **Navigate to the application directory:**
    ```bash
    cd /root/my_project/arun-dashboard
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Build the application:**
    ```bash
    npm run build
    ```

4.  **Return to the project root and restart the services:**
    ```bash
    cd /root/my_project
    docker compose up -d --force-recreate
    ```

**Commands Used:**

*   `npm install`: Installs the Node.js dependencies required by the React application.
*   `npm run build`: Compiles the React application into static HTML, CSS, and JavaScript files in the `build` directory.
*   `docker exec -it <container_name> <command>`: Executes a command inside a running container. This was critical for diagnosing the empty directory issue.
*   `git status`, `git add`, `git commit`, `git pull`, `git push`: Standard Git commands used to manage and synchronize the configuration changes.
*   `docker compose up -d --force-recreate`: Restarts the Docker services, applying any changes to the `docker-compose.yml` file or the mounted volumes.

**Key Learnings:**

*   **Build artifacts are not typically versioned:** For applications that require a build step (like React, Angular, Vue, etc.), the compiled files are generated locally or on a CI/CD server and are not stored in Git.
*   **Deployments require a build step:** When deploying such applications, you must run the build command on the server to create the necessary files before starting the webserver.
*   **Verify volume mounts inside the container:** If a volume mount is not working as expected, use `docker exec` to inspect the contents of the mounted directory inside the container. This is the most reliable way to confirm that the files are being correctly shared from the host.

---

## 7. Networks & Volumes
*   **Network:** All services are connected to a single `app-network`, allowing them to communicate with each other internally using their container names as hostnames.
*   **Named Volumes:** Named volumes ensure that your application data persists even if containers are removed or recreated.

---

## 8. Deploying React SPA Dashboards & Appsmith Setup
(Existing content remains)