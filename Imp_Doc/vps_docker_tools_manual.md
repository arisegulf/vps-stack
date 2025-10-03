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

Here's a breakdown of each service defined in your `docker-compose.yml` on the VPS.

### 3.1. `nginx-proxy` (Nginx Reverse Proxy)
*   **Purpose:** Acts as the traffic controller for your VPS. It routes incoming web requests (HTTP/HTTPS) to the correct internal service (WordPress, n8n, Baserow, etc.). It also handles SSL termination using certificates from Let's Encrypt.
*   **Key Operations:** This service is critical. Any new subdomain or web service needs a corresponding `.conf` file in `./nginx/conf.d/` and a restart of this container to take effect.

### 3.2. `db` (MySQL Database)
*   **Purpose:** The central database for all your WordPress websites.

### 3.3. WordPress Websites (`arisegulf-web`, `blog-web`, etc.)
*   **Purpose:** Your various content management system (CMS) websites.

### 3.4. `n8n` (Workflow Automation)
*   **Purpose:** Your powerful workflow automation tool, connecting various apps and services.
*   **Public URL:** `https://n8n.arisegulf.com/`

### 3.5. `memos` (Personal Note-taking)
*   **Purpose:** Your self-hosted, open-source, lightweight note-taking service.

### 3.6. `flowise` (Visual AI Chatbot Builder)
*   **Purpose:** A low-code tool for building and deploying AI chatbots and LLM applications visually.

### 3.7. `certbot` (SSL Certificate Management)
*   **Purpose:** Automates the process of obtaining and renewing free SSL/TLS certificates from Let's Encrypt.
*   **Key Operation:**
    ```bash
    docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d your-new-domain.com
    ```

### 3.8. `qdrant` (Vector Database)
*   **Purpose:** Your specialized vector database for storing and searching embeddings, crucial for RAG applications.

### 3.9. `streamlit-app` (Streamlit Frontend Application)
*   **Purpose:** A Python web application serving as a frontend for some of your AI services.

### 3.10. Link Shortener & Preview Generator (`link.arisegulf.com`)
*   **Purpose:** A custom Nginx configuration that creates branded short links with rich social media previews.

### 3.11. `baserow` (Self-Hosted Relational Database)
*   **Purpose:** Your self-hosted, open-source alternative to Airtable, serving as the central database for your "Arise Operations" system.
*   **Image:** `baserow/baserow:1.35.2`
*   **Key Operations:**
    *   **Access UI:** `http://baserow.arisegulf.com:8000` (or your configured IP/domain:port)
    *   **Check Logs:** `docker compose logs baserow` (from `~/baserow-vps/`)
*   **Note:** The Baserow service runs from its own `docker-compose.yml` in the `~/baserow-vps/` directory.

### 3.12. `n8n-mcp` (Model Context Protocol Server)
*   **Purpose:** A specialized server that integrates with n8n for managing and serving n8n node documentation.

### 3.13. `arun-dashboard` (React Frontend for Baserow Data)
*   **Purpose:** A custom-built React web application to provide a modern dashboard for team members.

### 3.14. `evolution-api` (WhatsApp API Gateway)
*   **Purpose:** A self-hosted, open-source API that acts as a gateway to WhatsApp for sending and receiving messages. This powers the "Whatsapp Buddy" workflow in n8n.
*   **Image:** `atendai/evolution-api`
*   **Container Name:** `evolution-api`
*   **Public URL:** `https://evolution.arisegulf.com`
*   **Volumes:** `evolution_store`, `evolution_instances` (for persistent session data).
*   **Environment:**
    *   `AUTHENTICATION_API_KEY`: `EvolVps_sTr0ng_@p1_kEy` (This is the secret key needed to interact with the API).
*   **n8n Integration:**
    *   In your n8n "Whatsapp Buddy" workflow, the "Enviar texto" (Send Text) node uses credentials for the Evolution API.
    *   To connect to this self-hosted instance, you will need to create new credentials in n8n with:
        *   **API URL:** `https://evolution.arisegulf.com`
        *   **API Key:** `EvolVps_sTr0ng_@p1_kEy`
*   **Important Note:** This is an unofficial WhatsApp API. Using it carries a risk of the connected phone number being blocked by WhatsApp. Use it responsibly.

---

## 4. Standard Operating Procedures (SOPs)

### 4.1. How to Upgrade a Service (Example: Baserow)

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

### 4.2. Troubleshooting SSL Certificate (Certbot) Failures

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

---
## 5. Networks & Volumes
*   **Network:** All services are connected to a single `app-network`, allowing them to communicate with each other internally using their container names as hostnames.
*   **Named Volumes:** Named volumes ensure that your application data persists even if containers are removed or recreated.

---
## 6. Deploying React SPA Dashboards & Appsmith Setup
(Existing content remains)

### 7.3. Pending Issues
*   **WordPress Database Connection:** The `arisegulf.com` WordPress site is currently showing "Error establishing a database connection". This is likely due to missing or incorrect `ARISEGULF_DB_PASSWORD` in the `.env` file. This needs to be resolved to bring the main website back online.