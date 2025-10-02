# VPS Docker Tools Manual & Operations Guide

This document serves as a comprehensive guide to the Dockerized services running on your Hostinger VPS. It explains their purpose, how to interact with them, and provides key points for discussing them in technical interviews, focusing on a production environment.

---

## 1. Docker Basics on VPS

Your VPS uses Docker Compose to manage multiple services. The main configuration file is `docker-compose.yml`, located in `~/my_project/`.

*   **`docker-compose.yml` location:** `~/my_project/docker-compose.yml`

### 1.1. Basic Docker Compose Commands

These commands are executed from within the `~/my_project/` directory on your VPS.

*   **To Start All Services (in detached mode):**
    ```bash
    docker-compose up -d
    ```
    *   `up`: Starts the services.
    *   `d`: Runs services in "detached" mode (in the background).
    *   **Note:** Services with `restart: always` will automatically restart if the Docker daemon restarts or the container crashes.

*   **To Stop All Services:**
    ```bash
    docker-compose down
    ```
    *   `down`: Stops and removes containers, networks, and volumes defined in the `docker-compose.yml`.

*   **To View Logs for All Services:**
    ```bash
    docker-compose logs
    ```
    *   **To View Logs for a Specific Service:**
        ```bash
        docker-compose logs <service_name>
        ```
    *   **To Follow Logs in Real-time:**
        ```bash
        docker-compose logs -f <service_name>
        ```

*   **To List Running Docker Containers:**
    ```bash
    docker ps
    ```
    *   **To List All Docker Containers (running and stopped):**
        ```bash
    docker ps -a
        ```

*   **To Pull Latest Images (without recreating containers):**
    ```bash
    docker-compose pull
    ```
    *   **To Pull a Specific Service's Image:**
        ```bash
    docker-compose pull <service_name>
        ```

*   **To Recreate a Specific Service (e.g., after pulling a new image or changing config):**
    ```bash
    docker-compose up -d --force-recreate <service_name>
    ```
    *   `--force-recreate`: Forces recreation of containers to apply changes.

---

## 2. Core Concepts & Terminology

(This section will be similar to your local manual, adapted for a VPS context. We can refine it later.)

---

## 3. Detailed Service Documentation: Your VPS Services

Here's a breakdown of each service defined in your `docker-compose.yml` on the VPS.

### 3.1. `nginx-proxy` (Nginx Reverse Proxy)

*   **Purpose:** Acts as the traffic controller for your VPS. It routes incoming web requests (HTTP/HTTPS) to the correct internal WordPress or other web services. It also handles SSL termination.
*   **Image:** `nginx:latest`
*   **Container Name:** `nginx-proxy`
*   **Ports:** `80:80` (HTTP), `443:443` (HTTPS)
*   **Volumes:**
    *   `./nginx/conf.d:/etc/nginx/conf.d`: Nginx configuration files.
    *   `./website_data/<domain>:/var/www/html/<domain>`: Mounts your website content.
    *   `./certbot/conf:/etc/letsencrypt`: Let's Encrypt SSL certificates.
    *   `./certbot/www:/var/www/certbot`: Webroot for Certbot challenges.
*   **Key Operations:**
    *   **Check Status:** `docker ps` (look for `nginx-proxy`)
    *   **Access:** Your websites (arisegulf.com, dearzindagi.space, etc.) are accessed through this proxy.
*   **Interview Points:**
    *   "I use Nginx as a reverse proxy to manage traffic to multiple web applications on my VPS."
    *   "It centralizes SSL certificate management and provides a single entry point for all web services."

### 3.2. `db` (MySQL Database)

*   **Purpose:** The central database for all your WordPress websites.
*   **Image:** `mysql:8.0`
*   **Container Name:** `mysql-db`
*   **Volumes:** `db_data` (named volume for persistent data storage)
*   **Healthcheck:** Configured to ensure the database is fully ready before dependent services start.
*   **Interview Points:**
    *   "I use a dedicated MySQL container as the backend database for my WordPress sites."
    *   "It's configured with a healthcheck to ensure high availability and proper startup order."

### 3.3. WordPress Websites (`arisegulf-web`, `blog-web`, `dearzindagi-web`, `islam-web`)

*   **Purpose:** Your various content management system (CMS) websites.
*   **Image:** `wordpress:latest`
*   **Container Names:** `arisegulf-web`, `blog-web`, `dearzindagi-web`, `islam-web`
*   **Volumes:** `./website_data/<domain>:/var/www/html` (mounts specific website content)
*   **Dependencies:** `depends_on: db` (ensures database is healthy before starting)
*   **Interview Points:**
    *   "I manage multiple WordPress instances, each serving a different domain, all running as Docker containers."
    *   "They are configured to connect to a central MySQL database, demonstrating a scalable web hosting setup."

### 3.4. `n8n` (Workflow Automation)

*   **Purpose:** Your powerful workflow automation tool, connecting various apps and services.
*   **Image:** `n8nio/n8n:1.106.3` (Note: This is an older version than your local setup)
*   **Container Name:** `n8n`
*   **Public URL:** `https://n8n.arisegulf.com/` (configured via `WEBHOOK_URL`)
*   **Volumes:** `n8n_data` (named volume for persistent data)
*   **Interview Points:**
    *   "I use n8n to automate complex workflows, integrating different APIs and services."
    *   "It's exposed publicly via Nginx for webhooks and external integrations."

### 3.5. `memos` (Personal Note-taking)

*   **Purpose:** Your self-hosted, open-source, lightweight note-taking service.
*   **Image:** `neosmemo/memos:latest`
*   **Container Name:** `memos`
*   **Volumes:** `memos_data` (named volume for persistent data)
*   **Interview Points:**
    *   "I use Memos for personal knowledge management and quick note-taking, integrated into my VPS setup."

### 3.6. `flowise` (Visual AI Chatbot Builder)

*   **Purpose:** A low-code tool for building and deploying AI chatbots and LLM applications visually.
*   **Image:** `flowiseai/flowise:latest`
*   **Container Name:** `flowise`
*   **Volumes:** `flowise_data` (named volume for persistent data)
*   **Environment:** `FLOWISE_API_KEY` (for API access)
*   **Interview Points:**
    *   "Flowise allows me to rapidly prototype and deploy AI chatbots, simplifying the development of conversational AI interfaces."

### 3.7. `certbot` (SSL Certificate Management)

*   **Purpose:** Automates the process of obtaining and renewing free SSL/TLS certificates from Let's Encrypt for your websites.
*   **Image:** `certbot/certbot`
*   **Container Name:** `certbot`
*   **Volumes:** Links to Nginx volumes for certificate storage and webroot challenges.
*   **Note:** This service typically runs, obtains/renews certificates, and then exits.
*   **Interview Points:**
    *   "I use Certbot to automate SSL certificate management, ensuring all my websites are served securely via HTTPS."

### 3.8. `qdrant` (Vector Database)

*   **Purpose:** Your specialized vector database for storing and searching embeddings, crucial for RAG applications.
*   **Image:** `qdrant/qdrant:latest` (Note: This is `latest`, while your local is `v1.9.0`)
*   **Container Name:** `qdrant-db`
*   **Volumes:** `qdrant_data` (named volume for persistent data)
*   **Environment:** `QDRANT__SERVICE__API_KEY` (for secure API access)
*   **Interview Points:**
    *   "Qdrant serves as the vector database for my RAG pipeline on the VPS, enabling semantic search capabilities for my AI applications."

### 3.9. `streamlit-app` (Streamlit Frontend Application)

*   **Purpose:** A Python web application, likely serving as a frontend for some of your AI services.
*   **Build Context:** `./streamlit_app` (meaning it builds from a local Dockerfile in that directory)
*   **Container Name:** `streamlit-app`
*   **Environment:** `FLOWISE_API_URL`, `FLOWISE_API_KEY` (suggests it interacts with Flowise)
*   **Interview Points:**
    *   "I use Streamlit to deploy interactive Python web applications, providing user-friendly interfaces for my AI services."
    *   "It integrates with Flowise to power chatbot functionalities."

### 3.10. Link Shortener & Preview Generator (`link.arisegulf.com`)

This is a critical service for creating custom, branded short links (e.g., `link.arisegulf.com/some-link`) that generate a rich preview (title, description, image) when shared on social media or messaging apps.

*   **Core Technology:** This is handled by the **`nginx-proxy`** service. The configuration file `link.arisegulf.com.conf` contains the logic.
*   **Single Source of Truth:** All links should first be planned in the `Link Generator` table in Baserow.

#### Workflow for Adding a New Short Link

**Step 1: Update the Local Nginx Configuration File**

1.  **Open the file** on your local PC: `D:\vps-stack\nginx\conf.d\link.arisegulf.com.conf`.
2.  **Copy and paste** the template block below, adding it before the `--- Default fallback ---` section.
3.  **Edit the template** with your new link's details (path, destination URL, title, description).

**Code Template:**
```nginx
    # --- Redirect for /your-new-link ---
    location = /your-new-link {
        set $redirect_url "https://your-destination-url.com";
        add_header Content-Type 'text/html; charset=utf-8';
        return 200 '
<html>
<head>
    <meta charset="utf-8">
    <title>Your Link Title</title>
    <meta property="og:title" content="Your Link Title">
    <meta property="og:description" content="Your link description or subtitle.">
    <meta property="og:image" content="https://arisegulf.com/arise-logo.png">
    <meta property="og:url" content="https://link.arisegulf.com/your-new-link">
    <meta name="twitter:card" content="summary_large_image">
</head>
<body>
    <p>Redirecting...</p>
    <script>window.location.href = "$redirect_url";</script>
</body>
</html>';
    }
```

**Step 2: Commit and Push the Change via Git**

Open a terminal in your `D:\vps-stack` directory and run these commands:

```bash

# Stage the change
git add .

# Commit the change with a clear message
git commit -m "feat: add /your-new-link short link"

# Push the change to GitHub
git push
```

**Step 3: Deploy the Change on the VPS**

Log in to your VPS and run these commands:

```bash

# Log in to your VPS
ssh root@193.203.161.27

# Navigate to your project directory
cd /root/my_project

# Pull the latest changes
git pull

# Restart the Nginx service to activate the link
docker compose restart nginx-proxy
```

**Step 4: Verify and Clear Cache (Crucial!)**

Your new link is live, but apps like WhatsApp will show an old, cached preview. You **must** force them to update.

1.  Go to the **[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)**.
2.  Enter your new short link (e.g., `https://link.arisegulf.com/your-new-link`).
3.  Click **Debug**, and then on the next page, click **"Scrape Again"**.

Your link will now show the correct, beautiful preview when shared.

### 3.11. `baserow` (Self-Hosted Relational Database)

*   **Purpose:** Your self-hosted, open-source alternative to Airtable, serving as the central database for your "Arise Operations" system.
*   **Image:** `baserow/baserow:1.24.0`
*   **Container Name:** `baserow` (or `baserow-vps-baserow-1` if using default compose naming)
*   **Ports:** `8000:80` (Host port 8000 mapped to container port 80)
*   **Volumes:** `baserow_data` (named volume for persistent data)
*   **Environment:**
    *   `BASEROW_PUBLIC_URL`: `http://baserow.arisegulf.com:8000` (or your configured IP/domain:port)
*   **Network:** Connected to `app-network` (defined as `external: true` in `docker-compose.yml`).
*   **Key Operations:**
    *   **Access UI:** `http://baserow.arisegulf.com:8000` (or your configured IP/domain:port)
    *   **Check Status:** `docker ps` (look for `baserow-vps-baserow-1`)
    *   **Check Logs:** `docker compose logs baserow` (from `~/baserow-vps/`)
*   **Configuration Steps (External):**
    *   **DNS (Cloudflare):** Create an `A` record for `baserow.arisegulf.com` pointing to your VPS IP, with **Proxy status set to "DNS only" (grey cloud)**.
    *   **Nginx Proxy:** Add a server block in your Nginx configuration (e.g., `~/my_project/nginx/conf.d/baserow.conf`) to proxy requests for `baserow.arisegulf.com` to `http://baserow:80`. Remember to `docker compose restart nginx-proxy` after changes.
*   **n8n Integration:**
    *   **Credential Type:** Baserow (uses Basic Auth).
    *   **Host:** `http://baserow.arisegulf.com:8000` (or your configured IP/domain:port).
    *   **Username:** Email address of a Baserow user account (e.g., `arisegulf@gmail.com`).
    *   **Password:** Password for that Baserow user account.
*   **Interview Points:**
    *   "I've deployed Baserow as a self-hosted, open-source relational database on my VPS, providing a cost-effective and scalable alternative to cloud-based solutions like Airtable."
    *   "It's integrated with n8n for automation and proxied via Nginx for public access."

---

## 4. Networks & Volumes

*   **Network:** All services are connected to a single `app-network`, allowing them to communicate with each other internally.
*   **Named Volumes:**
    *   `db_data`: For MySQL database persistence.
    *   `n8n_data`: For n8n's configuration and workflow data.
    *   `memos_data`: For Memos's note data.
    *   `flowise_data`: For Flowise's chatbot data.
    *   `qdrant_data`: For Qdrant's vector data.
    *   **Importance:** Named volumes ensure that your application data persists even if containers are removed or recreated.

---

## 5. General Interview Tips (Related to Your VPS Setup)

(This section will be similar to your local manual, adapted for a VPS/production context. We can refine it later.)

---

## 6. Common Troubleshooting Steps (for VPS)

(This section will be similar to your local manual, adapted for a VPS context. We can refine it later.)

---
### 3.12. `n8n-mcp` (Model Context Protocol Server for n8n Documentation)

*   **Purpose:** A specialized server that integrates with n8n for managing and serving n8n node documentation and workflow management via the Model Context Protocol.
*   **Image:** Built from local `n8n-mcp` Dockerfile.
*   **Container Name:** `n8n-mcp`
*   **Public URL:** `https://mcp.arisegulf.com/`
*   **Internal Port:** `3000`
*   **Environment Variables:**
    *   `MCP_MODE=http`: Forces the server to run in HTTP mode (listening on a port).
    *   `PORT=3000`: Specifies the internal port the server listens on.
    *   `N8N_URL=http://n8n:5678`: Configures the n8n instance it interacts with.
    *   `AUTH_TOKEN=y_1@_g!_s_t_r_o_n_g_r_a_n_d_o_m_t_o_k_e_n_h_e_r_e_r_e_p_l_a_c_e_m_e_w_i_t_h_a_r_e_a_l_o_n_e`: **Crucial for authentication.** This token is required for interacting with the MCP server.
*   **Nginx Configuration (`nginx/conf.d/n8n-mcp.conf`):**
    ```nginx
    server {
        listen 80;
        server_name mcp.arisegulf.com;

        # Rule for Let's Encrypt renewal (webroot)
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        # Redirect all other HTTP traffic to HTTPS
        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl http2;
        server_name mcp.arisegulf.com;

        ssl_certificate /etc/letsencrypt/live/mcp.arisegulf.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/mcp.arisegulf.com/privkey.pem;

        location / {
            proxy_pass http://n8n-mcp:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
    ```
*   **Key Operations:**
    *   **Access UI:** `https://mcp.arisegulf.com/`
    *   **Health Check:** `https://mcp.arisegulf.com/health`
    *   **MCP Endpoint:** `https://mcp.arisegulf.com/mcp`
    *   **Authentication:** Use the `AUTH_TOKEN` in the `Authorization: Bearer <token>` header for POST requests to `/mcp`.
*   **Interview Points:**
    *   "I've deployed a custom Model Context Protocol server for n8n documentation, enabling advanced workflow management and node interaction."
    *   "It's secured with Let's Encrypt SSL and exposed via Nginx reverse proxy, demonstrating secure and scalable application deployment."
    *   "Authentication is handled via a Bearer Token, ensuring secure API access."

### 3.13. `arun-dashboard` (React Frontend for Baserow Data)

*   **Purpose:** A custom-built React web application to provide a modern, mobile-friendly dashboard for individual team members (e.g., Arun) to view their financial summary, work details, and payment history directly from Baserow.
*   **Technology:** React.js, Baserow API, Custom CSS.
*   **Data Source:** Baserow API.
    *   **API Key:** `EDx5sItLzGn3hzyYCZDmDsIjiWVASnlq` (Store securely, e.g., in environment variables on VPS)
    *   **Database ID:** `174`
    *   **Table IDs:**
        *   `Team`: `701`
        *   `Bill Line Items`: `700`
        *   `Payment System`: `707`
*   **Key Features:**
    *   **Financial Summary:** Displays Total Billed Amount, Total Paid, and Remaining Balance.
    *   **Work Details:** Shows site-wise breakdown of claimed vs. verified quantities and payable amounts.
    *   **Payment History:** Lists all payments made with dates, amounts, methods, and notes.
    *   **Branding:** Includes Arise logo and custom punchline.
    *   **Mobile-Friendly:** Responsive design for optimal viewing on various devices.

#### Deployment on VPS

1.  **Build the React Application (Local PC):**
    *   Navigate to the `arun-dashboard` project directory: `cd D:\vps-stack\arun-dashboard`
    *   Run the build command: `npm run build`
    *   This will create a `build` folder containing all optimized static files.

2.  **Transfer Files to VPS:**
    *   Transfer the **contents** of the local `build` folder to a directory on your VPS, e.g., `/var/www/html/arun_dashboard/`.
    *   You can use `scp` or `sftp` for this. Example `scp` command:
        ```bash
        scp -r D:\vps-stack\arun-dashboard\build\* user@your_vps_ip:/var/www/html/arun_dashboard/
        ```

3.  **Configure Nginx (on VPS):**
    *   Add a new `location` block to your Nginx configuration (e.g., in `/etc/nginx/sites-available/default` or a dedicated config file like `link.arisegulf.com.conf`).
    *   This configuration will serve the static files and handle client-side routing for the React app.
    ```nginx
    server {
        listen 80;
        server_name link.arisegulf.com; # Or your domain

        # ... other existing configurations ...

        location /arun_dashboard/ {
            alias /var/www/html/arun_dashboard/; # Path where you uploaded the build files
            index index.html index.htm;
            try_files $uri $uri/ /arun_dashboard/index.html; # Essential for React Router
        }

        # ... other existing configurations ...
    }
    ```
    *   After modifying Nginx config, reload Nginx: `sudo systemctl reload nginx`

4.  **Access the Dashboard:**
    *   The dashboard will be accessible at `http://link.arisegulf.com/arun_dashboard` (or your configured URL).

#### Baserow Setup Summary (for context)

*   **Professional Bill Entry:** Bills are entered in `Team Bills`, with detailed line items in `Bill Line Items`.
*   **Verification:** `Bill Line Items` uses `Verified Qty` (from `Measurement Book` via `Lookup` field) and `Agreed Rate` (from `Master Rate Card`) to calculate `Payable Amount`.
*   **Linking:** `Bill Line Items` are linked to `Team` records via `Related MB Site` (Link to table) and `MB Site No` (Lookup).
*   **Payment Tracking:** Payments are recorded in `Payment System`.
*   **Team Summary:** The `Team` table uses `Rollup` fields to aggregate `Total Billed Amount`, `Total Paid`, and `Remaining Balance` from `Bill Line Items` and `Payment System` tables.

---

## 7. Deploying React SPA Dashboards & Appsmith Setup

This section documents the process of deploying a React Single Page Application (SPA) to a dedicated subdomain on your VPS, along with the setup of Appsmith.

### 7.1. Deploying a React SPA to a Dedicated Subdomain (e.g., `arun.arisegulf.com`)

**Goal:** To serve a React SPA from a dedicated subdomain with SSL, proper routing, and efficient caching.

**Prerequisites:**
*   React application built locally with `npm run build`. Ensure `homepage` in `package.json` is set to `"/"` for a dedicated subdomain.
*   DNS `A` record created in Cloudflare for the subdomain (e.g., `arun.arisegulf.com` pointing to your VPS IP `193.203.161.27`), set to **"DNS only" (grey cloud)**.
*   React build files (`build` folder content) copied to the VPS at `/var/www/html/arun_dashboard/`.
    ```bash
    scp -r D:/vps-stack/arun-dashboard/build/* root@193.203.161.27:/var/www/html/arun_dashboard/
    ```

**Key Learnings & Pitfalls:**
*   **Network Connectivity (Port 80/443):** External reachability of ports 80 and 443 is crucial for Certbot and general website access. Even if Hostinger firewall shows ports open, deeper network blocks can occur. (Resolved by Hostinger support investigation).
*   **Nginx `root` vs `alias`:** For a dedicated subdomain, `root` is generally cleaner. For subdirectories, `alias` can be used but requires careful `try_files` configuration.
*   **`try_files` vs `error_page 404`:** For React SPAs, `try_files $uri $uri/ /index.html;` (or `$uri /index.html;` for root) is the canonical solution for client-side routing. `error_page 404` can lead to unexpected behavior.
*   **React `homepage` Setting:** Must match the Nginx configuration. For a dedicated subdomain, `homepage: "/"` is correct.
*   **Docker Volume Mounts:** Ensure the React build folder is correctly mounted into the Nginx container using an absolute path (e.g., `- /var/www/html/arun_dashboard:/var/www/html/arun_dashboard:ro`).
*   **Certbot Challenge Handling:** The `location /.well-known/acme-challenge/` must be processed before any HTTP to HTTPS redirects in the Nginx configuration.

**Detailed Deployment Steps:**

1.  **Prepare React App (Local PC):**
    *   Navigate to your React app directory: `cd D:\vps-stack\arun-dashboard`
    *   Ensure `homepage` in `package.json` is set to `"/"`.
        ```json
        // package.json
        {
          "name": "arun-dashboard",
          "version": "0.1.0",
          "private": true,
          "homepage": "/", // <--- Ensure this is set to "/"
          // ...
        }
        ```
    *   Build the application:
        ```bash
        npm run build
        ```

2.  **Transfer React Build to VPS:**
    *   Copy the contents of your local `build` folder to the VPS:
        ```bash
        scp -r D:/vps-stack/arun-dashboard/build/* root@193.203.161.27:/var/www/html/arun_dashboard/
        ```
    *   Set correct permissions (run on VPS):
        ```bash
        sudo chown -R www-data:www-data /var/www/html/arun_dashboard
        sudo find /var/www/html/arun_dashboard -type d -exec chmod 755 {} \;
        sudo find /var/www/html/arun_dashboard -type f -exec chmod 644 {} \;
        ```

3.  **Update `docker-compose.yml` (Local PC):**
    *   Ensure the `nginx-proxy` service has the correct volume mount for the React app:
        ```yaml
        # ... inside nginx-proxy service definition ...
        volumes:
          - ./nginx/conf.d:/etc/nginx/conf.d
          - ./nginx/certs:/etc/letsencrypt
          - /var/www/html/arun_dashboard:/var/www/html/arun_dashboard:ro  # <--- Crucial: Absolute path and read-only
          # ... other volumes ...
        # ...
        ```

4.  **Create/Update Nginx Configuration (`nginx/conf.d/arun.arisegulf.com.conf`) (Local PC):**
    *   Create this file if it doesn't exist, or update its content with the following production-ready configuration:
        ```nginx
        server {
            listen 80;
            server_name arun.arisegulf.com;

            # Certbot challenge MUST come before any redirects
            location /.well-known/acme-challenge/ {
                root /var/www/certbot;
            }

            # Redirect all other traffic to HTTPS
            location / {
                return 301 https://$host$request_uri;
            }
        }

        server {
            listen 443 ssl http2;
            server_name arun.arisegulf.com;

            ssl_certificate /etc/letsencrypt/live/arun.arisegulf.com/fullchain.pem;
            ssl_certificate_key /etc/letsencrypt/live/arun.arisegulf.com/privkey.pem;

            root /var/www/html/arun_dashboard;
            index index.html;

            # SPA routing
            location / {
                try_files $uri $uri/ /index.html; # Canonical SPA routing
            }

            # No cache for index.html
            location = /index.html {
                add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" always;
            }

            # Cache static assets aggressively
            location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
                expires 1y;
                add_header Cache-Control "public, immutable" always;
            }
        }
        ```

5.  **Generate SSL Certificate (Run on VPS):**
    *   Ensure Nginx is running with the above HTTP config.
    *   Run Certbot:
        ```bash
        cd /root/my_project
        docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d arun.arisegulf.com
        ```
    *   If prompted, choose option `2` to "Renew & replace".

6.  **Deploy Changes & Restart Nginx (Run on VPS):**
    *   Commit and push all local changes (package.json, docker-compose.yml, Nginx config files).
        ```bash
        git add .
        git commit -m "feat: deploy arun.arisegulf.com dashboard"
        git push
        ```
    *   Pull changes and restart Nginx:
        ```bash
        ssh root@193.203.161.27
        cd /root/my_project
        git pull
        docker compose up -d --force-recreate nginx-proxy
        ```

7.  **Test the Dashboard:**
    *   Access `https://arun.arisegulf.com/` in a new incognito browser window.

### 7.2. Appsmith Setup

**Goal:** To swap Metabase for Appsmith on the VPS.

**Steps:**

1.  **Modify `docker-compose.yml` (Local PC):**
    *   Uncomment the `include` line for `docker-compose.appsmith.yml`:
        ```yaml
        include:
          - docker-compose.appsmith.yml
          - docker-compose.n8n-mcp.yml
        ```
    *   Comment out the entire `metabase` service definition.

2.  **Create Nginx Configuration (`nginx/conf.d/appsmith.arisegulf.com.conf`) (Local PC):**
    *   Create this file with the following content:
        ```nginx
        server {
            listen 80;
            server_name appsmith.arisegulf.com;

            location /.well-known/acme-challenge/ {
                root /var/www/certbot;
            }

            location / {
                return 301 https://$host$request_uri;
            }
        }

        server {
            listen 443 ssl http2;
            server_name appsmith.arisegulf.com;

            ssl_certificate /etc/letsencrypt/live/appsmith.arisegulf.com/fullchain.pem;
            ssl_certificate_key /etc/letsencrypt/live/appsmith.arisegulf.com/privkey.pem;

            location / {
                proxy_pass http://appsmith:80;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
            }
        }
        ```

3.  **Deploy Changes & Start Appsmith (Run on VPS):**
    *   Commit and push all local changes.
        ```bash
        git add .
        git commit -m "feat: swap metabase for appsmith"
        git push
        ```
    *   Pull changes and start/recreate services:
        ```bash
        ssh root@193.203.161.27
        cd /root/my_project
        git pull
        docker compose up -d --force-recreate nginx-proxy appsmith
        ```

4.  **Generate SSL Certificate for Appsmith (Run on VPS):**
    ```bash
    docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d appsmith.arisegulf.com
    ```

5.  **Restart Nginx (Run on VPS):**
    ```bash
    docker compose restart nginx-proxy
    ```

6.  **Access Appsmith:** `https://appsmith.arisegulf.com/`

### 7.3. Pending Issues

*   **WordPress Database Connection:** The `arisegulf.com` WordPress site is currently showing "Error establishing a database connection". This is likely due to missing or incorrect `ARISEGULF_DB_PASSWORD` in the `.env` file. This needs to be resolved to bring the main website back online.